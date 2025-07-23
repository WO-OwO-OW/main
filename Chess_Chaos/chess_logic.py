import chess

class ChessGame:
    def __init__(self):
        self.board = chess.Board()

    def make_move(self, move):
        # move = {'from': [x1, y1], 'to': [x2, y2]}
        fx, fy = move['from']
        tx, ty = move['to']
        # Преобразуем координаты в UCI (например, e2e4)
        from_square = chess.square(fx, 7 - fy)
        to_square = chess.square(tx, 7 - ty)
        uci_move = chess.Move(from_square, to_square)
        if uci_move in self.board.legal_moves:
            self.board.push(uci_move)
            return 'ok'
        else:
            return 'illegal'

    def get_board(self):
        # Возвращает доску в виде списка списков (для фронта)
        board_matrix = [['' for _ in range(8)] for _ in range(8)]
        for square in chess.SQUARES:
            piece = self.board.piece_at(square)
            if piece:
                x = chess.square_file(square)
                y = 7 - chess.square_rank(square)
                board_matrix[y][x] = piece.symbol()
        return board_matrix

    def is_check(self):
        return self.board.is_check()

    def is_checkmate(self):
        return self.board.is_checkmate()

    def turn(self):
        return 'white' if self.board.turn == chess.WHITE else 'black'

    def get_legal_moves(self):
        moves = []
        for move in self.board.legal_moves:
            fx, fy = chess.square_file(move.from_square), 7 - chess.square_rank(move.from_square)
            tx, ty = chess.square_file(move.to_square), 7 - chess.square_rank(move.to_square)
            moves.append({'from': [fx, fy], 'to': [tx, ty]})
        return moves

    def reset_game(self):
        self.board.reset() 