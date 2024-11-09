import React, { useRef, useState } from 'react';
import './Signature.css'; // Import the CSS file

const Signature = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState('');

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
    saveSignature();
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    setSignatureData(canvas.toDataURL()); // Save the signature as a base64-encoded data URL
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureData(''); // Clear the saved signature data
  };

  return (
    <div className="signature-container">
  <canvas
    ref={canvasRef}
    width={400}
    height={200}
    style={{ border: '1px solid black' }}
    onMouseDown={startDrawing}
    onMouseMove={draw}
    onMouseUp={endDrawing}
    onMouseOut={endDrawing}
    onTouchStart={startDrawing}
    onTouchMove={draw}
    onTouchEnd={endDrawing}
  />
  <button onClick={clearCanvas}>Clear Signature</button>
  <div>
    <h2>Saved Signature:</h2>
    {signatureData && <img src={signatureData} alt="Saved Signature" />}
  </div>
</div>

  );
};

export default Signature;
