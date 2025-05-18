declare module 'imagetracerjs' {
    interface ImageTracerOptions {
      pathomit?: number;
      numberofcolors?: number;
      blurradius?: number;
      ltres?: number;
      qtres?: number;
      [key: string]: any;
    }
  
    interface ImageTracerStatic {
      imagedataToSVG(imageData: ImageData, options?: ImageTracerOptions): string;
    }
  
    const ImageTracer: ImageTracerStatic;
    export default ImageTracer;
  }
  