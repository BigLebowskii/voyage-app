from flask import render_template, request, jsonify
from app import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    story_text = request.form.get('story_text')
    #Image gen logic goes here
    return jsonify({'message': 'Image generation will be implemented here'})
