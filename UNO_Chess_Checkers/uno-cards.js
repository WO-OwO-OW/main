// Карты УНО для игры Zortum
class UNOCards {
    constructor() {
        this.cards = this.initializeCards();
        this.player1Deck = [];
        this.player2Deck = [];
        this.discardPile = [];
    }

    initializeCards() {
        const cards = [];
        
        // Обычные карты (0-9) для каждого цвета
        const colors = ['red', 'blue', 'green', 'yellow'];
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        
        colors.forEach(color => {
            numbers.forEach(number => {
                // Ноль только одна карта каждого цвета
                const count = number === 0 ? 1 : 2;
                for (let i = 0; i < count; i++) {
                    cards.push({
                        type: 'number',
                        value: number,
                        color: color,
                        effect: this.getNumberEffect(number)
                    });
                }
            });
        });

        // Специальные карты
        const specialCards = [
            { type: 'skip', color: 'red', effect: 'Пропуск хода противника' },
            { type: 'skip', color: 'blue', effect: 'Пропуск хода противника' },
            { type: 'skip', color: 'green', effect: 'Пропуск хода противника' },
            { type: 'skip', color: 'yellow', effect: 'Пропуск хода противника' },
            
            { type: 'reverse', color: 'red', effect: 'Изменение направления ходов' },
            { type: 'reverse', color: 'blue', effect: 'Изменение направления ходов' },
            { type: 'reverse', color: 'green', effect: 'Изменение направления ходов' },
            { type: 'reverse', color: 'yellow', effect: 'Изменение направления ходов' },
            
            { type: 'draw2', color: 'red', effect: 'Противник берет 2 карты и пропускает ход' },
            { type: 'draw2', color: 'blue', effect: 'Противник берет 2 карты и пропускает ход' },
            { type: 'draw2', color: 'green', effect: 'Противник берет 2 карты и пропускает ход' },
            { type: 'draw2', color: 'yellow', effect: 'Противник берет 2 карты и пропускает ход' },
            
            { type: 'wild', color: 'black', effect: 'Смена цвета и дополнительный ход' },
            { type: 'wild', color: 'black', effect: 'Смена цвета и дополнительный ход' },
            { type: 'wild', color: 'black', effect: 'Смена цвета и дополнительный ход' },
            { type: 'wild', color: 'black', effect: 'Смена цвета и дополнительный ход' },
            
            { type: 'wild4', color: 'black', effect: 'Смена цвета, противник берет 4 карты и пропускает ход' },
            { type: 'wild4', color: 'black', effect: 'Смена цвета, противник берет 4 карты и пропускает ход' },
            { type: 'wild4', color: 'black', effect: 'Смена цвета, противник берет 4 карты и пропускает ход' },
            { type: 'wild4', color: 'black', effect: 'Смена цвета, противник берет 4 карты и пропускает ход' },
            
            // Специальные карты для Zortum
            { type: 'flip', color: 'purple', effect: 'Игроки меняются сторонами' },
            { type: 'flip', color: 'purple', effect: 'Игроки меняются сторонами' },
            
            { type: 'teleport', color: 'cyan', effect: 'Телепортация случайной фигуры' },
            { type: 'teleport', color: 'cyan', effect: 'Телепортация случайной фигуры' },
            
            { type: 'shield', color: 'silver', effect: 'Защита от следующего взятия' },
            { type: 'shield', color: 'silver', effect: 'Защита от следующего взятия' },
            
            { type: 'double_move', color: 'gold', effect: 'Двойной ход' },
            { type: 'double_move', color: 'gold', effect: 'Двойной ход' }
        ];

        specialCards.forEach(card => {
            cards.push(card);
        });

        return cards;
    }

    getNumberEffect(number) {
        const effects = {
            0: 'Дополнительный ход',
            1: 'Перемещение на 1 клетку в любом направлении',
            2: 'Двойной ход',
            3: 'Тройной ход',
            4: 'Перемещение на 4 клетки по прямой',
            5: 'Перемещение на 5 клеток по диагонали',
            6: 'Бросок D6 для определения дополнительных ходов',
            7: 'Счастливая семерка - особые возможности',
            8: 'Перемещение в форме восьмерки',
            9: 'Девятка - максимальная сила'
        };
        return effects[number] || 'Обычный ход';
    }

