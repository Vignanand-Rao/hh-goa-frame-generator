import { useRef } from "react";

function UploadBox({ image, setImage, setFile }) {
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
  };

  const handleCameraChange = (event) => {
    handleFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleGalleryChange = (event) => {
    handleFile(event.target.files?.[0]);
    event.target.value = "";
  };

  return (
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

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleCameraChange}
            className="hidden"
          />

          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            onChange={handleGalleryChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="rounded-2xl bg-blue-600 px-5 py-4 font-bold text-white transition hover:bg-blue-700"
          >
            📷 Take Selfie
          </button>

          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="rounded-2xl border border-zinc-600 bg-zinc-900 px-5 py-4 font-bold text-white transition hover:bg-zinc-800"
          >
            🖼️ Choose Photo
          </button>
        </div>

        {image && (
          <button
            type="button"
            onClick={() => {
              setImage(null);
              setFile(null);
            }}
            className="mt-4 text-sm font-semibold text-red-400 hover:text-red-300"
          >
            Remove Photo
          </button>
        )}
      </div>
    </div>
  );
}

export default UploadBox;