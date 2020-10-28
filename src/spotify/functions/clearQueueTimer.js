export const clearQueueTimer = (timer) => {
  return new Promise(function (resolve, reject) {
    clearTimeout(timer);
    console.log('paused');
    resolve();
  });
}
