from qdrant_client import models, QdrantClient
from qdrant_client.models import Distance, VectorParams
from sentence_transformers import SentenceTransformer

# Initialize Qdrant client
client = QdrantClient(url="https://e343766d-2df4-4ea9-aa13-000d153fdad6.us-east4-0.gcp.cloud.qdrant.io", api_key="izwQ7y1tkXJ9OYh7EAbBW3evsmgsQmwNGkoe5HoZ9Hohb-ES1zyX8A",)

# Initialize SentenceTransformer encoder
encoder = SentenceTransformer("all-MiniLM-L6-v2")

def simil_search(inputs):
    # Encode the input text into vectors
    #input_vectors = [encoder.encode(input_text).tolist() for input_text in inputs]

    # Search for similar vectors in the Qdrant index
    hits = client.search(
        collection_name="Prompts",
        query_vector=encoder.encode(inputs).tolist(),
        limit=2,
    )
    # Extract payload from hits
    outputs = [(repr(hit.payload)+repr(hit.score)) for hit in hits]
    print(outputs)
    # Return a list of outputs (one for each input)
    return repr(outputs)
