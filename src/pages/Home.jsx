import { useRef, useState } from "react";
import Header from "../components/Header";
import UploadBox from "../components/UploadBox";
import BuilderCard from "../components/BuilderCard";
import InputField from "../components/InputField";
import { exportCard } from "../utils/exportImage";
import { shareOnX } from "../utils/shareOnX";
import { shareOnLinkedIn } from "../utils/shareOnLinkedIn";
import { uploadImage } from "../services/cloudinary";
import { saveBuilder, getBuilder } from "../services/builderService";
import { getBuilderTitle } from "../utils/titles";

function Home() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [builderId, setBuilderId] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchId, setSearchId] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

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

  const handleSearchBuilder = async () => {
    const id = searchId.trim().toUpperCase();

    if (!id) {
      setSearchError("Enter a Builder ID.");
      return;
    }

    try {
      setSearching(true);
      setSearchError("");

      const builder = await getBuilder(id);

      if (!builder) {
        setSearchError("Builder ID not found.");
        return;
      }

      setBuilderId(builder.builderId);
      setName(builder.name || "");
      setRole(builder.role || "");
      setImage(builder.image || null);
      setGenerated(true);
    } catch (err) {
      console.error(err);
      setSearchError("Unable to search Builder ID.");
    } finally {
      setSearching(false);
    }
  };

  const generateNewCard = () => {
    setImage(null);
    setFile(null);
    setName("");
    setRole("");
    setBuilderId("");
    setGenerated(false);
    setLoading(false);
    setSearchId("");
    setSearchError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black text-white">
      <Header />

      {!generated ? (
        <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="mb-10 text-center sm:mb-12">
            <span className="inline-block rounded-full border border-blue-500 bg-blue-500/10 px-4 py-2 text-xs text-blue-400 sm:px-5 sm:text-sm">
              🚀 HH GOA 2026 • #FrameInGoa
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
              ID Card
              <br />
              Generator
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm text-zinc-400 sm:mt-6 sm:text-lg">
              Enter your details, take a selfie and generate your HH GOA
              ID Card.
            </p>
          </div>

          <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl sm:p-8">
            <h2 className="mb-7 text-xl font-bold sm:mb-8 sm:text-2xl">
              Create Your ID Card
            </h2>

            <UploadBox
              image={image}
              setImage={setImage}
              setFile={setFile}
            />

            <div className="mt-7 space-y-5 sm:mt-8 sm:space-y-6">
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
                className="w-full rounded-2xl bg-green-600 py-4 text-base font-bold transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
              >
                {loading ? "Generating..." : "🚀 Generate ID Card"}
              </button>
            </div>
          </div>

          <div className="mx-auto mt-8 w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
            <h2 className="text-xl font-bold sm:text-2xl">
              🔎 Find a Builder
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Enter a Builder ID to view an existing HH GOA 2026 ID Card.
            </p>

            <div className="mt-5 flex w-full flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value.toUpperCase());
                  setSearchError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchBuilder();
                  }
                }}
                placeholder="HH26-XXXXXX"
                className="min-w-0 flex-1 rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500"
              />

              <button
                type="button"
                onClick={handleSearchBuilder}
                disabled={searching}
                className="rounded-2xl bg-blue-600 px-7 py-4 font-bold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {searching ? "Searching..." : "🔎 Search"}
              </button>
            </div>

            {searchError && (
              <p className="mt-3 text-sm font-semibold text-red-400">
                {searchError}
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-10 sm:px-6 sm:py-16">
          <div className="mb-10 text-center sm:mb-12">
            <span className="inline-block rounded-full border border-green-500 bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-400 sm:px-5 sm:text-sm">
              ✓ ID CARD GENERATED
            </span>

            <h1 className="mt-6 text-3xl font-black sm:text-4xl md:text-5xl">
              Your ID Card is Ready
            </h1>

            <p className="mt-4 text-sm text-zinc-400 sm:text-base">
              Download your card or share it with your network.
            </p>
          </div>

          <div className="mb-8 mx-auto w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
            <h2 className="text-xl font-bold sm:text-2xl">
              🔎 Find Another Builder
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Search Firebase using an existing Builder ID.
            </p>

            <div className="mt-5 flex w-full flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value.toUpperCase());
                  setSearchError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchBuilder();
                  }
                }}
                placeholder="HH26-XXXXXX"
                className="min-w-0 flex-1 rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500"
              />

              <button
                type="button"
                onClick={handleSearchBuilder}
                disabled={searching}
                className="rounded-2xl bg-blue-600 px-7 py-4 font-bold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {searching ? "Searching..." : "🔎 Search"}
              </button>
            </div>

            {searchError && (
              <p className="mt-3 text-sm font-semibold text-red-400">
                {searchError}
              </p>
            )}
          </div>

          <div className="grid w-full min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="flex w-full min-w-0 justify-center overflow-hidden">
              <BuilderCard
                ref={cardRef}
                image={image}
                name={name}
                role={role}
                builderId={builderId}
              />
            </div>

            <div className="w-full min-w-0 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
              <h2 className="text-2xl font-black sm:text-3xl">
                Share Your ID Card
              </h2>

              <p className="mt-3 text-sm text-zinc-400 sm:text-base">
                Your HH GOA 2026 ID Card has been created successfully.
              </p>

              <div className="mt-7 space-y-4">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-base font-bold transition hover:scale-[1.02] sm:text-lg"
                >
                  📥 Download PNG
                </button>

                <button
                  type="button"
                  onClick={handleXShare}
                  className="w-full rounded-2xl border border-blue-500 bg-black py-4 text-base font-bold transition hover:bg-blue-600 sm:text-lg"
                >
                  𝕏 Share on X
                </button>

                <button
                  type="button"
                  onClick={handleLinkedInShare}
                  className="w-full rounded-2xl bg-[#0A66C2] py-4 text-base font-bold transition hover:bg-[#084f96] sm:text-lg"
                >
                  in Share on LinkedIn
                </button>

                <button
                  type="button"
                  onClick={generateNewCard}
                  className="w-full rounded-2xl border border-zinc-600 bg-zinc-800 py-4 text-base font-bold transition hover:bg-zinc-700 sm:text-lg"
                >
                  🔄 Generate New ID Card
                </button>
              </div>

              <div className="mt-8 rounded-2xl border border-zinc-700 bg-black p-5">
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  ID Number
                </p>

                <p className="mt-2 break-all text-xl font-black text-blue-400 sm:text-2xl">
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