import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
  host: "###",
  apiKey: "###",
});

export async function GET(req: {}) {
  const point = req.nextUrl.searchParams.get("point");
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
