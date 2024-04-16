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
        url="###",
        api_key="###",
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
