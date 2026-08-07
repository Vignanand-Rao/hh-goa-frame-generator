import { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

function UploadBox({ image, setImage, setFile }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const readFile = (file) => {
    if (!file) return;

    setFile(file);

    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    readFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];

    readFile(file);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*,.heic,.jpg,.jpeg,.png,.webp"
        onChange={handleChange}
      />

      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          rounded-3xl
          border-2
          border-dashed
          p-10
          transition-all
          duration-300
          cursor-pointer
          flex
          flex-col
          items-center
          justify-center
          text-center

          ${
            dragging
              ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
              : "border-zinc-700 hover:border-blue-500 hover:bg-zinc-900"
          }
        `}
      >
        {image ? (
          <>
            <img
              src={image}
              alt="preview"
              className="w-60 h-60 rounded-2xl object-cover shadow-2xl border border-zinc-700"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current.click();
              }}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-700 transition"
            >
              Change Photo
            </button>
          </>
        ) : (
          <>
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600/20">
              <FaCloudUploadAlt
                size={45}
                className="text-blue-400"
              />
            </div>

            <h2 className="text-2xl font-bold">
              Upload Your Selfie
            </h2>

            <p className="mt-3 text-zinc-400">
              Drag & Drop or Click to Upload
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              JPG • PNG • JPEG • WEBP • HEIC
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default UploadBox;