export function randomValueFromZeroTo({ to }: { to: number }): number {
  return Math.floor(Math.random() * to);
}
