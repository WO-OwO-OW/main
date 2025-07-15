from chess_logic import ChessGame
from ai_api import get_ai_move


def main():
    game = ChessGame()
    print("Добро пожаловать в Chess Chaos!")
    while not game.is_over():
        print(game.display_board())
        if game.is_player_turn():
            move = input("Ваш ход (например, e2e4): ")
            if not game.player_move(move):
                print("Некорректный ход. Попробуйте снова.")
        else:
            print("Ходит ИИ...")
            ai_move = get_ai_move(game.get_fen())
            if not game.ai_move(ai_move):
                print("ИИ сгенерировал некорректный ход: ", ai_move)
                break
    print(game.display_board())
    print("Игра окончена! Победитель:", game.get_winner())


if __name__ == "__main__":
    main() 