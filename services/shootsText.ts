export default function shootsText(abbreviation: string) {
  if (abbreviation === "L") return "Left";
  if (abbreviation === "R") return "Right";
  return abbreviation;
}
