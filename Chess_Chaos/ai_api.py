import requests

def get_ai_move(fen):
    """
    Получить ход ИИ через API. Возвращает строку в формате UCI (например, e2e4).
    Замените URL и параметры на свои.
    """
    url = "https://your-ai-api-endpoint.com/move"
    payload = {"fen": fen}
    try:
        response = requests.post(url, json=payload, timeout=10)
        response.raise_for_status()
        data = response.json()
        return data.get("move", "")
    except Exception as e:
        print("Ошибка при обращении к AI API:", e)
        return "" 