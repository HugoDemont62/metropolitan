export async function getSimilarPaints(movement, excludeSlug) {
  const response = await fetch('https://api-museum.vercel.app/objects');
  const data = await response.json();
  const paints = data.objects;

  const excludedPaint = paints.find(p => p.slug === excludeSlug);
  if (!excludedPaint) return [];

  let filteredData = [];

  // 1. Même artiste
  const artistPaints = paints.filter(
    p => p.artist === excludedPaint.artist && p.slug !== excludeSlug
  );
  filteredData.push(...artistPaints);

  // 2. Même mouvement (hors artiste)
  if (filteredData.length < 4) {
    const missing = 4 - filteredData.length;
    const movementPaints = paints.filter(
      p =>
        p.movement === excludedPaint.movement &&
        p.artist !== excludedPaint.artist &&
        p.slug !== excludeSlug &&
        !filteredData.find(f => f.slug === p.slug)
    );
    filteredData.push(...movementPaints.slice(0, missing));
  }

  // 3. Même type (aléatoire)
  if (filteredData.length < 4) {
    const missing = 4 - filteredData.length;
    const typePaints = paints.filter(
      p =>
        p.type === excludedPaint.type &&
        p.slug !== excludeSlug &&
        !filteredData.find(f => f.slug === p.slug)
    );
    // Mélange aléatoirement
    for (let i = typePaints.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [typePaints[i], typePaints[j]] = [typePaints[j], typePaints[i]];
    }
    filteredData.push(...typePaints.slice(0, missing));
  }

  // 4. Par date proche
  if (filteredData.length < 4) {
    const missing = 4 - filteredData.length;
    const datePaints = paints.filter(
      p =>
        p.slug !== excludeSlug &&
        !filteredData.find(f => f.slug === p.slug) &&
        Math.abs((p.date || 0) - excludedPaint.date) <= 50
    );
    filteredData.push(...datePaints.slice(0, missing));
  }

  return filteredData.slice(0, 4);
}