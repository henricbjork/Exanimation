export const clearQueueTimer = (timer) => {
  return new Promise(function (resolve, reject) {
    clearTimeout(timer);
    resolve();
  });
}
