export async function getSimilarPaints(movement, excludeSlug) {
  const response = await fetch('https://api-museum.vercel.app/objects');
  const data = await response.json();
  const paints = data.objects;

  const filteredData = paints.filter(
    p => p.movement === movement && p.slug !== excludeSlug
  );
  filteredData.forEach((p) => {
    p.object
  })
  console.log(`Peintures similaires pour le mouvement "${movement}" excluant "${excludeSlug}":`, filteredData);

  return filteredData;
}