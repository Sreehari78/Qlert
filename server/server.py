import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from semantic import simil_search
import wget
import re
import openai
from qdrant_client import models, QdrantClient
import convertapi
from documenttest import summary
from qdrantRules import insert_rule

client = QdrantClient(
    url="###",
    api_key="###",
)
openai.api_key = "###"
api_url = "https://api.openai.com/v1/chat/completions"

app = Flask(__name__)
CORS(app)


@app.route("/get_response", methods=["POST"])
def process_text():
    # Get the input text from the POST request
    data = request.get_json()
    input_text = data["messages"]
    print(f"Received input text: {input_text}")
    # Here you can process the input text (if needed)
    # For now, let's just return the same text
    output_text = simil_search(input_text)
    print(f"Returning output text: {output_text}")
    # Return the output text as JSON
    return jsonify({"output": output_text})


@app.route("/get_rules", methods=["GET"])
def get_rules():
    from qdrant_client import QdrantClient
    client = QdrantClient(url="###", api_key="###")

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
@app.route("/get_new_rule", methods=["POST"])
def get_new_rule():
    data = request.get_json()
    statement = data["messages"]
    openai.api_key = "###"
    api_url = "https://api.openai.com/v1/chat/completions"
    prompt = """Provide a threshold value between 0 and 1 for the given rule, representing the maximum tolerable level of compliance deviation of a chatbot's guidelines. Return only a float value:
".
    """


    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": prompt},
            {"role": "user", "content": statement},
        ],
        "temperature": 0.7,
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai.api_key}",
    }

    response = requests.post(api_url, headers=headers, data=json.dumps(payload))
    response_content = response.json()["choices"][0]["message"]["content"]
    print(response_content)
    payload = {
    "author": "Admin1",
    "description": statement,
    "name": "Company Policy",
    "threshold": float(response_content),
    "year": 2024,
    }   
    
    insert_rule(payload)
    return jsonify({'output': 'success'})

@app.route("/upload_text", methods=["POST"])
def upload_text():
    data = request.get_json()
    print(data)
    print(data["messages"])
    # pdf_data = data.get("pdfData")
    # url = pdf_data["Url"]
    # filename = wget.download(url)
    # print("Downloaded file:", filename)
    filename="D:\\Softwares\\Codes\\Hackathons\\Knack2Hack\\Qlert\\temp\\"+str(data["messages"])
    print(filename)
    convertapi.api_secret = 'uXXLiOk3FnQiP04w'
    convertapi.convert('txt', {'File': filename}, from_format = 'pdf').save_files('D:\\Softwares\\Codes\\Hackathons\\Knack2Hack\\Qlert\\temp')
    trimmed_string =data["messages"][:-4]
    summary("D:\\Softwares\\Codes\\Hackathons\\Knack2Hack\\Qlert\\temp\\"+trimmed_string+".txt")
    ##ADD CODE TO SPLIT RESPONSE
    # ADD CODE TO UPLOAD RESPONSE TO QDRANT
    return jsonify({'output': 'Success'})


if __name__ == "__main__":
    app.run(debug=True)
