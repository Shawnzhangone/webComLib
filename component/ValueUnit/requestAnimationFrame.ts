let lastTime = 0;

let requestAnimationFrame = window.requestAnimationFrame;
let cancelAnimationFrame = window.cancelAnimationFrame;

// 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
if (!requestAnimationFrame || !cancelAnimationFrame) {
  requestAnimationFrame = (callback: (time: number) => void) => {
    const currTime = new Date().getTime();
    // 为了使setTimteout的尽可能的接近每秒60帧的效果
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

  cancelAnimationFrame = (id: number | undefined) => {
    window.clearTimeout(id);
  };
}

export { requestAnimationFrame, cancelAnimationFrame };
