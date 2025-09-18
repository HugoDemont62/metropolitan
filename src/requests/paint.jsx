export async function getPaintBySlug(slug) {
  const res = await fetch(`https://api-museum.vercel.app/objects/${slug}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Erreur lors de la récupération de la peinture');
  }
  const data = await res.json();
  console.log('Peinture reçue:', data);
  return data;
}