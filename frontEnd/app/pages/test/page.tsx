"use client";

import React, { useRef, useState, useEffect } from "react";
import * as fabric from "fabric";

function TShirtDesigner() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    // Initialize Fabric.js canvas
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      height: 500,
      width: 500,
    });
    setCanvas(initCanvas);

    // Cleanup on component unmount
    return () => {
      initCanvas.dispose();
    };
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && canvas) {
      const reader = new FileReader();
      reader.onload = () => {
        fabric.FabricImage.fromURL(reader.result, (img) => {
          img.scaleToWidth(400);
          img.scaleToHeight(400);
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
          canvas.add(img);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addText = () => {
    if (canvas) {
      const text = new fabric.Textbox("Your Text", {
        left: 100,
        top: 100,
        fontSize: 24,
        fill: "#000",
      });
      canvas.add(text);
    }
  };

  const addOverlayImage = (event) => {
    const file = event.target.files[0];
    if (file && canvas) {
      const reader = new FileReader();
      reader.onload = () => {
        fabric.FabricImage.fromURL(reader.result, (img) => {
          img.set({
            left: 150,
            top: 150,
            scaleX: 0.5,
            scaleY: 0.5,
          });
          canvas.add(img);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1,
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "tshirt-design.png";
      link.click();
    }
  };

  function fileHandler(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const image = await fabric.FabricImage.fromURL(e.target.result);
      image.scale(0.5);
      canvas.add(image);
      canvas.centerObject(image);
      canvas.setActiveObject(image);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>T-Shirt Designer</h2>
      <input
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
        key="background-upload"
      />
      <button onClick={addText}>Add Text</button>
      <input
        type="file"
        onChange={addOverlayImage}
        accept="image/*"
        key="overlay-upload"
      />
      <button onClick={downloadImage}>Download Design</button>
      <div style={{ display: "inline-block", marginTop: "20px" }}>
        <canvas ref={canvasRef} style={{ border: "1px solid #ccc" }} />
      </div>

      <button title="Add image">
        <input type="file" accept=".png, .jpg, .jpeg" onChange={fileHandler} />
      </button>
    </div>
  );
}

export default TShirtDesigner;
