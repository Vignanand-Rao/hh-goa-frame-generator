import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import BuilderCard from "../components/BuilderCard";
import { getBuilder } from "../services/builderService";

function CardView() {
  const { builderId } = useParams();

  const [builder, setBuilder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBuilder = async () => {
      try {
        setLoading(true);

        const data =
          await getBuilder(builderId);

        setBuilder(data);
      } catch (error) {
        console.error(
          "CARD VIEW ERROR:",
          error
        );
        setBuilder(null);
      } finally {
        setLoading(false);
      }
    };

    loadBuilder();
  }, [builderId]);

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

  return (
    <div className="hh-card-view-page">

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

      <div className="hh-card-view-content">

        <span className="hh-card-view-badge">
          ✓ VERIFIED BUILDER
        </span>

        <BuilderCard
          image={builder.image}
          name={builder.name}
          role={builder.role}
          mobile={builder.mobile}
          email={builder.email}
          builderId={builder.builderId}
        />

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