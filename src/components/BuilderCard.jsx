import { forwardRef } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import QRCode from "react-qr-code";
import { getBuilderTitle } from "../utils/titles";

const BuilderCard = forwardRef(
  ({ image, name, role, mobile, email, builderId }, ref) => {
    const qrValue = `https://hh-goa-frame-generator.vercel.app/card/${builderId}`;

    return (
      <div
        ref={ref}
        className="hh-id-card"
        style={{
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "512px",
          minWidth: 0,

          /* ACTUAL HH GOA ID CARD BACKGROUND */
          backgroundImage: 'url("/id-background.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* TOP HEADER */}
        <div className="hh-card-header">
          <p className="hh-location">
            GOA, INDIA • 2026
          </p>

          <h1 className="hh-hacker-house">
            HACKER HOUSE
          </h1>

          <div className="hh-goa-text">
            GOA
          </div>

          <div className="hh-yellow-line" />

          <h2 className="hh-event-name">
            HH GOA 2026
          </h2>

          <p className="hh-event-tagline">
            ONE FRAME, WHOLE CREW
          </p>
        </div>

        {/* CARD CONTENT */}
        <div className="hh-card-content">

          {/* PROFILE IMAGE */}
          {image ? (
            <img
              src={image}
              alt="profile"
              crossOrigin="anonymous"
              draggable={false}
              className="hh-profile-image"
            />
          ) : (
            <div className="hh-profile-placeholder">
              <FaUserAstronaut size={58} />
            </div>
          )}

          {/* NAME + VERIFIED */}
          <div className="hh-name-row">
            <h2 className="hh-builder-name">
              {name || "Your Name"}
            </h2>

            <MdVerified className="hh-verified-icon" />
          </div>

          {/* ROLE */}
          <p className="hh-role">
            {role || "Your Role"}
          </p>

          {/* INFORMATION PANEL */}
          <div className="hh-info-panel">

            <div className="hh-info-item">
              <p className="hh-label">NAME</p>

              <p className="hh-value">
                {name || "Your Name"}
              </p>
            </div>

            <div className="hh-info-item">
              <p className="hh-label">BUILDER TITLE</p>

              <p className="hh-value">
                {getBuilderTitle(role)} 🚀
              </p>
            </div>

            <div className="hh-info-item">
              <p className="hh-label">ROLE</p>

              <p className="hh-value">
                {role || "Your Role"}
              </p>
            </div>

            <div className="hh-info-item">
              <p className="hh-label">MOBILE</p>

              <p className="hh-value">
                {mobile || "Not provided"}
              </p>
            </div>

            <div className="hh-info-item hh-email-item">
              <p className="hh-label">EMAIL</p>

              <p className="hh-value hh-break">
                {email || "Not provided"}
              </p>
            </div>

          </div>

          {/* BUILDER ID + STATUS */}
          <div className="hh-id-status-grid">

            <div className="hh-small-panel">
              <p className="hh-label">
                BUILDER ID
              </p>

              <p className="hh-value hh-id-value">
                {builderId}
              </p>
            </div>

            <div className="hh-small-panel">
              <p className="hh-label">
                STATUS
              </p>

              <p className="hh-status">
                VERIFIED
              </p>
            </div>

          </div>

          {/* QR CODE */}
          <div className="hh-qr-wrapper">
            <QRCode
              value={qrValue}
              size={150}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          <p className="hh-scan-text">
            SCAN TO VERIFY BUILDER
          </p>

          {/* VERIFICATION PANEL */}
          <div className="hh-footer-panel">

            <p className="hh-footer-event">
              HH GOA 2026 • GOA, INDIA
            </p>

            <p className="hh-frame-text">
              #FrameInGoa
            </p>

            <p className="hh-url">
              {qrValue}
            </p>

          </div>

          {/* BOTTOM TAGS */}
          <div className="hh-bottom-tags">
            <span>BUILD</span>
            <span>SHIP</span>
            <span>LAUNCH</span>
            <span>REPEAT</span>
          </div>

        </div>
      </div>
    );
  }
);

BuilderCard.displayName = "BuilderCard";

export default BuilderCard;