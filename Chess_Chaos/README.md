# Chess Chaos — гибридные веб-шахматы с ИИ

## Возможности
- Современная шахматная доска с красивыми SVG-фигурами
- Подсветка возможных ходов, выделение выбранной фигуры
- Таймеры на ход и на партию, пауза, сброс
- Игра против ИИ (Stockfish) с выбором уровня сложности (0–20)
- ИИ ходит автоматически, без кнопки
- Настоящие шахматные правила (python-chess)

## Структура проекта
```
Chess_Chaos/
  main.py            # Flask сервер
  chess_logic.py     # Логика шахмат (python-chess)
  ai_api.py          # Интеграция с Stockfish
  requirements.txt   # Зависимости
  static/
    chess.js         # Фронтенд-логика
    chess.css        # Стили
    pieces/          # SVG-фигуры (wK.svg, bQ.svg и т.д.)
  templates/
    chess.html       # HTML-шаблон
  stockfish/
    stockfish.exe    # Движок Stockfish (скачать отдельно)
```

## Как запустить
1. **Установи зависимости:**
   ```
   pip install flask python-chess
   ```
2. **Скачай Stockfish:**
   - [stockfishchess.org/download](https://stockfishchess.org/download/)
   - Помести `stockfish.exe` в папку `Chess_Chaos/stockfish/`
3. **Укажи путь к Stockfish в `ai_api.py`:**
   ```python
   STOCKFISH_PATH = "E:/Users/RERRL/Documents/VS code/Github/Zortum/main/Chess_Chaos/stockfish/stockfish.exe"
   # или относительный путь, если сервер запускается из Chess_Chaos:
   # STOCKFISH_PATH = "stockfish/stockfish.exe"
   ```
4. **Запусти сервер:**
   ```
   python main.py
   ```
5. **Открой браузер:**
   - Перейди на [http://localhost:5000](http://localhost:5000)

## Как играть
- Играй за белых, ИИ (Stockfish) ходит за черных автоматически.
- Перед началом выбери уровень ИИ (0 — слабый, 20 — максимальный).
- Можно ставить паузу, сбрасывать партию, менять таймеры.

## Примечания
- Для корректной работы Stockfish путь должен быть указан правильно!
- SVG-фигуры должны быть в папке `static/pieces/` с именами `wK.svg`, `bQ.svg` и т.д.
- Если ИИ не ходит — проверь путь к Stockfish и перезапусти сервер.

---

**Chess Chaos — твой современный шахматный движок с гибридным ИИ!** 