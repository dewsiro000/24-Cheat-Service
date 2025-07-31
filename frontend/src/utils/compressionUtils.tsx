import LZString from "lz-string";

export const compressData = (data: string[]): string => {
  return LZString.compressToUTF16(JSON.stringify(data)); 
};

export const decompressData = (compressedData: string): string[] => {
  const decompressedData = LZString.decompressFromUTF16(compressedData);
  return decompressedData ? JSON.parse(decompressedData) : [];  
};
