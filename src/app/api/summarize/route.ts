import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { connectDB } from "../../../../lib/db";
import { Summary } from "../../../../models/Summary";
import { extractTextFromBuffer } from "../../../../lib/extract";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  let text = await extractTextFromBuffer(buffer, file.name);
  if (!text || text.trim().length === 0)
    return NextResponse.json({ error: "No text extracted" }, { status: 400 });

  if (text.length > 24000) text = text.slice(0, 24000);

  const prompt = text;
  const hfKey = process.env.HUGGINGFACE_API_KEY;
  if (!hfKey)
    return NextResponse.json(
      { error: "Missing Hugging Face key" },
      { status: 500 }
    );

  // 1️⃣ Generar resumen con facebook/bart-large-cnn
  const resp = await fetch(
    "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 300 },
      }),
    }
  );

  if (!resp.ok) {
    const txt = await resp.text();
    console.error("HF API Error:", txt);
    return NextResponse.json(
      { error: "Hugging Face error", detail: txt },
      { status: 500 }
    );
  }

  const data = await resp.json();
  let summary = data?.[0]?.summary_text || "No se pudo generar resumen.";

  // Traducir resumen al español (usando modelo gratuito de traducción)
  const translationResp = await fetch(
    "https://router.huggingface.co/hf-inference/models/Helsinki-NLP/opus-mt-en-es",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: summary,
      }),
    }
  );

  let translatedSummary = summary;
  if (translationResp.ok) {
    const translationData = await translationResp.json();
    translatedSummary = translationData?.[0]?.translation_text || summary;
  }

  function forceFiveBullets(text: string): string {
    text = text.replace(/\s+/g, " ").trim();

    // 1️⃣ Detectar oraciones reales
    const match = text.match(/[^\.!?]+[\.!?]?/g);
    let sentences: string[] = match
      ? match.map((s) => s.trim()).filter((s) => s.length > 3)
      : [];

    // Si ya hay 5 o más → tomar las primeras 5
    if (sentences.length >= 5) {
      return sentences
        .slice(0, 5)
        .map((s) => `• ${s}`)
        .join("\n");
    }

    // Si hay menos → dividir el texto completo en 5 partes sin cortar palabras
    const words = text.split(" ").filter((w) => w.trim().length > 0);
    const chunkSize = Math.ceil(words.length / 5);

    const forced: string[] = [];

    for (let i = 0; i < 5; i++) {
      const chunk = words
        .slice(i * chunkSize, (i + 1) * chunkSize)
        .join(" ")
        .trim();
      forced.push(chunk.length > 0 ? chunk : "Información no disponible");
    }

    return forced.map((s) => `• ${s}`).join("\n");
  }

  translatedSummary = forceFiveBullets(translatedSummary);

  await connectDB();
  await Summary.create({
    userEmail: session.user.email,
    fileName: file.name,
    summary: translatedSummary,
  });

  return NextResponse.json({ summary: translatedSummary });
}
