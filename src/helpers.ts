export const getRandom = (max: number, min: number = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
}

export const randomBool = () => {
  return Math.random() < 0.5;
}
