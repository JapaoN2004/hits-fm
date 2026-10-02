import { fetchNowPlaying } from "@/lib/now-playing";

// Proxy com cache curto: evita CORS e não sobrecarrega o painel do stream.
export async function GET() {
  const data = await fetchNowPlaying();
  return Response.json(data, {
    headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30" },
  });
}
