import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BuilderCard from "../components/BuilderCard";
import { getBuilder } from "../services/builderService";
import { exportCard } from "../utils/exportImage";

function Card() {
  const { builderId } = useParams();

  const [builder, setBuilder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const cardRef = useRef(null);

  useEffect(() => {
    const loadBuilder = async () => {
      try {
        setLoading(true);

        const data = await getBuilder(
          builderId?.toUpperCase()
        );

        if (!data) {
          setNotFound(true);
          return;
        }

        setBuilder(data);
      } catch (error) {
        console.error(error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadBuilder();
  }, [builderId]);

  const handleDownload = async () => {
    try {
      await exportCard(cardRef);
    } catch (error) {
      console.error(error);
      alert("Unable to download the Builder Card.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#032d20] text-yellow-300">
        <div className="text-center">
          <div className="text-4xl">🌴</div>
          <p className="mt-4 font-black">
            Loading Builder...
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !builder) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#032d20] px-6 text-white">
        <div className="text-center">
          <div className="text-5xl">🌴</div>

          <h1 className="mt-5 text-3xl font-black">
            Builder Not Found
          </h1>

          <p className="mt-3 text-green-100/60">
            This Builder ID does not exist.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-yellow-400 px-6 py-3 font-black text-[#073c29]"
          >
            Back to HH Goa
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#032d20] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-[560px] text-center">
        <div className="mb-6">
          <p className="text-[10px] font-black tracking-[0.35em] text-yellow-300">
            GOA, INDIA • 2026
          </p>

          <h1 className="mt-2 text-3xl font-black text-yellow-300">
            HACKER HOUSE GOA
          </h1>

          <p className="mt-1 text-xs font-black tracking-[0.3em] text-pink-300">
            BUILDER VERIFICATION
          </p>
        </div>

        <BuilderCard
          ref={cardRef}
          image={builder.image}
          name={builder.name}
          role={builder.role}
          mobile={builder.mobile}
          email={builder.email}
          builderId={builder.builderId}
        />

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full rounded-2xl bg-yellow-400 py-4 font-black text-[#073c29]"
          >
            📥 Download This Builder Card
          </button>

          <Link
            to="/"
            className="w-full rounded-2xl border border-yellow-400 bg-[#075c3c] py-4 font-black text-white"
          >
            🌴 Create Your Own Builder ID
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;