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

  const cardRef = useRef();

  const generateCard = async () => {
    if (!file) {
      alert("Please upload or take your selfie first.");
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

      alert("Builder Card Generated Successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to generate Builder Card.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!generated || !cardRef.current) {
      return;
    }

    await exportCard(cardRef);
  };

  const handleXShare = () => {
    if (!generated || !builderId) {
      return;
    }

    shareOnX(name, role, builderId);
  };

  const handleLinkedInShare = () => {
    if (!generated || !builderId) {
      return;
    }

    shareOnLinkedIn(builderId);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-16">
        {!generated && (
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full border border-blue-500 bg-blue-500/10 px-5 py-2 text-sm text-blue-400">
              🚀 HH GOA 2026 • #FrameInGoa
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight md:text-6xl">
              Builder ID Card
              <br />
              Generator
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Upload your selfie, enter your details and generate your
              verified HH GOA Builder ID Card.
            </p>
          </div>
        )}

        {!generated ? (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
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
                  className="w-full rounded-2xl bg-green-600 py-4 text-lg font-bold transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Generating Builder ID..." : "🚀 Generate Builder ID"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="flex flex-col items-center">
              <BuilderCard
                ref={cardRef}
                image={image}
                name={name}
                role={role}
                builderId={builderId}
              />
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
              <div className="mb-8">
                <span className="rounded-full border border-green-500 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
                  ✓ BUILDER ID GENERATED
                </span>

                <h2 className="mt-6 text-3xl font-black">
                  Your Builder Card is Ready
                </h2>

                <p className="mt-3 text-zinc-400">
                  Download your card or share it with your network.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleDownload}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-bold transition hover:scale-[1.02]"
                >
                  📥 Download PNG
                </button>

                <button
                  onClick={handleXShare}
                  className="w-full rounded-2xl border border-blue-500 bg-black py-4 text-lg font-bold transition hover:bg-blue-600"
                >
                  𝕏 Share on X
                </button>

                <button
                  onClick={handleLinkedInShare}
                  className="w-full rounded-2xl bg-[#0A66C2] py-4 text-lg font-bold transition hover:bg-[#084f96]"
                >
                  in Share on LinkedIn
                </button>
              </div>

              <div className="mt-8 rounded-2xl border border-zinc-700 bg-black p-5">
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Your Builder ID
                </p>

                <p className="mt-2 text-2xl font-black text-blue-400">
                  {builderId}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;