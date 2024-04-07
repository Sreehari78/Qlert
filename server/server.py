from flask import Flask, request, jsonify
from flask_cors import CORS
from semantic import simil_search

app = Flask(__name__)
CORS(app)
@app.route('/get_response', methods=['POST'])
def process_text():
    # Get the input text from the POST request
    data = request.get_json()
    input_text = data['messages']
    print(f"Received input text: {input_text}")
    # Here you can process the input text (if needed)
    # For now, let's just return the same text
    output_text = simil_search(input_text)
    print(f"Returning output text: {output_text}")
    # Return the output text as JSON
    return jsonify({'output': output_text})

if __name__ == '__main__':
    app.run(debug=True)
