export async function getSimilarPaints(movement, excludeSlug) {
  const response = await fetch('https://api-museum.vercel.app/objects');
  const data = await response.json();
  const paints = data.objects;

  // 1. Filtrer par mouvement
  let filteredData = paints.filter(
    p => p.movement === movement && p.slug !== excludeSlug,
  );

  // 2. Compléter par artistes du même mouvement
  if (filteredData.length < 4) {
    const missing = 4 - filteredData.length;
    const artists = new Set(filteredData.map(p => p.artist));
    const artistCandidates = paints.filter(
      p =>
        p.movement === movement &&
        p.slug !== excludeSlug &&
        !artists.has(p.artist),
    );
    filteredData.push(...artistCandidates.slice(0, missing));
  }

  // 3. Compléter par date proche
  if (filteredData.length < 4) {
    const missing = 4 - filteredData.length;
    const refYear = filteredData[0]?.date || 0;
    const dateCandidates = paints.filter(
      p =>
        p.slug !== excludeSlug &&
        !filteredData.find(f => f.slug === p.slug) &&
        Math.abs((p.date || 0) - refYear) <= 50,
    );
    filteredData.push(...dateCandidates.slice(0, missing));
  }

  return filteredData.slice(0, 5);
}