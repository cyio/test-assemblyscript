// The entry file of your WebAssembly module.
export function add(a: i32, b: i32): i32 {
  return a + b;
}

export const UINT8ARRAY_ID = idof<Uint8Array>();

export function processImage(imageDataPtr: usize, width: i32, height: i32): void {
    // 获取 Uint8Array 实例
    let imageData = changetype<Uint8Array>(imageDataPtr);

    let halfWidth: i32 = width / 2;

    for (let y: i32 = 0; y < height; y++) {
        for (let x: i32 = 0; x < halfWidth; x++) {
            let index: i32 = (y * width + x) * 4;
            imageData[index] = 0;     // R
            imageData[index + 1] = 0; // G
            imageData[index + 2] = 0; // B
        }
    }
}

