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
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

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

    if (!mobile.trim()) {
      alert("Enter your mobile number.");
      return;
    }

    if (!email.trim()) {
      alert("Enter your email.");
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
        email: email.trim(),
        title: getBuilderTitle(role),
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };

      await saveBuilder(builder);

      setBuilderId(newBuilderId);
      setImage(imageUrl);
      setGenerated(true);
    } catch (err) {
      console.error("GENERATION ERROR:", err);
      alert("Failed to generate ID Card.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) {
      alert("Card not found.");
      return;
    }

    try {
      await exportCard(cardRef);
    } catch (err) {
      console.error("DOWNLOAD ERROR:", err);
      alert("Failed to download the ID Card.");
    }
  };

  const handleXShare = () => {
    if (!builderId) return;

    shareOnX(name, role, builderId);
  };

  const handleLinkedInShare = () => {
    if (!builderId) return;

    shareOnLinkedIn(
      builderId,
      name,
      role
    );
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
    <div className="hh-site">

      <Header />

      {!generated ? (
        <main className="hh-home">

          {/* HERO */}
          <section className="hh-hero">

            <div className="hh-hero-badge">
              🌴 HH GOA 2026 • #FrameInGoa
            </div>

            <p className="hh-hero-location">
              GOA, INDIA • 28–31 OCT
            </p>

            <h1>
              HACKER HOUSE
            </h1>

            <div className="hh-hero-goa">
              GOA
            </div>

            <div className="hh-hero-line" />

            <h2>
              HH GOA 2026
            </h2>

            <p>
              ONE FRAME, WHOLE CREW
            </p>

            <span className="hh-hero-subtitle">
              Build your identity. Show your crew.
              Frame your Goa story.
            </span>

          </section>

          {/* CREATE CARD */}
          <section className="hh-create-panel">

            <div className="hh-section-heading">
              <div>
                <p className="hh-mini-title">
                  BUILD • SHIP • LAUNCH • REPEAT
                </p>

                <h2>
                  CREATE YOUR ID CARD
                </h2>
              </div>

              <span className="hh-palm">
                🌴
              </span>
            </div>

            <UploadBox
              image={image}
              setImage={setImage}
              setFile={setFile}
            />

            <div className="hh-form">

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
                placeholder="Enter your mobile number"
              />

              <InputField
                label="Email Address"
                value={email}
                setValue={setEmail}
                placeholder="Enter your email address"
              />

              <button
                type="button"
                onClick={generateCard}
                disabled={loading}
                className="hh-generate-button"
              >
                {loading
                  ? "GENERATING..."
                  : "🚀 GENERATE MY BUILDER ID"}
              </button>

            </div>

          </section>

          {/* FIND BUILDER */}
          <section className="hh-find-panel">

            <p className="hh-find-event">
              HH GOA 2026
            </p>

            <h2>
              🔎 Find a Builder
            </h2>

            <p>
              Search the HH Goa builder registry using a Builder ID.
            </p>

            <div className="hh-search-row">
              <input
                type="text"
                placeholder="HH26-XXXXXX"
                className="hh-search-input"
              />

              <button
                type="button"
                className="hh-search-button"
                onClick={() => {
                  const value =
                    document
                      .querySelector(".hh-search-input")
                      ?.value
                      ?.trim();

                  if (!value) {
                    alert("Enter a Builder ID.");
                    return;
                  }

                  window.location.href =
                    `/card/${value}`;
                }}
              >
                🔎 Find Builder
              </button>
            </div>

          </section>

          {/* BOTTOM NAV */}
          <div className="hh-bottom-nav">
            <span>BUILD</span>
            <span>SHIP</span>
            <span>LAUNCH</span>
            <span>REPEAT</span>
          </div>

        </main>
      ) : (
        <main className="hh-result-page">

          <section className="hh-result-heading">

            <span className="hh-success-badge">
              ✓ ID CARD GENERATED
            </span>

            <h1>
              Your ID Card is Ready
            </h1>

            <p>
              Download your card or share it with your network.
            </p>

          </section>

          <div className="hh-result-grid">

            {/* CARD */}
            <div className="hh-card-preview">
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

            {/* ACTIONS */}
            <div className="hh-action-panel">

              <p className="hh-action-kicker">
                HH GOA 2026
              </p>

              <h2>
                Your Builder Card
              </h2>

              <p className="hh-action-description">
                Your HH GOA 2026 identity has been
                created successfully.
              </p>

              <div className="hh-actions">

                <button
                  type="button"
                  onClick={handleDownload}
                  className="hh-download-button"
                >
                  📥 DOWNLOAD PNG
                </button>

                <button
                  type="button"
                  onClick={handleXShare}
                  className="hh-x-button"
                >
                  𝕏 SHARE ON X
                </button>

                <button
                  type="button"
                  onClick={handleLinkedInShare}
                  className="hh-linkedin-button"
                >
                  in SHARE ON LINKEDIN
                </button>

                <button
                  type="button"
                  onClick={generateNewCard}
                  className="hh-new-button"
                >
                  🔄 GENERATE NEW ID
                </button>

              </div>

              <div className="hh-id-display">

                <p>
                  BUILDER ID
                </p>

                <strong>
                  {builderId}
                </strong>

              </div>

              <div className="hh-contact-display">

                <div>
                  <span>EMAIL</span>
                  <strong>{email}</strong>
                </div>

                <div>
                  <span>MOBILE</span>
                  <strong>{mobile}</strong>
                </div>

              </div>

            </div>

          </div>

        </main>
      )}

    </div>
  );
}

export default Home;