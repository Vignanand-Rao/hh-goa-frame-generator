import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

import BuilderCard from "../components/BuilderCard";

import { getBuilder } from "../services/builderService";

import { exportCard } from "../utils/exportImage";
import { shareOnX } from "../utils/shareOnX";
import { shareOnLinkedIn } from "../utils/shareOnLinkedIn";

function CardView() {
  const { builderId } = useParams();

  const [builder, setBuilder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Reference to the actual ID card
  const cardRef = useRef(null);

  // =====================================================
  // LOAD BUILDER
  // =====================================================

  useEffect(() => {
    const loadBuilder = async () => {
      try {
        setLoading(true);

        const data = await getBuilder(builderId);

        setBuilder(data);
      } catch (error) {
        console.error("CARD VIEW ERROR:", error);
        setBuilder(null);
      } finally {
        setLoading(false);
      }
    };

    loadBuilder();
  }, [builderId]);

  // =====================================================
  // DOWNLOAD CARD
  // =====================================================

  const handleDownload = async () => {
    if (!cardRef.current) {
      return;
    }

    try {
      await exportCard(cardRef);
    } catch (error) {
      console.error("DOWNLOAD ERROR:", error);
      alert("Failed to download the ID Card.");
    }
  };

  // =====================================================
  // SHARE ON X
  // =====================================================

  const handleXShare = () => {
    if (!builder) {
      return;
    }

    shareOnX(
      builder.name,
      builder.role,
      builder.builderId
    );
  };

  // =====================================================
  // SHARE ON LINKEDIN
  // =====================================================

  const handleLinkedInShare = () => {
    if (!builder) {
      return;
    }

    shareOnLinkedIn(
      builder.builderId,
      builder.name,
      builder.role
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="hh-card-view-state">

        <div className="hh-loading-spinner" />

        <h2>
          Loading Builder Card...
        </h2>

      </div>
    );
  }

  // =====================================================
  // NOT FOUND
  // =====================================================

  if (!builder) {
    return (
      <div className="hh-card-view-state">

        <div className="hh-not-found-icon">
          🔎
        </div>

        <h1>
          Builder Not Found
        </h1>

        <p>
          We couldn't find a builder with ID:
        </p>

        <strong>
          {builderId}
        </strong>

        <Link
          to="/"
          className="hh-back-home"
        >
          ← Back to HH GOA
        </Link>

      </div>
    );
  }

  // =====================================================
  // BUILDER CARD
  // =====================================================

  return (
    <div className="hh-card-view-page">

      {/* ================================================
          HEADER
      ================================================= */}

      <div className="hh-card-view-header">

        <p className="hh-card-view-location">
          GOA, INDIA • 2026
        </p>

        <h1>
          HACKER HOUSE
        </h1>

        <div className="hh-card-view-goa">
          GOA
        </div>

        <div className="hh-card-view-line" />

        <h2>
          HH GOA 2026
        </h2>

        <p>
          ONE FRAME, WHOLE CREW
        </p>

      </div>

      {/* ================================================
          CONTENT
      ================================================= */}

      <div className="hh-card-view-content">

        <span className="hh-card-view-badge">
          ✓ VERIFIED BUILDER
        </span>

        {/* ACTUAL CARD */}

        <BuilderCard
          ref={cardRef}
          image={builder.image}
          name={builder.name}
          role={builder.role}
          mobile={builder.mobile}
          email={builder.email}
          builderId={builder.builderId}
        />

        {/* ==============================================
            ACTION PANEL
        =============================================== */}

        <div className="hh-action-panel">

          <p className="hh-action-kicker">
            HH GOA 2026
          </p>

          <h2>
            Your Builder Card
          </h2>

          <p className="hh-action-description">
            Your verified HH GOA 2026 Builder ID Card
            is ready to download or share.
          </p>

          <div className="hh-actions">

            {/* DOWNLOAD */}

            <button
              type="button"
              onClick={handleDownload}
              className="hh-download-button"
            >
              📥 DOWNLOAD PNG
            </button>

            {/* X */}

            <button
              type="button"
              onClick={handleXShare}
              className="hh-x-button"
            >
              𝕏 SHARE ON X
            </button>

            {/* LINKEDIN */}

            <button
              type="button"
              onClick={handleLinkedInShare}
              className="hh-linkedin-button"
            >
              in SHARE ON LINKEDIN
            </button>

            {/* GENERATE NEW */}

            <Link
              to="/"
              className="hh-new-button"
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                padding: "16px 20px",
                borderRadius: "16px",
                border: "1px solid rgba(234, 179, 8, 0.5)",
                backgroundColor: "#064e3b",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "700",
                lineHeight: "1.25",
                textAlign: "center",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor = "#065f46";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = "#064e3b";
              }}
            >
              🔄 GENERATE NEW ID CARD
            </Link>

          </div>

          {/* ============================================
              BUILDER ID
          ============================================ */}

          <div className="hh-id-display">

            <p>
              YOUR BUILDER ID
            </p>

            <strong>
              {builder.builderId}
            </strong>

          </div>

          {/* ============================================
              CONTACT DETAILS
          ============================================ */}

          <div className="hh-contact-display">

            <div>

              <span>
                MOBILE
              </span>

              <strong>
                {builder.mobile || "Not provided"}
              </strong>

            </div>

            <div>

              <span>
                EMAIL
              </span>

              <strong>
                {builder.email || "Not provided"}
              </strong>

            </div>

          </div>

        </div>

        {/* ==============================================
            BOTTOM
        =============================================== */}

        <div className="hh-card-view-footer">

          <p>
            HH GOA 2026 • #FrameInGoa
          </p>

          <Link to="/">
            Create Your Own Builder Card →
          </Link>

        </div>

      </div>

    </div>
  );
}

export default CardView;