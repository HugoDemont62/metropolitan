export async function getAllPaints() {
  const res = await fetch('https://api-museum.vercel.app/objects');
  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des peintures');
  }
  const data = await res.json();
  return data.objects;
}