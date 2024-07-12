// 获取 canvas 和上下文
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'gray';
ctx.fillRect(0, 0, canvas.width, canvas.height);

async function loadAndProcessImage() {
    console.log('start');
  
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const imageArray = new Uint8Array(imageData.data);
  
    // 分配 WebAssembly 内存
    const imageArrayPtr = Module._malloc(imageArray.length * imageArray.BYTES_PER_ELEMENT);
    Module.HEAPU8.set(imageArray, imageArrayPtr);
  
    const result = Module.ccall(
      "processImage", // name of C function
      'number', // return type
      ['number', 'number', 'number', 'number'], // argument types
      [imageArrayPtr, canvas.width, canvas.height, 40] // arguments
    );

    if (result !== 0) {
        throw('c code error');
        return;
    }
  
    // 如果需要从 WebAssembly 获取修改后的图像数据回到 JavaScript
    const resultArray = new Uint8Array(Module.HEAPU8.buffer, imageArrayPtr, imageArray.length);
    imageData.data.set(resultArray);
    ctx.putImageData(imageData, 0, 0);
  
    // 释放 WebAssembly 内存
    Module._free(imageArrayPtr);  
    console.log('end');
  }
  
  document.getElementById('mybutton').addEventListener('click', () => {
    // alert(“check console”);
    // console.log('result: ', result);
    loadAndProcessImage();
  });
  