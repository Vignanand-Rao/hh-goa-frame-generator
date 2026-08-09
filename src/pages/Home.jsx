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
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [builderId, setBuilderId] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchId, setSearchId] = useState("");
  const [searching, setSearching] = useState(false);

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

    const cleanMobile = mobile.replace(/\D/g, "");

    if (!cleanMobile) {
      alert("Enter your mobile number.");
      return;
    }

    if (cleanMobile.length !== 10) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      alert("Enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      alert("Enter a valid email address.");
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
        Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();

      const builder = {
        builderId: newBuilderId,
        name: name.trim(),
        mobile: cleanMobile,
        email: cleanEmail,
        role: role.trim(),
        title: getBuilderTitle(role),
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };

      await saveBuilder(builder);

      setBuilderId(newBuilderId);
      setImage(imageUrl);
      setMobile(cleanMobile);
      setEmail(cleanEmail);
      setGenerated(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(err);

      if (err.message) {
        alert(err.message);
      } else {
        alert("Failed to generate ID Card.");
      }
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
    setMobile("");
    setEmail("");
    setRole("");
    setBuilderId("");
    setGenerated(false);
    setLoading(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = async () => {
    const id = searchId.trim().toUpperCase();

    if (!id) {
      alert("Enter a Builder ID.");
      return;
    }

    try {
      setSearching(true);

      const { getBuilder } = await import(
        "../services/builderService"
      );

      const builder = await getBuilder(id);

      if (!builder) {
        alert("Builder ID not found.");
        return;
      }

      setBuilderId(builder.builderId);
      setName(builder.name || "");
      setMobile(builder.mobile || "");
      setEmail(builder.email || "");
      setRole(builder.role || "");
      setImage(builder.image || null);
      setFile(null);
      setGenerated(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to search Builder ID.");
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {!generated ? (
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-10 text-center sm:mb-12">
            <span className="inline-block rounded-full border border-blue-500 bg-blue-500/10 px-4 py-2 text-xs text-blue-400 sm:px-5 sm:text-sm">
              🚀 HH GOA 2026 • #FrameInGoa
            </span>

            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
              ID Card
              <br />
              Generator
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm text-zinc-400 sm:mt-6 sm:text-lg">
              Enter your details, take a selfie and generate your HH GOA
              ID Card.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl sm:p-8">
            <h2 className="mb-7 text-xl font-bold sm:text-2xl">
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
                label="Mobile Number"
                value={mobile}
                setValue={setMobile}
                placeholder="Enter your 10-digit mobile number"
                type="tel"
              />

              <InputField
                label="Email Address"
                value={email}
                setValue={setEmail}
                placeholder="Enter your email address"
                type="email"
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
                {loading
                  ? "Generating..."
                  : "🚀 Generate ID Card"}
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-8">
            <h2 className="text-xl font-black sm:text-2xl">
              🔎 Find a Builder
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Enter a Builder ID to view an existing HH GOA 2026 ID Card.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="HH26-XXXXXX"
                className="min-w-0 flex-1 rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-blue-500"
              />

              <button
                type="button"
                onClick={handleSearch}
                disabled={searching}
                className="rounded-2xl bg-blue-600 px-7 py-4 font-bold transition hover:bg-blue-700 disabled:opacity-50"
              >
                {searching ? "Searching..." : "🔎 Search"}
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-10 text-center sm:mb-12">
            <span className="inline-block rounded-full border border-green-500 bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-400 sm:px-5 sm:text-sm">
              ✓ ID CARD GENERATED
            </span>

            <h1 className="mt-5 text-3xl font-black sm:text-4xl md:text-5xl">
              Your ID Card is Ready
            </h1>

            <p className="mt-4 text-sm text-zinc-400 sm:text-base">
              Download your card or share it with your network.
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="flex justify-center">
              <BuilderCard
              ref={cardRef}
              image={image}
              name={name}
              mobile={mobile}
              role={role}
              builderId={builderId}
              />
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-8">
              <h2 className="text-2xl font-black sm:text-3xl">
                Your ID Card
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

              <div className="mt-7 space-y-4">
                <div className="rounded-2xl border border-zinc-700 bg-black p-5">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    ID Number
                  </p>

                  <p className="mt-2 break-all text-xl font-black text-blue-400 sm:text-2xl">
                    {builderId}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-700 bg-black p-5">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Mobile Number
                  </p>

                  <p className="mt-2 break-all text-lg font-bold text-white">
                    {mobile}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-700 bg-black p-5">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Email Address
                  </p>

                  <p className="mt-2 break-all text-lg font-bold text-white">
                    {email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;