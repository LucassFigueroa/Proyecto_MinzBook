export const money = (n: number) =>
  n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
