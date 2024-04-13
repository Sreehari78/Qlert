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

@app.route('/get_rules', methods=['GET'])
def get_rules():
    from qdrant_client import QdrantClient
    client = QdrantClient(url="https://e343766d-2df4-4ea9-aa13-000d153fdad6.us-east4-0.gcp.cloud.qdrant.io", api_key="izwQ7y1tkXJ9OYh7EAbBW3evsmgsQmwNGkoe5HoZ9Hohb-ES1zyX8A")

    output = client.scroll(
        collection_name="Prompts",
        with_payload=True,
        with_vectors=False,
    )

    # Convert Record objects to dictionaries
    records = []
    for record in output[0]:
        record_dict = {
            'id': record.id,
            'payload': record.payload,
            # Add other fields as needed
        }
        records.append(record_dict)
    print(f"Received output: {records}")
    

    return jsonify({'output': records})

if __name__ == '__main__':
    app.run(debug=True)
