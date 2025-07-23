import chess.engine

STOCKFISH_PATH = "E:/Users/RERRL/Documents/VS code/Github/Zortum/main/Chess_Chaos/stockfish/stockfish.exe"

def get_ai_move(game, skill_level=10):
    with chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH) as engine:
        engine.configure({"Skill Level": skill_level})
        result = engine.play(game.board, chess.engine.Limit(time=0.1))
        move = result.move
        fx, fy = chess.square_file(move.from_square), 7 - chess.square_rank(move.from_square)
        tx, ty = chess.square_file(move.to_square), 7 - chess.square_rank(move.to_square)
        return {'from': [fx, fy], 'to': [tx, ty]} 