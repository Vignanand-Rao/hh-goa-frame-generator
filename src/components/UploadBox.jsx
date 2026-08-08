import { useEffect, useRef, useState } from "react";

function UploadBox({ image, setImage, setFile }) {
  const cameraStreamRef = useRef(null);
  const videoRef = useRef(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const openCamera = async () => {
    setCameraError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera is not supported by this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 1280 },
        },
        audio: false,
      });

      cameraStreamRef.current = stream;
      setCameraOpen(true);
    } catch (error) {
      console.error(error);
      setCameraError(
        "Camera permission was denied or the camera is unavailable."
      );
    }
  };

  useEffect(() => {
    if (cameraOpen && videoRef.current && cameraStreamRef.current) {
      videoRef.current.srcObject = cameraStreamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [cameraOpen]);

  const closeCamera = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      cameraStreamRef.current = null;
    }

    setCameraOpen(false);
  };

  const captureSelfie = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          return;
        }

        const selfieFile = new File(
          [blob],
          "hh-goa-selfie.jpg",
          {
            type: "image/jpeg",
          }
        );

        const previewUrl = URL.createObjectURL(blob);

        setFile(selfieFile);
        setImage(previewUrl);

        setCameraError("");
        closeCamera();
      },
      "image/jpeg",
      0.92
    );
  };

  const handleGalleryChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setCameraError("");
      alert("Please select an image.");
      return;
    }

    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));

    setCameraError("");

    event.target.value = "";
  };

  const removePhoto = () => {
    setImage(null);
    setFile(null);
    setCameraError("");
  };

  return (
    <>
      <div className="w-full">
        <div className="rounded-3xl border-2 border-dashed border-zinc-700 bg-black p-6 text-center">
          {image ? (
            <div className="flex flex-col items-center">
              <img
                src={image}
                alt="Selfie preview"
                className="h-48 w-48 rounded-full border-4 border-blue-500 object-cover shadow-2xl"
              />

              <p className="mt-4 text-sm font-semibold text-green-400">
                ✓ Selfie selected
              </p>

              <button
                type="button"
                onClick={removePhoto}
                className="mt-3 text-sm font-semibold text-red-400 hover:text-red-300"
              >
                Remove Photo
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800 text-5xl">
                🤳
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                Add Your Selfie
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Take a selfie or choose one from your gallery
              </p>
            </div>
          )}

          <input
            id="gallery-upload"
            type="file"
            accept="image/*"
            onChange={handleGalleryChange}
            className="hidden"
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={openCamera}
              className="rounded-2xl bg-blue-600 px-5 py-4 font-bold text-white transition hover:bg-blue-700"
            >
              📷 Take Selfie
            </button>

            <label
              htmlFor="gallery-upload"
              className="cursor-pointer rounded-2xl border border-zinc-600 bg-zinc-900 px-5 py-4 font-bold text-white transition hover:bg-zinc-800"
            >
              🖼️ Choose Photo
            </label>
          </div>

          {cameraError && !image && (
            <p className="mt-4 text-sm font-semibold text-red-400">
              {cameraError}
            </p>
          )}
        </div>
      </div>

      {cameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="w-full max-w-lg rounded-3xl border border-zinc-700 bg-zinc-900 p-5 shadow-2xl">
            <h2 className="mb-4 text-center text-2xl font-black text-white">
              Take Your Selfie
            </h2>

            <div className="overflow-hidden rounded-3xl bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={closeCamera}
                className="rounded-2xl border border-zinc-600 bg-zinc-800 py-4 font-bold text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={captureSelfie}
                className="rounded-2xl bg-blue-600 py-4 font-bold text-white"
              >
                📸 Capture
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UploadBox;