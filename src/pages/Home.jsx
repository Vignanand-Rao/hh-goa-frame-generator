import { useRef, useState } from "react";
import Header from "../components/Header";
import UploadBox from "../components/UploadBox";
import BuilderCard from "../components/BuilderCard";
import InputField from "../components/InputField";
import { exportCard } from "../utils/exportImage";
import { shareOnX } from "../utils/shareOnX";
import { uploadImage } from "../services/cloudinary";
import { saveBuilder } from "../services/builderService";
import { getBuilderTitle } from "../utils/titles";

function Home() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [builderId, setBuilderId] = useState("");

  const cardRef = useRef();

  const generateCard = async () => {
    if (!file) {
      alert("Upload your selfie first.");
      return;
    }

    if (!name.trim()) {
      alert("Enter your name.");
      return;
    }

    if (!role.trim()) {
      alert("Enter your role.");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadImage(file);

      const newBuilderId =
        "HH26-" +
        Math.random().toString(36).substring(2, 8).toUpperCase();

      const builder = {
        builderId: newBuilderId,
        name,
        role,
        title: getBuilderTitle(role),
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };

      await saveBuilder(builder);

      setBuilderId(newBuilderId);

      alert("Builder Card Generated Successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to generate Builder Card.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-blue-500 bg-blue-500/10 px-5 py-2 text-sm text-blue-400">
            🚀 HH GOA 2026 • #FrameInGoa
          </span>

          <h1 className="mt-6 text-6xl font-black leading-tight">
            Builder ID Card
            <br />
            Generator
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Upload your selfie, generate your Builder ID,
            download it and share it with everyone.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="mb-8 text-2xl font-bold">
              Create Your Builder Card
            </h2>

            <UploadBox
              image={image}
              setImage={setImage}
              setFile={setFile}
            />

            <div className="mt-8 space-y-6">
              <InputField
                label="Your Name"
                value={name}
                setValue={setName}
                placeholder="Enter your full name"
              />

              <InputField
                label="Tech Stack / Role"
                value={role}
                setValue={setRole}
                placeholder="Backend Developer"
              />

              <button
                onClick={generateCard}
                disabled={loading}
                className="w-full rounded-2xl bg-green-600 py-4 text-lg font-bold hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Generating..." : "🚀 Generate Builder ID"}
              </button>

              <button
                onClick={() => exportCard(cardRef)}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-bold hover:scale-[1.02] transition"
              >
                📥 Download PNG
              </button>

              <button
                onClick={() => shareOnX(name, role)}
                className="w-full rounded-2xl border border-blue-500 bg-black py-4 text-lg font-bold hover:bg-blue-600 transition"
              >
                🐦 Share on X
              </button>
            </div>
          </div>

          <div className="sticky top-10">
            <BuilderCard
              ref={cardRef}
              image={image}
              name={name}
              role={role}
              builderId={builderId}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;