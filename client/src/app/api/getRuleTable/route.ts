import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
  host: "###",
  apiKey: "###",
});

export async function GET() {
  const output = await client.scroll("Prompts", {
    with_payload: true,
  });

  console.log(output);
  console.log(output.points[2].payload);

  return Response.json({ message: output.points });
}
