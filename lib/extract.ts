const pdf = require('pdf-parse');

export async function extractTextFromBuffer(buffer: Buffer, filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "pdf") {
    const data = await pdf(buffer);
    return data.text || "";
  }
  return buffer.toString("utf-8");
}
