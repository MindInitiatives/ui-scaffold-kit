import JSZip from "jszip";

export interface ZipFile {
  path: string;
  content: string | Buffer;
}

export async function createZipStream(files: ZipFile[]) {
  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.path, file.content);
  }

  const zipData = await zip.generateAsync({
    type: "uint8array",
  });

  return new ReadableStream({
    start(controller) {
      controller.enqueue(zipData);
      controller.close();
    },
  });
}
