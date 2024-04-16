from qdrant_client import models, QdrantClient
from qdrant_client.models import Distance, VectorParams
from sentence_transformers import SentenceTransformer
from azuredb import addPrompt

# Initialize Qdrant client
client = QdrantClient(
    url="https://e343766d-2df4-4ea9-aa13-000d153fdad6.us-east4-0.gcp.cloud.qdrant.io",
    api_key="izwQ7y1tkXJ9OYh7EAbBW3evsmgsQmwNGkoe5HoZ9Hohb-ES1zyX8A",
)
# Initialize SentenceTransformer encoder
encoder = SentenceTransformer("all-MiniLM-L6-v2")


import openai
import requests
import json

openai.api_key = "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"
api_url = "https://api.openai.com/v1/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai.api_key}",
}
messages = [{"role": "system", "content": "You are a intelligent assistant."}]


def simil_search(inputs):
    # Encode the input text into vectors
    # input_vectors = [encoder.encode(input_text).tolist() for input_text in inputs]

    # Search for similar vectors in the Qdrant index
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": inputs}],
        "temperature": 0.7,
    }

    hits = client.search(
        collection_name="Prompts",
        query_vector=encoder.encode(inputs).tolist(),
        limit=3,
    )
    result = 0
    outputs = ""
    for hit in hits:
        print(hit.payload, "score:", hit.score)
        search = hit.payload["description"]
        threshold = hit.payload["threshold"]
        print(threshold)
        if hit.score > threshold:
            result = 1
            print("Violation of rule:", hit.payload["description"])
            break
    if result == 1:
        outputs = "Sorry violation of rule: " + hit.payload["description"]
        print("Alert")
        addPrompt("user420", inputs, "High", hit.payload["description"])
    else:
        response = requests.post(api_url, headers=headers, data=json.dumps(payload))
        if response.status_code == 200:
            outputs = response.json()["choices"][0]["message"]["content"]
        else:
            print("Error:", response.status_code)
            outputs = response.json().status_code
        if(hit.score*0.95>threshold):
            addPrompt("user420", inputs, "Medium", "May violate rule"+hit.payload["description"])
        else:
            addPrompt("user420", inputs, "Low", "No significant risks.")
    # Extract payload from hits
    print(outputs)
    # Return a list of outputs (one for each input)
    return outputs
