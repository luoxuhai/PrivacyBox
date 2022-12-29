export function randomNum(n: number): string {
  let t = '';
  for (let i = 0; i < n; i++) {
    t += Math.floor(Math.random() * 10);
  }
  return t;
}
