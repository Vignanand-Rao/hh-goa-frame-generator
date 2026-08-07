import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { getBuilder } from "../services/builderService";

function CardView() {
  const { builderId } = useParams();

  const [builder, setBuilder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBuilder() {
      try {
        const data = await getBuilder(builderId);
        setBuilder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBuilder();
  }, [builderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading Builder...
      </div>
    );
  }

  if (!builder) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-black text-red-500">
          Builder Not Found
        </h1>

        <p className="mt-4 text-zinc-400">
          Invalid QR Code
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">

      <div className="w-full max-w-lg overflow-hidden rounded-[32px] border border-blue-500 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 shadow-[0_0_60px_rgba(37,99,235,0.25)]">

        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 p-8 text-center">

          <h1 className="text-4xl font-black tracking-widest text-white">
            HH GOA 2026
          </h1>

          <p className="mt-2 tracking-[0.35em] text-blue-100">
            VERIFIED BUILDER
          </p>

        </div>

        <div className="flex flex-col items-center px-8 py-8">

          <img
            src={builder.image}
            alt={builder.name}
            className="h-44 w-44 rounded-full border-4 border-blue-500 object-cover"
          />

          <div className="mt-7 flex items-center gap-2">

            <h2 className="text-4xl font-black text-white">
              {builder.name}
            </h2>

            <MdVerified
              size={28}
              className="text-blue-500"
            />

          </div>

          <p className="mt-3 text-xl text-blue-400">
            {builder.role}
          </p>

          <div className="mt-8 w-full rounded-3xl bg-zinc-800 p-6">

            <p className="text-zinc-400">
              Builder Title
            </p>

            <h3 className="mt-3 text-3xl font-bold text-white">
              {builder.title}
            </h3>

          </div>

          <div className="mt-6 grid w-full grid-cols-2 gap-5">

            <div className="rounded-2xl bg-zinc-900 p-5">

              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Builder ID
              </p>

              <p className="mt-3 text-lg font-bold text-white break-all">
                {builder.builderId}
              </p>

            </div>

            <div className="rounded-2xl bg-zinc-900 p-5">

              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Status
              </p>

              <p className="mt-3 text-lg font-bold text-green-400">
                VERIFIED
              </p>

            </div>

          </div>

          <div className="mt-8 w-full rounded-2xl bg-green-600 py-4 text-center">

            <h2 className="text-2xl font-black text-white">
              VERIFIED BY HH GOA
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CardView;