    shuffleDeck() {
        const shuffled = [...this.cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    dealCards() {
        const shuffled = this.shuffleDeck();
        
        // Раздаем по 7 карт каждому игроку
        this.player1Deck = shuffled.slice(0, 7);
        this.player2Deck = shuffled.slice(7, 14);
        
        // Первая карта в сброс
        this.discardPile = [shuffled[14]];
        
        return {
            player1: this.player1Deck,
            player2: this.player2Deck,
            topCard: this.discardPile[0]
        };
    }

    drawCard(player) {
        if (this.cards.length === 0) {
            this.reshuffleDiscardPile();
        }
        
        const card = this.cards.pop();
        if (player === 1) {
            this.player1Deck.push(card);
        } else {
            this.player2Deck.push(card);
        }
        
        return card;
    }

    playCard(player, cardIndex) {
        const deck = player === 1 ? this.player1Deck : this.player2Deck;
        const card = deck[cardIndex];
        
        if (card) {
            deck.splice(cardIndex, 1);
            this.discardPile.push(card);
            return card;
        }
        return null;
    }

    reshuffleDiscardPile() {
        const topCard = this.discardPile.pop();
        this.cards = this.shuffleDeck();
        this.discardPile = [topCard];
    }

    getCardDisplay(card) {
        if (card.type === 'number') {
            return card.value.toString();
        } else if (card.type === 'skip') {
            return '⏭️';
        } else if (card.type === 'reverse') {
            return '🔄';
        } else if (card.type === 'draw2') {
            return '+2';
        } else if (card.type === 'wild') {
            return '🌈';
        } else if (card.type === 'wild4') {
            return '+4';
        } else if (card.type === 'flip') {
            return '🔄';

        } else if (card.type === 'teleport') {
            return '🚀';
        } else if (card.type === 'shield') {
            return '🛡️';
        } else if (card.type === 'double_move') {
            return '⚡';
        }
        return '?';
    }

    getCardColor(card) {
        return card.color;
    }

    canPlayCard(card, topCard) {
        if (card.type === 'wild' || card.type === 'wild4') {
            return true;
        }
        
        if (card.color === topCard.color) {
            return true;
        }
        
        if (card.type === topCard.type && card.type !== 'number') {
            return true;
        }
        
        if (card.type === 'number' && topCard.type === 'number' && card.value === topCard.value) {
            return true;
        }
        
        return false;
    }

    applyCardEffect(card, game) {
        switch (card.type) {
            case 'number':
                return this.applyNumberEffect(card, game);
            case 'skip':
                return this.applySkipEffect(card, game);
            case 'reverse':
                return this.applyReverseEffect(card, game);
            case 'draw2':
                return this.applyDraw2Effect(card, game);
            case 'wild':
                return this.applyWildEffect(card, game);
            case 'wild4':
                return this.applyWild4Effect(card, game);
            case 'flip':
                return this.applyFlipEffect(card, game);

            case 'teleport':
                return this.applyTeleportEffect(card, game);
            case 'shield':
                return this.applyShieldEffect(card, game);
            case 'double_move':
                return this.applyDoubleMoveEffect(card, game);
            default:
                return 'Неизвестный эффект карты';
        }
    }

    applyNumberEffect(card, game) {
        const effects = {
            0: () => { game.addLogEntry(game.currentPlayer, 'Дополнительный ход!'); },
            1: () => { game.addLogEntry(game.currentPlayer, 'Можно ходить на 1 клетку в любом направлении'); },
            2: () => { game.addLogEntry(game.currentPlayer, 'Двойной ход!'); },
            3: () => { game.addLogEntry(game.currentPlayer, 'Тройной ход!'); },
            4: () => { game.addLogEntry(game.currentPlayer, 'Можно ходить на 4 клетки по прямой'); },
            5: () => { game.addLogEntry(game.currentPlayer, 'Можно ходить на 5 клеток по диагонали'); },
            6: () => { game.rollDice(6); },
            7: () => { game.addLogEntry(game.currentPlayer, 'Счастливая семерка! Особые возможности активированы'); },
            8: () => { game.addLogEntry(game.currentPlayer, 'Ход в форме восьмерки разрешен'); },
            9: () => { game.addLogEntry(game.currentPlayer, 'Девятка! Максимальная сила активирована'); }
        };
        
        if (effects[card.value]) {
            effects[card.value]();
        }
    }

    applySkipEffect(card, game) {
        game.addLogEntry(game.currentPlayer, 'Противник пропускает ход!');
        game.currentPlayer = game.currentPlayer === 1 ? 2 : 1;
        game.currentPlayer = game.currentPlayer === 1 ? 2 : 1; // Пропускаем ход
    }

    applyReverseEffect(card, game) {
        game.addLogEntry(game.currentPlayer, 'Направление ходов изменено!');
        // Логика изменения направления
    }

    applyDraw2Effect(card, game) {
        game.addLogEntry(game.currentPlayer, 'Противник берет 2 карты и пропускает ход!');
        // Добавить 2 карты противнику
        game.currentPlayer = game.currentPlayer === 1 ? 2 : 1;
        game.currentPlayer = game.currentPlayer === 1 ? 2 : 1; // Пропускаем ход
    }

    applyWildEffect(card, game) {
        game.addLogEntry(game.currentPlayer, 'Дикая карта! Выберите новый цвет и получите дополнительный ход!');
        // Логика выбора цвета
    }

    applyWild4Effect(card, game) {
        game.addLogEntry(game.currentPlayer, 'Дикая карта +4! Противник берет 4 карты и пропускает ход!');
        // Добавить 4 карты противнику
        game.currentPlayer = game.currentPlayer === 1 ? 2 : 1;
        game.currentPlayer = game.currentPlayer === 1 ? 2 : 1; // Пропускаем ход
    }

    applyFlipEffect(card, game) {
        game.addLogEntry(game.currentPlayer, 'Флип! Игроки меняются сторонами!');
        // Меняем игроков местами
        game.swapPlayers();
    }

    applyTeleportEffect(card, game) {
        game.addLogEntry(game.currentPlayer, 'Телепорт! Случайная фигура перемещена!');
        // Логика телепортации
    }

    applyShieldEffect(card, game) {
        game.addLogEntry(game.currentPlayer, 'Щит! Защита от следующего взятия активирована!');
        // Логика защиты
    }

    applyDoubleMoveEffect(card, game) {
        game.addLogEntry(game.currentPlayer, 'Двойной ход!');
        // Логика двойного хода
    }
}

// Экспорт для использования в основном файле
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UNOCards;
} 