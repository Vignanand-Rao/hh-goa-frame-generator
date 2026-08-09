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
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
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

    if (!role.trim()) {
      alert("Enter your role.");
      return;
    }

    if (!mobile.trim()) {
      alert("Enter your mobile number.");
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile.trim())) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!email.trim()) {
      alert("Enter your email address.");
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
        Math.random().toString(36).substring(2, 8).toUpperCase();

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

      if (
        err.message === "This mobile number is already registered." ||
        err.message === "This email address is already registered."
      ) {
        alert(err.message);
      } else {
        alert("Failed to generate ID Card.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const id = searchId.trim().toUpperCase();

    if (!id) {
      alert("Enter a Builder ID.");
      return;
    }

    try {
      setSearching(true);

      const builder = await getBuilder(id);

      if (!builder) {
        alert("Builder not found.");
        return;
      }

      setBuilderId(builder.builderId);
      setName(builder.name || "");
      setRole(builder.role || "");
      setMobile(builder.mobile || "");
      setEmail(builder.email || "");
      setImage(builder.image || null);
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#022b1d] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-70px] top-[120px] text-[110px] opacity-20">
          🌴
        </div>

        <div className="absolute right-[-50px] top-[230px] text-[120px] opacity-20">
          🌴
        </div>

        <div className="absolute left-[5%] top-[55%] text-[90px] opacity-10">
          🌴
        </div>

        <div className="absolute right-[4%] top-[65%] text-[100px] opacity-10">
          🌴
        </div>

        <div className="absolute left-1/2 top-[18%] h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-300/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#011b12] to-transparent" />
      </div>

      <div className="relative z-10">
        <Header />

        {!generated ? (
          <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
            <section className="relative pb-10 pt-10 text-center sm:pb-14 sm:pt-16">
              <div className="mx-auto inline-flex rounded-full border border-yellow-400/60 bg-[#075536] px-4 py-2 text-[10px] font-black tracking-[0.25em] text-yellow-300 shadow-lg sm:text-xs">
                🌴 GOA, INDIA • 28–31 OCT 2026
              </div>

              <p className="mt-5 text-sm font-black tracking-[0.4em] text-pink-300 sm:text-base">
                HACKER HOUSE
              </p>

              <h1 className="mt-2 text-6xl font-black uppercase leading-none text-yellow-300 sm:text-8xl">
                GOA
              </h1>

              <div className="mx-auto mt-4 h-1 w-24 bg-yellow-400" />

              <h2 className="mt-5 text-2xl font-black tracking-[0.15em] sm:text-4xl">
                HH GOA 2026
              </h2>

              <p className="mt-3 text-xs font-black tracking-[0.4em] text-pink-300 sm:text-sm">
                ONE FRAME, WHOLE CREW
              </p>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-emerald-100/70">
                Build your identity. Show your crew. Frame your Goa story.
              </p>

              <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-4 overflow-hidden text-4xl opacity-80 sm:text-6xl">
                🌴 🌊 🏖️ 🌴
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[32px] border-2 border-yellow-400/50 bg-[#06442e]/95 p-5 shadow-[0_25px_100px_rgba(0,0,0,0.4)] sm:p-8">
              <div className="pointer-events-none absolute -right-5 -top-5 text-7xl opacity-20">
                🌴
              </div>

              <div className="pointer-events-none absolute -bottom-5 -left-5 text-7xl opacity-20">
                🌿
              </div>

              <div className="relative">
                <h2 className="text-2xl font-black uppercase">
                  Create Your ID Card
                </h2>

                <p className="mt-2 text-xs font-black tracking-widest text-yellow-300">
                  BUILD • SHIP • LAUNCH • REPEAT
                </p>

                <div className="mt-7">
                  <UploadBox
                    image={image}
                    setImage={setImage}
                    setFile={setFile}
                  />
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
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

                  <InputField
                    label="Mobile Number"
                    value={mobile}
                    setValue={setMobile}
                    placeholder="10-digit mobile number"
                  />

                  <InputField
                    label="Email Address"
                    value={email}
                    setValue={setEmail}
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="button"
                  onClick={generateCard}
                  disabled={loading}
                  className="mt-7 w-full rounded-2xl border-2 border-yellow-300 bg-gradient-to-r from-yellow-400 to-yellow-300 py-4 text-base font-black uppercase tracking-wide text-[#032d20] shadow-[0_10px_35px_rgba(250,204,21,0.2)] transition hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(250,204,21,0.35)] disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
                >
                  {loading
                    ? "Creating Your Builder ID..."
                    : "🚀 Generate My Builder ID"}
                </button>
              </div>
            </section>

            <section className="relative mt-8 overflow-hidden rounded-[30px] border border-yellow-400/30 bg-[#043b29]/90 p-5 shadow-xl sm:p-7">
              <div className="pointer-events-none absolute right-3 top-2 text-6xl opacity-15">
                🌴
              </div>

              <div className="relative">
                <p className="text-xs font-black tracking-[0.3em] text-pink-300">
                  HH GOA 2026
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  🔎 Find a Builder
                </h2>

                <p className="mt-2 text-sm text-emerald-100/60">
                  Search the builder registry using a unique Builder ID.
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
                    className="min-w-0 flex-1 rounded-2xl border border-yellow-400/30 bg-[#021f16] px-5 py-4 text-white outline-none placeholder:text-emerald-100/30 focus:border-yellow-400"
                  />

                  <button
                    type="button"
                    onClick={handleSearch}
                    disabled={searching}
                    className="rounded-2xl bg-yellow-400 px-7 py-4 font-black text-[#032d20] transition hover:bg-yellow-300 disabled:opacity-50"
                  >
                    {searching ? "Searching..." : "🔎 Search"}
                  </button>
                </div>
              </div>
            </section>

            <section className="relative mt-10 overflow-hidden rounded-3xl border border-yellow-400/20 bg-[#043526]">
              <div className="flex items-end justify-around px-3 pt-5 text-4xl sm:text-6xl">
                🌴 🏖️ 🌴 🌊 🌴
              </div>

              <div className="grid grid-cols-4 border-t border-yellow-400/20">
                <div className="border-r border-yellow-400/10 py-4 text-center text-[10px] font-black tracking-widest text-yellow-300">
                  BUILD
                </div>

                <div className="border-r border-yellow-400/10 py-4 text-center text-[10px] font-black tracking-widest text-pink-300">
                  SHIP
                </div>

                <div className="border-r border-yellow-400/10 py-4 text-center text-[10px] font-black tracking-widest text-yellow-300">
                  LAUNCH
                </div>

                <div className="py-4 text-center text-[10px] font-black tracking-widest text-pink-300">
                  REPEAT
                </div>
              </div>
            </section>
          </main>
        ) : (
          <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
            <div className="mb-10 pt-10 text-center sm:pt-16">
              <span className="inline-flex rounded-full border border-yellow-400/50 bg-yellow-400/10 px-5 py-2 text-xs font-black tracking-widest text-yellow-300">
                ✓ ID CARD GENERATED
              </span>

              <h1 className="mt-6 text-4xl font-black sm:text-5xl">
                Your Builder Card is Ready
              </h1>

              <p className="mt-4 text-sm text-emerald-100/60">
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
                  mobile={mobile}
                  email={email}
                  builderId={builderId}
                />
              </div>

              <div className="relative overflow-hidden rounded-[30px] border-2 border-yellow-400/30 bg-[#06442e]/95 p-6 shadow-xl sm:p-8">
                <div className="absolute right-2 top-2 text-6xl opacity-15">
                  🌴
                </div>

                <div className="relative">
                  <p className="text-xs font-black tracking-[0.3em] text-pink-300">
                    HH GOA 2026
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    Share Your Builder Identity
                  </h2>

                  <div className="mt-8 space-y-4">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="w-full rounded-2xl border-2 border-yellow-300 bg-yellow-400 py-4 font-black text-[#032d20] transition hover:-translate-y-1 hover:bg-yellow-300"
                    >
                      📥 Download Builder Card
                    </button>

                    <button
                      type="button"
                      onClick={handleXShare}
                      className="w-full rounded-2xl border border-pink-400 bg-[#021f16] py-4 font-bold transition hover:bg-pink-500/10"
                    >
                      𝕏 Share on X
                    </button>

                    <button
                      type="button"
                      onClick={handleLinkedInShare}
                      className="w-full rounded-2xl bg-[#0A66C2] py-4 font-bold transition hover:bg-[#084f96]"
                    >
                      in Share on LinkedIn
                    </button>

                    <button
                      type="button"
                      onClick={generateNewCard}
                      className="w-full rounded-2xl border border-yellow-400/30 bg-[#021f16] py-4 font-bold text-yellow-300 transition hover:bg-yellow-400/10"
                    >
                      🔄 Generate New Builder ID
                    </button>
                  </div>

                  <div className="mt-8 rounded-2xl border border-yellow-400/30 bg-[#021f16] p-5">
                    <p className="text-xs uppercase tracking-widest text-yellow-300/60">
                      Builder ID
                    </p>

                    <p className="mt-2 break-all text-2xl font-black text-yellow-300">
                      {builderId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default Home;