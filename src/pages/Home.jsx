import { useRef, useState } from "react";

import Header from "../components/Header";
import UploadBox from "../components/UploadBox";
import BuilderCard from "../components/BuilderCard";
import InputField from "../components/InputField";

import { exportCard } from "../utils/exportImage";
import { shareOnX } from "../utils/shareOnX";
import { shareOnLinkedIn } from "../utils/shareOnLinkedIn";

import { uploadImage } from "../services/cloudinary";

import {
  saveBuilder,
  getBuilder,
  getBuilderByEmail,
} from "../services/builderService";

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
  const [searchEmail, setSearchEmail] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const cardRef = useRef(null);


  // =====================================================
  // GENERATE CARD
  // =====================================================

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
      alert("Enter your email address.");
      return;
    }

    const cleanMobile = mobile.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!/^[0-9]{10}$/.test(cleanMobile)) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
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
        mobile: cleanMobile,
        email: cleanEmail,
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
      alert("Failed to generate ID Card. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // DOWNLOAD
  // =====================================================

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


  // =====================================================
  // X SHARE
  // =====================================================

  const handleXShare = () => {
    if (!builderId) {
      return;
    }

    shareOnX(name, role, builderId);
  };


  // =====================================================
  // LINKEDIN SHARE
  // =====================================================

  const handleLinkedInShare = () => {
    if (!builderId) {
      return;
    }

    shareOnLinkedIn(builderId, name, role);
  };


  // =====================================================
  // FIND BY BUILDER ID
  // =====================================================

  const handleSearchById = async () => {
    if (!searchId.trim()) {
      alert("Enter a Builder ID.");
      return;
    }

    try {
      setSearchLoading(true);

      const builder = await getBuilder(searchId.trim());

      if (!builder) {
        alert("No builder found with this Builder ID.");
        return;
      }

      window.location.href = `/card/${builder.builderId}`;

    } catch (error) {
      console.error(error);
      alert("Failed to find builder. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };


  // =====================================================
  // FIND BY EMAIL
  // =====================================================

  const handleSearchByEmail = async () => {
    if (!searchEmail.trim()) {
      alert("Enter your email address.");
      return;
    }

    try {
      setSearchLoading(true);

      const builder = await getBuilderByEmail(
        searchEmail.trim()
      );

      if (!builder) {
        alert("No builder found with this email address.");
        return;
      }

      window.location.href = `/card/${builder.builderId}`;

    } catch (error) {
      console.error(error);
      alert("Failed to find builder. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };


  // =====================================================
  // NEW CARD
  // =====================================================

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


  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="hh-site">

      <Header />

      {!generated ? (

        // =================================================
        // HOME / CREATE PAGE
        // =================================================

        <main className="hh-home">

          {/* HERO */}

          <section className="hh-hero">

            <span className="hh-hero-badge">
              🌴 HH GOA 2026 • #FrameInGoa
            </span>

            <p className="hh-hero-location">
              GOA, INDIA
            </p>

            <h1>
              HACKER HOUSE
            </h1>

            <div className="hh-hero-goa">
              GOA
            </div>

            <div className="hh-hero-line" />

            <h2>
              BUILD • SHIP • LAUNCH
            </h2>

            <p>
              ONE FRAME, WHOLE CREW
            </p>

            <p className="hh-hero-subtitle">
              Create your official HH GOA 2026 Builder ID
              Card and become part of the crew.
            </p>

          </section>


          {/* CREATE PANEL */}

          <section className="hh-create-panel">

            <div className="hh-section-heading">

              <div>
                <p className="hh-mini-title">
                  HH GOA 2026
                </p>

                <h2>
                  Create Your ID Card
                </h2>
              </div>

              <div className="hh-palm">
                🌴
              </div>

            </div>


            <UploadBox
              image={image}
              setImage={setImage}
              setFile={setFile}
            />


            {/* FORM */}

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
                placeholder="10-digit mobile number"
                type="tel"
              />

              <InputField
                label="Email Address"
                value={email}
                setValue={setEmail}
                placeholder="your@email.com"
                type="email"
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
              HH GOA 2026 • BUILDER DIRECTORY
            </p>

            <h2>
              🔎 Find a Builder
            </h2>

            <p>
              Find your existing Builder Card using your
              unique Builder ID or registered email.
            </p>


            {/* BUILDER ID SEARCH */}

            <label>
              Builder ID
            </label>

            <div className="hh-search-row">

              <input
                type="text"
                value={searchId}
                onChange={(e) =>
                  setSearchId(e.target.value)
                }
                placeholder="HH26-XXXXXX"
                className="hh-search-input"
              />

              <button
                type="button"
                onClick={handleSearchById}
                disabled={searchLoading}
                className="hh-search-button"
              >
                🔎 SEARCH
              </button>

            </div>


            {/* EMAIL SEARCH */}

            <div style={{ marginTop: "14px" }}>

              <label>
                Email Address
              </label>

              <div className="hh-search-row">

                <input
                  type="email"
                  value={searchEmail}
                  onChange={(e) =>
                    setSearchEmail(e.target.value)
                  }
                  placeholder="your@email.com"
                  className="hh-search-input"
                />

                <button
                  type="button"
                  onClick={handleSearchByEmail}
                  disabled={searchLoading}
                  className="hh-search-button"
                >
                  ✉️ FIND MY ID
                </button>

              </div>

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

        // =================================================
        // RESULT PAGE
        // =================================================

        <main className="hh-result-page">

          <section className="hh-result-heading">

            <span className="hh-success-badge">
              ✓ ID CARD GENERATED
            </span>

            <h1>
              Your ID Card is Ready
            </h1>

            <p>
              Download your card or share it with your
              network.
            </p>

          </section>


          <section className="hh-result-grid">

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


            {/* ACTION PANEL */}

            <div className="hh-action-panel">

              <p className="hh-action-kicker">
                HH GOA 2026
              </p>

              <h2>
                Your Builder Card
              </h2>

              <p className="hh-action-description">
                Your HH GOA 2026 Builder ID Card has
                been created successfully.
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
                  🔄 GENERATE NEW ID CARD
                </button>

              </div>


              {/* BUILDER ID */}

              <div className="hh-id-display">

                <p>
                  YOUR BUILDER ID
                </p>

                <strong>
                  {builderId}
                </strong>

              </div>


              {/* CONTACT */}

              <div className="hh-contact-display">

                <div>

                  <span>
                    MOBILE
                  </span>

                  <strong>
                    {mobile}
                  </strong>

                </div>


                <div>

                  <span>
                    EMAIL
                  </span>

                  <strong>
                    {email}
                  </strong>

                </div>

              </div>

            </div>

          </section>

        </main>

      )}

    </div>
  );
}

export default Home;