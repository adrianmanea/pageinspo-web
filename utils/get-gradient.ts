export function getGradient(username: string) {
  const hash = Array.from(username).reduce(
    (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
    0
  );

  const colors = [
    "#f87171", // red-400
    "#fb923c", // orange-400
    "#fbbf24", // amber-400
    "#a3e635", // lime-400
    "#34d399", // emerald-400
    "#22d3ee", // cyan-400
    "#60a5fa", // blue-400
    "#818cf8", // indigo-400
    "#c084fc", // purple-400
    "#f472b6", // pink-400
    "#fb7185", // rose-400
  ];

  const index1 = Math.abs(hash) % colors.length;
  let index2 = Math.abs(hash >> 1) % colors.length;

  // Ensure distinct colors
  if (index1 === index2) {
    index2 = (index1 + 1) % colors.length;
  }

  const c1 = colors[index1];
  const c2 = colors[index2];
  const angle = Math.abs(hash % 360);

  return `linear-gradient(${angle}deg, ${c1}, ${c2})`;
}
