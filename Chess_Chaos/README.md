# Chess Chaos

Мини-шаблон для игры в шахматы с ИИ-противником через API.

## Структура проекта

- `main.py` — точка входа, игровой цикл.
- `chess_logic.py` — шахматная логика (используй python-chess).
- `ai_api.py` — функции для общения с нейронкой через API.
- `requirements.txt` — зависимости.

## Быстрый старт
1. Установи зависимости:
   ```bash
   pip install -r requirements.txt
   ```
2. Запусти игру:
   ```bash
   python main.py
   ```

## Советы
- Реализуй свои функции в chess_logic.py и ai_api.py.
- Для шахматной логики используй python-chess.
- Для работы с API — requests или httpx. 