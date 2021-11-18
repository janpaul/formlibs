export const sleep = (time: number = 0): Promise<any> =>
  new Promise((resolve) => setTimeout(resolve, time));
