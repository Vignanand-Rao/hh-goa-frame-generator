import { useRef, useState } from "react";
import Header from "../components/Header";
import UploadBox from "../components/UploadBox";
import BuilderCard from "../components/BuilderCard";
import InputField from "../components/InputField";
import { exportCard } from "../utils/exportImage";
import { shareOnX } from "../utils/shareOnX";
import { shareOnLinkedIn } from "../utils/shareOnLinkedIn";
import { uploadImage } from "../services/cloudinary";
import { saveBuilder, findBuilder } from "../services/builderService";
import { getBuilderTitle } from "../utils/titles";

function Home() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [builderId, setBuilderId] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchId, setSearchId] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

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

    if (!/^[0-9]{10}$/.test(mobile.trim())) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      alert("Enter a valid email address.");
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
        role: role.trim(),
        mobile: mobile.trim(),
        email: email.trim().toLowerCase(),
        title: getBuilderTitle(role),
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };

      await saveBuilder(builder);

      setBuilderId(newBuilderId);
      setImage(imageUrl);
      setGenerated(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to generate ID Card.");
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
    setMobile("");
    setEmail("");
    setBuilderId("");
    setGenerated(false);
    setLoading(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      alert("Enter a Builder ID.");
      return;
    }

    try {
      setSearchLoading(true);

      const builder = await findBuilder(searchId);

      if (!builder) {
        alert("Builder not found.");
        return;
      }

      window.location.href = `/card/${builder.builderId}`;
    } catch (err) {
      console.error(err);
      alert("Unable to find builder.");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#032d20] text-white">
      <Header />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-24 text-8xl opacity-10">
            🌴
          </div>

          <div className="absolute right-0 top-40 text-8xl opacity-10">
            🌴
          </div>

          <div className="absolute left-[8%] top-[55%] text-7xl opacity-10">
            🌿
          </div>

          <div className="absolute right-[8%] top-[70%] text-7xl opacity-10">
            🌿
          </div>
        </div>

        {!generated ? (
          <section className="relative mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
            <div className="text-center">
              <div className="flex justify-center text-3xl">
                🌴 🌊 🌴
              </div>

              <p className="mt-5 text-xs font-black tracking-[0.35em] text-yellow-300">
                GOA, INDIA • 2026
              </p>

              <h1 className="mt-4 text-5xl font-black tracking-tight text-yellow-300 sm:text-7xl">
                HACKER HOUSE
              </h1>

              <h2 className="mt-1 text-3xl font-black text-white sm:text-4xl">
                GOA
              </h2>

              <div className="mx-auto mt-4 h-1 w-24 bg-yellow-400" />

              <h3 className="mt-6 text-2xl font-black tracking-wider sm:text-3xl">
                HH GOA 2026
              </h3>

              <p className="mt-2 text-xs font-black tracking-[0.4em] text-pink-300 sm:text-sm">
                ONE FRAME, WHOLE CREW
              </p>

              <p className="mx-auto mt-5 max-w-xl text-sm text-green-100/70 sm:text-base">
                Build your identity. Show your craft. Frame your Goa story.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-2xl rounded-[30px] border-2 border-yellow-500/70 bg-[#075c3c] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black tracking-[0.3em] text-yellow-300">
                    BUILD • SHIP • LAUNCH • REPEAT
                  </p>

                  <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                    Create Your Builder Card
                  </h2>
                </div>

                <span className="text-3xl">🌴</span>
              </div>

              <UploadBox
                image={image}
                setImage={setImage}
                setFile={setFile}
              />

              <div className="mt-7 grid gap-5">
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

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-yellow-200">
                      Mobile Number
                    </label>

                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) =>
                        setMobile(
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="10-digit mobile"
                      className="w-full rounded-xl border border-yellow-500/40 bg-[#032d20] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-yellow-200">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-yellow-500/40 bg-[#032d20] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={generateCard}
                  disabled={loading}
                  className="mt-2 w-full rounded-2xl bg-yellow-400 py-4 text-lg font-black text-[#073c29] transition hover:scale-[1.01] hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "CREATING YOUR BUILDER ID..."
                    : "🚀 GENERATE MY BUILDER ID"}
                </button>
              </div>
            </div>

            <div className="mx-auto mt-7 max-w-2xl rounded-[25px] border border-yellow-500/50 bg-[#06452f] p-5">
              <div className="text-center">
                <p className="text-[10px] font-black tracking-[0.3em] text-pink-300">
                  HH GOA 2026
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Find a Builder
                </h2>

                <p className="mt-2 text-sm text-green-100/60">
                  Search any existing Builder ID and view their card.
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <input
                  value={searchId}
                  onChange={(e) =>
                    setSearchId(e.target.value.toUpperCase())
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="HH26-XXXXXX"
                  className="min-w-0 flex-1 rounded-xl border border-yellow-500/40 bg-[#021f16] px-4 py-3 text-white outline-none focus:border-yellow-400"
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={searchLoading}
                  className="rounded-xl bg-yellow-400 px-7 py-3 font-black text-[#073c29] transition hover:bg-yellow-300 disabled:opacity-50"
                >
                  {searchLoading ? "Searching..." : "🔎 Find Builder"}
                </button>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-2xl border-t border-yellow-500/30 pt-5">
              <div className="grid grid-cols-4 text-center">
                <span className="text-[9px] font-black text-yellow-300">
                  BUILD
                </span>

                <span className="text-[9px] font-black text-pink-300">
                  SHIP
                </span>

                <span className="text-[9px] font-black text-yellow-300">
                  LAUNCH
                </span>

                <span className="text-[9px] font-black text-pink-300">
                  REPEAT
                </span>
              </div>
            </div>
          </section>
        ) : (
          <section className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
            <div className="mb-10 text-center">
              <div className="text-3xl">
                🌴 🌊 🌴
              </div>

              <span className="mt-4 inline-block rounded-full border border-yellow-400 bg-yellow-400/10 px-5 py-2 text-xs font-black tracking-wider text-yellow-300">
                ✓ BUILDER ID GENERATED
              </span>

              <h1 className="mt-5 text-4xl font-black sm:text-6xl">
                Your Goa Builder Card
              </h1>

              <p className="mt-3 text-green-100/60">
                Download it. Frame it. Share it.
              </p>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,520px)_minmax(320px,430px)] lg:justify-center">
              <div className="flex min-w-0 justify-center">
                <BuilderCard
                  ref={cardRef}
                  image={image}
                  name={name}
                  role={role}
                  mobile={mobile}
                  email={email}
                  builderId={builderId}
                />
              </div>

              <div className="rounded-[30px] border-2 border-yellow-500/60 bg-[#075c3c] p-6 sm:p-8">
                <p className="text-xs font-black tracking-[0.3em] text-pink-300">
                  HH GOA 2026
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  Your card is ready.
                </h2>

                <p className="mt-3 text-green-100/60">
                  Download your complete Builder ID or share your builder
                  profile with your network.
                </p>

                <div className="mt-7 space-y-3">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full rounded-2xl bg-yellow-400 py-4 text-lg font-black text-[#073c29] transition hover:scale-[1.01] hover:bg-yellow-300"
                  >
                    📥 Download Builder Card
                  </button>

                  <button
                    type="button"
                    onClick={handleXShare}
                    className="w-full rounded-2xl border border-yellow-400 bg-[#021f16] py-4 text-lg font-black text-white transition hover:bg-[#06452f]"
                  >
                    𝕏 Share on X
                  </button>

                  <button
                    type="button"
                    onClick={handleLinkedInShare}
                    className="w-full rounded-2xl bg-[#0A66C2] py-4 text-lg font-black text-white transition hover:bg-[#084f96]"
                  >
                    in Share on LinkedIn
                  </button>

                  <button
                    type="button"
                    onClick={generateNewCard}
                    className="w-full rounded-2xl border border-pink-400/50 bg-[#043c2b] py-4 text-lg font-black text-white transition hover:bg-[#075c3c]"
                  >
                    🔄 Create Another Builder ID
                  </button>
                </div>

                <div className="mt-7 rounded-2xl border border-yellow-400/50 bg-[#032d20] p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-yellow-300">
                    Builder ID
                  </p>

                  <p className="mt-2 break-all text-2xl font-black text-white">
                    {builderId}
                  </p>
                </div>

                <div className="mt-4 rounded-2xl border border-yellow-400/30 bg-[#032d20] p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-yellow-300">
                    Contact
                  </p>

                  <p className="mt-2 break-all text-sm font-bold text-white">
                    {mobile}
                  </p>

                  <p className="mt-1 break-all text-sm text-green-100/70">
                    {email}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;