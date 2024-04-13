import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
  host: "e343766d-2df4-4ea9-aa13-000d153fdad6.us-east4-0.gcp.cloud.qdrant.io",
  apiKey: "izwQ7y1tkXJ9OYh7EAbBW3evsmgsQmwNGkoe5HoZ9Hohb-ES1zyX8A",
});

export async function GET(req: {}) {
  const point = parseInt(req.nextUrl.searchParams.get("point"));
  console.log(point);
  try {
    const output = await client.delete("Prompts", {
      wait: true,
      ordering: "strong",
      points: [point],
    });

    return Response.json({ message: output });
  } catch (error) {
    console.error("Error deleting points:", error);
    return Response.json({ message: "Error" });
  }
}
