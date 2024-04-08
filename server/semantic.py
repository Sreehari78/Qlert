from qdrant_client import models, QdrantClient
from qdrant_client.models import Distance, VectorParams
from sentence_transformers import SentenceTransformer

import pyodbc
server = 'qlert.database.windows.net'
database = 'Records'
username = 'sreehariadmin'
password = 'cetrion123#'
driver= '{ODBC Driver 17 for SQL Server}'
port=1433
cnxn = pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = cnxn.cursor()


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
        limit=3,
    )
    for hit in hits:
        print(hit.payload, "score:", hit.score)
        # Define the search term
        search = 'Harassment or bullying of colleagues'

        # Define the SQL query with parameterized query
        rule = "SELECT threshold_value FROM Rules WHERE rule_info = ?"

        # Execute the SQL query with the search parameter
        cursor.execute(rule, search)
        row = cursor.fetchone() 

    # Extract payload from hits
    outputs = [(repr(hit.payload)+repr(hit.score)) for hit in hits]
    print(outputs)
    # Return a list of outputs (one for each input)
    return repr(outputs)
