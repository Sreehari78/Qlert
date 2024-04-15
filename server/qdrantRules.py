import numpy as np
from qdrant_client.models import PointStruct
from qdrant_client import models, QdrantClient
import uuid
from sentence_transformers import SentenceTransformer
encoder = SentenceTransformer("all-MiniLM-L6-v2")

def insert_rule(payload, collection_name="Prompts"):
    # vector = np.random.rand(20)
    # # Initialize Qdrant client
    client = QdrantClient(
        url="https://e343766d-2df4-4ea9-aa13-000d153fdad6.us-east4-0.gcp.cloud.qdrant.io",
        api_key="izwQ7y1tkXJ9OYh7EAbBW3evsmgsQmwNGkoe5HoZ9Hohb-ES1zyX8A",
    )
    point_id = str(uuid.uuid4())
    # # Insert the statement into the collection
    # client.upsert(
    #     collection_name=collection_name,
    #     points=[
    #         PointStruct(
    #             id=point_id,
    #             vector=vector.tolist(),
    #             payload=payload,
    #         )
    #     ],
    # )
    documents=[payload]
    client.upload_points(
    collection_name="Prompts",
    points=[
        models.PointStruct(
            id=point_id, vector=encoder.encode(doc["description"]).tolist(), payload=doc
        )
        for idx, doc in enumerate(documents)
    ],
)
