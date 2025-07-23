let selected = null;
let boardData = [];
let currentTurn = 'white';
let moveTimer = null;
let moveTimeLeft = 0;
let totalTime = {white: 600, black: 600};
let moveTime = 60;
let isPaused = false;
let legalMoves = [];

function pieceToImg(symbol) {
  if (!symbol) return '';
  const color = symbol === symbol.toUpperCase() ? 'w' : 'b';
  const type = symbol.toUpperCase();
  return `<img src="/static/pieces/${color}${type}.svg" class="piece" draggable="false" alt="${symbol}" />`;
}

function drawBoard(board) {
  const files = ['a','b','c','d','e','f','g','h'];
  const ranks = ['8','7','6','5','4','3','2','1'];
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  boardData = board;

  // Верхний отступ для букв
  const topRow = document.createElement('div');
  topRow.className = 'coord-row';
  topRow.innerHTML = '<div class="coord-corner"></div>' + files.map(f => `<div class="coord coord-file">${f}</div>`).join('') + '<div class="coord-corner"></div>';
  boardDiv.appendChild(topRow);

  for (let y = 0; y < 8; y++) {
    const row = document.createElement('div');
    row.className = 'row';
    // Цифра слева
    const leftCoord = document.createElement('div');
    leftCoord.className = 'coord coord-rank';
    leftCoord.textContent = ranks[y];
    row.appendChild(leftCoord);
    for (let x = 0; x < 8; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell ' + ((x + y) % 2 === 0 ? 'white' : 'black');
      if (board[y][x]) {
        cell.innerHTML = pieceToImg(board[y][x]);
      }
      cell.onclick = () => cellClick(x, y);
      if (selected && selected.x === x && selected.y === y) {
        cell.classList.add('selected');
      }
      if (selected && isLegalMove(selected.x, selected.y, x, y)) {
        cell.classList.add('valid-move');
      }
      row.appendChild(cell);
    }
    // Цифра справа
    const rightCoord = document.createElement('div');
    rightCoord.className = 'coord coord-rank';
    rightCoord.textContent = ranks[y];
    row.appendChild(rightCoord);
    boardDiv.appendChild(row);
  }
  // Нижний отступ для букв
  const bottomRow = document.createElement('div');
  bottomRow.className = 'coord-row';
  bottomRow.innerHTML = '<div class="coord-corner"></div>' + files.map(f => `<div class="coord coord-file">${f}</div>`).join('') + '<div class="coord-corner"></div>';
  boardDiv.appendChild(bottomRow);
}

function isLegalMove(fx, fy, tx, ty) {
  return legalMoves.some(m => m.from[0] === fx && m.from[1] === fy && m.to[0] === tx && m.to[1] === ty);
}

function cellClick(x, y) {
  if (isPaused) return;
  if (!selected) {
    const piece = boardData[y][x];
    if (piece && ((currentTurn === 'white' && piece === piece.toUpperCase()) || (currentTurn === 'black' && piece === piece.toLowerCase()))) {
      selected = {x, y};
      drawBoard(boardData);
    }
  } else {
    if (!isLegalMove(selected.x, selected.y, x, y)) {
      showMessage('Нелегальный ход!');
      selected = null;
      drawBoard(boardData);
      return;
    }
    fetch('/move', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({move: {from: [selected.x, selected.y], to: [x, y]}})
    })
    .then(res => res.json())
    .then(data => {
      if (data.result === 'ok') {
        boardData = data.board;
        currentTurn = data.turn;
        legalMoves = data.legal_moves;
        showStatus(data);
        selected = null;
        drawBoard(boardData);
        resetMoveTimer();
        // Если теперь ход ИИ, делаем ход за ИИ
        if (currentTurn === 'black') {
          setTimeout(aiMove, 400); // небольшая задержка для UX
        }
      } else {
        showMessage('Нелегальный ход!');
        selected = null;
        drawBoard(boardData);
      }
    });
  }
}

function aiMove() {
  if (isPaused) return;
  const skill = parseInt(document.getElementById('ai-skill').value) || 10;
  fetch('/ai_move', { 
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({skill: skill})
  })
  .then(res => res.json())
  .then(data => {
    boardData = data.board;
    currentTurn = data.turn;
    legalMoves = data.legal_moves;
    drawBoard(boardData);
    showStatus(data);
    resetMoveTimer();
    if (currentTurn === 'black') {
      setTimeout(aiMove, 400);
    }
  });
}

