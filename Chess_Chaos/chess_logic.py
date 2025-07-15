import chess

class ChessGame:
    def __init__(self):
        self.board = chess.Board()
        self.player_color = chess.WHITE

    def is_over(self):
        return self.board.is_game_over()

    def is_player_turn(self):
        return self.board.turn == self.player_color

    def player_move(self, move_uci):
        try:
            move = chess.Move.from_uci(move_uci)
            if move in self.board.legal_moves:
                self.board.push(move)
                return True
            else:
                return False
        except Exception:
            return False

    def ai_move(self, move_uci):
        try:
            move = chess.Move.from_uci(move_uci)
            if move in self.board.legal_moves:
                self.board.push(move)
                return True
            else:
                return False
        except Exception:
            return False

    def get_fen(self):
        return self.board.fen()

    def display_board(self):
        return str(self.board)

    def get_winner(self):
        if self.board.is_checkmate():
            return "Чёрные" if self.board.turn == chess.WHITE else "Белые"
        elif self.board.is_stalemate():
            return "Ничья (пат)"
        elif self.board.is_insufficient_material():
            return "Ничья (недостаточно фигур)"
        else:
            return "Ничья или неизвестно" 