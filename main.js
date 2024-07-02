import { instantiateStreaming } from "https://cdn.jsdelivr.net/npm/@assemblyscript/loader/index.js";

// 异步函数来加载 WebAssembly 模块并处理图像
async function loadAndProcessImage() {
    // 加载并实例化 .wasm 文件
    console.log('begin')
    const wasmModule = await instantiateStreaming(fetch('build/debug.wasm'), {
        // 可以添加导入对象，如果模块需要环境或其他 WebAssembly 模块的特定功能
    });
    const { UINT8ARRAY_ID, __newArray, processImage, __getArray, __pin, __unpin, __collect } = wasmModule.exports;

    // 获取 canvas 和上下文
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // 检查wasmModule是否正确提供了UINT8ARRAY_ID，这通常在你的 AssemblyScript 代码中定义
    if (!UINT8ARRAY_ID) {
        console.error("UINT8ARRAY_ID is not defined in the WASM module.");
        return;
    }

    // 使用 loader 提供的 __newArray 方法来处理内存分配，传递图像数据
    const imageArrayPtr = __newArray(UINT8ARRAY_ID, imageData.data);

    // Pin the array to prevent it from being garbage collected
    __pin(imageArrayPtr);

    // 调用 AssemblyScript 模块中定义的 processImage 函数
    processImage(imageArrayPtr, canvas.width, canvas.height);

    // 如果需要从 WebAssembly 获取修改后的图像数据回到 JavaScript
    const resultArray = __getArray(imageArrayPtr, Uint8Array);
    imageData.data.set(resultArray);
    ctx.putImageData(imageData, 0, 0);

    // Unpin the array to allow garbage collection
    __unpin(imageArrayPtr);
    // __collect();
}

loadAndProcessImage();