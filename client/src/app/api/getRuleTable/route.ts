import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
  host: "e343766d-2df4-4ea9-aa13-000d153fdad6.us-east4-0.gcp.cloud.qdrant.io",
  apiKey: "izwQ7y1tkXJ9OYh7EAbBW3evsmgsQmwNGkoe5HoZ9Hohb-ES1zyX8A",
});

export async function GET() {
  const output = await client.scroll("Prompts", {
    with_payload: true,
  });

  console.log(output);
  console.log(output.points[2].payload);

  return Response.json({ message: output.points });
}
