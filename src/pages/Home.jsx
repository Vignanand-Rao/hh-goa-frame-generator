import { useRef, useState } from "react";
import Header from "../components/Header";
import UploadBox from "../components/UploadBox";
import BuilderCard from "../components/BuilderCard";
import InputField from "../components/InputField";
import { exportCard } from "../utils/exportImage";
import { shareOnX } from "../utils/shareOnX";
import { shareOnLinkedIn } from "../utils/shareOnLinkedIn";
import { uploadImage } from "../services/cloudinary";
import { saveBuilder } from "../services/builderService";
import { getBuilderTitle } from "../utils/titles";

function Home() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [builderId, setBuilderId] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const cardRef = useRef(null);

  const generateCard = async () => {
    if (!file) {
      alert("Please take a selfie or choose a photo first.");
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
        name: name.trim(),
        role: role.trim(),
        title: getBuilderTitle(role),
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };

      await saveBuilder(builder);

      setBuilderId(newBuilderId);
      setImage(imageUrl);
      setGenerated(true);
    } catch (err) {
      console.error(err);
      alert("Failed to generate ID Card.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) {
      return;
    }

    try {
      await exportCard(cardRef);
    } catch (err) {
      console.error(err);
      alert("Failed to download the ID Card.");
    }
  };

  const handleXShare = () => {
    if (!builderId) {
      return;
    }

    shareOnX(name, role, builderId);
  };

  const handleLinkedInShare = () => {
    if (!builderId) {
      return;
    }

    shareOnLinkedIn(builderId, name, role);
  };

  const generateNewCard = () => {
    setImage(null);
    setFile(null);
    setName("");
    setRole("");
    setBuilderId("");
    setGenerated(false);
    setLoading(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {!generated ? (
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full border border-blue-500 bg-blue-500/10 px-5 py-2 text-sm text-blue-400">
              🚀 HH GOA 2026 • #FrameInGoa
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight md:text-6xl">
              ID Card
              <br />
              Generator
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Enter your details, take a selfie and generate your HH GOA
              ID Card.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
            <h2 className="mb-8 text-2xl font-bold">
              Create Your ID Card
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
                type="button"
                onClick={generateCard}
                disabled={loading}
                className="w-full rounded-2xl bg-green-600 py-4 text-lg font-bold transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Generating..." : "🚀 Generate ID Card"}
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full border border-green-500 bg-green-500/10 px-5 py-2 text-sm font-semibold text-green-400">
              ✓ ID CARD GENERATED
            </span>

            <h1 className="mt-6 text-4xl font-black md:text-5xl">
              Your ID Card is Ready
            </h1>

            <p className="mt-4 text-zinc-400">
              Download your card or share it with your network.
            </p>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="flex justify-center">
              <BuilderCard
                ref={cardRef}
                image={image}
                name={name}
                role={role}
                builderId={builderId}
              />
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
              <h2 className="text-3xl font-black">
                Share Your ID Card
              </h2>

              <p className="mt-3 text-zinc-400">
                Your HH GOA 2026 ID Card has been created successfully.
              </p>

              <div className="mt-8 space-y-4">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-bold transition hover:scale-[1.02]"
                >
                  📥 Download PNG
                </button>

                <button
                  type="button"
                  onClick={handleXShare}
                  className="w-full rounded-2xl border border-blue-500 bg-black py-4 text-lg font-bold transition hover:bg-blue-600"
                >
                  𝕏 Share on X
                </button>

                <button
                  type="button"
                  onClick={handleLinkedInShare}
                  className="w-full rounded-2xl bg-[#0A66C2] py-4 text-lg font-bold transition hover:bg-[#084f96]"
                >
                  in Share on LinkedIn
                </button>

                <button
                  type="button"
                  onClick={generateNewCard}
                  className="w-full rounded-2xl border border-zinc-600 bg-zinc-800 py-4 text-lg font-bold transition hover:bg-zinc-700"
                >
                  🔄 Generate New ID Card
                </button>
              </div>

              <div className="mt-8 rounded-2xl border border-zinc-700 bg-black p-5">
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  ID Number
                </p>

                <p className="mt-2 break-all text-2xl font-black text-blue-400">
                  {builderId}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;