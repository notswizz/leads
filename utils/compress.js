// utils/compress.js
import imageCompression from 'browser-image-compression';

export const base64ToFile = (base64String, filename) => {
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const compressImage = async (base64Image) => {
  const imageFile = base64ToFile(base64Image, 'upload.png');
  const options = {
    maxSizeMB: 1, // Set the maximum size in MB
    maxWidthOrHeight: 1920, // Set the maximum width or height
    useWebWorker: true, // Use web worker for faster compression
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    const compressedBase64Image = await imageCompression.getDataUrlFromFile(compressedFile);
    return compressedBase64Image;
  } catch (error) {
    console.error('Error compressing image:', error);
  }
};
