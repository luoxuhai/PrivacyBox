export function randomNum(n: number): string {
  let t = '';
  for (let i = 0; i < n; i++) {
    t += Math.floor(Math.random() * 10);
  }
  return t;
}

export function randomNumRange(min: number, max: number) {
  switch (arguments.length) {
    case 1:
      return parseInt(String(Math.random() * min + 1), 10);
    case 2:
      return parseInt(Math.random() * (max - min + 1) + min, 10);
    default:
      return 0;
  }
}
