import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const UserImageCropper = ({ imageSrc, onCropComplete, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropImage = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = imageSrc;

    await new Promise((resolve) => {
      image.onload = () => {
        const size = croppedAreaPixels.width;
        canvas.width = size;
        canvas.height = size;

        ctx.clearRect(0, 0, size, size);

        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          size,
          size
        );
        resolve();
      };
    });

    canvas.toBlob((blob) => {
      onCropComplete(blob);
      onClose();
    }, "image/png");
  };

  const handleZoomChange = (value) => {
    setZoom(value[0]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="relative w-full max-w-md mx-4">
        <CardContent className="p-6">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropCompleteHandler}
              classes={{
                containerClassName: "rounded-xl",
                cropAreaClassName: "!border-4 !border-white/80"
              }}
            />
          </div>

          <div className="mt-6 px-2">
            <p className="text-sm text-muted-foreground mb-2">Zoom</p>
            <Slider
              value={[zoom]}
              onValueChange={handleZoomChange}
              min={1}
              max={3}
              step={0.1}
              className="w-full"
            />
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex justify-end gap-3">
          <Button onClick={handleCropImage} className="w-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
            Crop
          </Button>
          <Button onClick={onClose} className="w-1/2 bg-slate-700 hover:bg-black">
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserImageCropper;