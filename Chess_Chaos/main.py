from flask import Flask, render_template, request, jsonify
from chess_logic import ChessGame
from ai_api import get_ai_move

app = Flask(__name__)
game = ChessGame()

@app.route('/')
def index():
    return render_template('chess.html')

@app.route('/move', methods=['POST'])
def move():
    data = request.json
    move = data['move']
    result = game.make_move(move)
    return jsonify({
        'board': game.get_board(),
        'result': result,
        'turn': game.turn(),
        'is_check': game.is_check(),
        'is_checkmate': game.is_checkmate(),
        'legal_moves': game.get_legal_moves()
    })

@app.route('/ai_move', methods=['POST'])
def ai_move():
    data = request.json or {}
    skill = int(data.get('skill', 10))
    move = get_ai_move(game, skill_level=skill)
    game.make_move(move)
    return jsonify({
        'board': game.get_board(),
        'ai_move': move,
        'turn': game.turn(),
        'is_check': game.is_check(),
        'is_checkmate': game.is_checkmate(),
        'legal_moves': game.get_legal_moves()
    })

@app.route('/reset', methods=['POST'])
def reset():
    game.reset_game()
    return jsonify({
        'board': game.get_board(),
        'turn': game.turn(),
        'is_check': game.is_check(),
        'is_checkmate': game.is_checkmate(),
        'legal_moves': game.get_legal_moves()
    })

if __name__ == '__main__':
    app.run(debug=True) 