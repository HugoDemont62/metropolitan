export async function getPaintById(id) {
  const res = await fetch(`https://api-museum.vercel.app/objects/${id}`);
  if (!res.ok) {
    throw new Error('Erreur lors de la récupération de la peinture');
  }
  return await res.json();
}