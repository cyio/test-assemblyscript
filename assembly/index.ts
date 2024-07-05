// The entry file of your WebAssembly module.
export function add(a: i32, b: i32): i32 {
  return a + b;
}

export const UINT8ARRAY_ID = idof<Uint8Array>();

export function processImage(imageDataPtr: usize, width: i32, height: i32): void {
    // 获取 Uint8Array 实例
    let imageData = changetype<Uint8Array>(imageDataPtr);

    let halfWidth: i32 = width / 2;
    let factor: f32 = 0.9;

    for (let y: i32 = 0; y < height; y++) {
        for (let x: i32 = 0; x < halfWidth; x++) {
            let index: i32 = (y * width + x) * 4;
            imageData[index] = clampToU8(imageData[index] * factor);     // R
            imageData[index + 1] = clampToU8(imageData[index + 1] * factor); // G
            imageData[index + 2] = clampToU8(imageData[index + 2] * factor); // B
        }
    }
}

function clampToU8(value: f32): u8 {
  if (value < 0.0) {
    return 0;
  } else if (value > 255.0) {
    return 255;
  } else {
    return <u8>value;
  }
}