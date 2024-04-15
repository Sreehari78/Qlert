import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join, dirname } from "path";

export async function POST(request: NextRequest) {
  const currentDirectory = process.cwd();
  const parentDirectory = dirname(currentDirectory);
  console.log(parentDirectory);
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) return NextResponse.json({ message: "No file found" });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join(parentDirectory, "temp", file.name);
  await writeFile(path, buffer);
  console.log(`File written to ${path}`);

  return NextResponse.json({ message: file.name });
}