function showStatus(data) {
  const status = document.getElementById('status');
  let msg = `Ход: ${data.turn === 'white' ? 'Белые' : 'Чёрные'}`;
  if (data.is_checkmate) msg += ' | Мат!';
  else if (data.is_check) msg += ' | Шах!';
  msg += ` | Время на ход: <span id="move-timer">${moveTimeLeft}</span> сек.`;
  msg += ` | Общее время: <span id="total-white">${totalTime.white}</span> / <span id="total-black">${totalTime.black}</span> сек.`;
  if (isPaused) msg += ' | Пауза';
  status.innerHTML = msg;
}

function showMessage(msg) {
  const status = document.getElementById('status');
  status.textContent = msg;
  setTimeout(() => showStatus({turn: currentTurn}), 1500);
}

function startMoveTimer() {
  moveTimeLeft = moveTime;
  updateTimers();
  if (moveTimer) clearInterval(moveTimer);
  moveTimer = setInterval(() => {
    if (isPaused) return;
    moveTimeLeft--;
    totalTime[currentTurn]--;
    updateTimers();
    if (moveTimeLeft <= 0) {
      clearInterval(moveTimer);
      showMessage('Время на ход вышло!');
      currentTurn = currentTurn === 'white' ? 'black' : 'white';
      resetMoveTimer();
    }
    if (totalTime[currentTurn] <= 0) {
      clearInterval(moveTimer);
      showMessage(`${currentTurn === 'white' ? 'Белые' : 'Чёрные'} проиграли по времени!`);
    }
  }, 1000);
}

function resetMoveTimer() {
  startMoveTimer();
  showStatus({turn: currentTurn});
}

function updateTimers() {
  const moveTimerEl = document.getElementById('move-timer');
  const totalWhiteEl = document.getElementById('total-white');
  const totalBlackEl = document.getElementById('total-black');
  if (moveTimerEl) moveTimerEl.textContent = moveTimeLeft;
  if (totalWhiteEl) totalWhiteEl.textContent = totalTime.white;
  if (totalBlackEl) totalBlackEl.textContent = totalTime.black;
}

function pauseGame() {
  isPaused = !isPaused;
  showStatus({turn: currentTurn});
}

function setTimersFromInputs() {
  const total = parseInt(document.getElementById('input-total').value) || 600;
  const perMove = parseInt(document.getElementById('input-move').value) || 60;
  totalTime.white = totalTime.black = total;
  moveTime = perMove;
}

function resetGame() {
  fetch('/reset', {method: 'POST'})
    .then(res => res.json())
    .then(data => {
      boardData = data.board;
      currentTurn = data.turn;
      legalMoves = data.legal_moves;
      selected = null;
      setTimersFromInputs();
      resetMoveTimer();
      drawBoard(boardData);
      showStatus(data);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const status = document.getElementById('status');
  const controls = document.createElement('div');
  controls.innerHTML = `
    <label>Общее время (сек): <input id="input-total" type="number" value="600" min="10" max="7200"></label>
    <label>Время на ход (сек): <input id="input-move" type="number" value="60" min="5" max="600"></label>
    <label>Уровень ИИ: 
      <select id="ai-skill">
        ${Array.from({length: 21}, (_, i) => `<option value="${i}">${i}</option>`).join('')}
      </select>
    </label>
    <button id="start-btn">Старт</button>
    <button id="pause-btn">Пауза</button>
    <button id="reset-btn">Сброс</button>
  `;
  status.parentNode.insertBefore(controls, status.nextSibling);
  document.getElementById('start-btn').onclick = () => {
    setTimersFromInputs();
    resetMoveTimer();
  };
  document.getElementById('pause-btn').onclick = pauseGame;
  document.getElementById('reset-btn').onclick = resetGame;

  fetch('/move', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({move: {from: [0,0], to: [0,0]}})
  })
  .then(res => res.json())
  .then(data => {
    boardData = data.board;
    currentTurn = data.turn;
    legalMoves = data.legal_moves;
    drawBoard(boardData);
    showStatus(data);
    if (currentTurn === 'black') {
      setTimeout(aiMove, 400);
    }
  });
});

