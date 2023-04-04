import bwipjs from "bwip-js";
import React, { FunctionComponent, useEffect, useState } from "react";

export const QRCode: FunctionComponent<{ data: string; size: number }> = ({
  data,
  size,
}) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let canvas = document.createElement("canvas");
    bwipjs.toCanvas(canvas, {
      bcid: "qrcode", // Barcode type
      text: data, // Text to encode
      includetext: true, // Show human-readable text
      height: size, // Bar height, in millimeters
      width: size, // Bar width, in millimeters
      textxalign: "center", // Always good to set this
    });
    setSrc(canvas.toDataURL("image/png"));
  }, [data, size]);

  return src ? <img className="bg-white" src={src} alt="datamatrix" /> : <></>;
};
