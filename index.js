'use strict';
// Canvas context and settings
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
const width = canvas.width;
const height = canvas.height;

// Manipulation is done via a typed array, the entire representation
// of the canvas.  that is, data is a reference to the canvas and buf8 is
// a representation of the next step
const imageData = ctx.getImageData(0, 0, width, height);
const data = imageData.data;
const buf = new ArrayBuffer(data.length);
const buf8 = new Uint8ClampedArray(buf);

const PROBABILITY = 0.09  ; // Probability cell randomly turns on

// Using probability, randomly turn some cells on.  in this case on means
// a single u8 turned on
const setup = () => {
  for (let index = 0; index < 640000; index += 4) {
    data[index] = Math.random() > (1 - PROBABILITY) ? 255 : 0;
    data[index + 1] = 0;
    data[index + 2] = 0;
    data[index + 3] = data[index] - 128;
    buf8[index + 1] = 0;
    buf8[index + 2] = 0;
    buf8[index + 3] = 0;
  }
  ctx.putImageData(imageData, 0, 0);
  requestAnimationFrame(step);
}

// step through each cell of the canvas data, calculate whether it should be
// alive or dead, and update the corresponding cell in buf8
const step = () => {
  for (let index = 1600; index < 638000; index += 4) {
    let d = (data[index - 4] +
      data[index + 4] + data[index + 1600] +
      data[index - 1600] + data[index + 1604] +
      data[index + 1596] + data[index - 1604] +
      data[index - 1596]) | 0;

    if (data[index] === 255) {
      if (d === 765 || d === 510) {
        buf8[index] = 255;
      } else {
        buf8[index] = 0;
      }
    } else {
      if (d === 765) {
        buf8[index] = 255;
      } else {
        buf8[index] = 0;
      }
    }
    buf8[index + 3] = buf8[index] - 128 | 0;
  }
  // when we've finished every cell, set the image data to the data in buf8
  // we don't need to clear buf8 since we'll just overwrite it in the next step
  data.set(buf8);
  ctx.putImageData(imageData, 0, 0);
  requestAnimationFrame(step);
}

// Connect animation to re-paint
window.requestAnimationFrame(() => setup());
