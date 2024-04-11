from qdrant_client import models, QdrantClient
client = QdrantClient(url="https://e343766d-2df4-4ea9-aa13-000d153fdad6.us-east4-0.gcp.cloud.qdrant.io",api_key="izwQ7y1tkXJ9OYh7EAbBW3evsmgsQmwNGkoe5HoZ9Hohb-ES1zyX8A",)
#client = QdrantClient(url="http://localhost:6333")
from qdrant_client.models import Distance, VectorParams
from sentence_transformers import SentenceTransformer
encoder = SentenceTransformer("all-MiniLM-L6-v2")
import requests
import json

# documents = [
#     {
#         "name": "Company Policy",
#         "description": "Expressing violent or self-harming intentions.",
#         "author": "Admin1",
#         "year": 2020,
        
#     },
#     {
#         "name": "Company Policy",
#         "description": "Violation of company policy and legal issues.",
#         "author": "Admin1",
#         "year": 2020,
        
#     },
#     {
#         "name": "Company Policy",
#         "description": "Damage to company systems,hardware and infrastructure.",
#         "author": "Admin1",
#         "year": 2020,
        
#     }
#     ]
# client.recreate_collection(
#     collection_name="Prompts",
#     vectors_config=models.VectorParams(
#         size=encoder.get_sentence_embedding_dimension(),  # Vector size is defined by used model
#         distance=models.Distance.COSINE,
#     ),
# )
# client.upload_points(
#     collection_name="Prompts",
#     points=[
#         models.PointStruct(
#             id=idx, vector=encoder.encode(doc["description"]).tolist(), payload=doc
#         )
#         for idx, doc in enumerate(documents)
#     ],
#)

hits = client.search(
    collection_name="Prompts",
    query_vector=encoder.encode("I want to kill myself").tolist(),
    limit=3,
)

# Execute the SQL query with the search parameter
for hit in hits:
    print(hit.payload, "score:", hit.score)
    search = hit.payload['description']
    threshold=hit.payload['threshold']
    print (threshold)
    if(hit.score>threshold):
        print("Alert")
        break

import openai 
openai.api_key = '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'
api_url = "https://api.openai.com/v1/chat/completions"
message = "Say this is a test!"
payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": message}],
        "temperature": 0.7
    }
headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai.api_key}"
    }
messages = [ {"role": "system", "content":  
              "You are a intelligent assistant."} ] 
response = requests.post(api_url, headers=headers,data=json.dumps(payload))
if response.status_code == 200:
    print(response.json()["choices"][0]["message"]["content"])
else:
    print("Error:", response.status_code)   

#ITERATE OVER ALL VECTOR DB POINTS
# output=client.scroll(
#     collection_name="Prompts",
#     with_payload=True,
#     with_vectors=False,
# )
# print(output)