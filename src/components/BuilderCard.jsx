import { forwardRef } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import QRCode from "react-qr-code";
import { getBuilderTitle } from "../utils/titles";

const BuilderCard = forwardRef(({ image, name, role, builderId }, ref) => {
  const qrValue = `https://hh-goa-frame-generator.vercel.app/card/${builderId}`;

  return (
    <div
      ref={ref}
      className="mx-auto w-full max-w-lg overflow-hidden rounded-[32px] border border-blue-500 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 shadow-[0_0_60px_rgba(37,99,235,0.25)]"
      style={{
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "512px",
        minWidth: 0,
      }}
    >
      <div className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 px-8 py-8 text-center box-border">
        <h1 className="text-4xl font-black tracking-widest text-white">
          HH GOA 2026
        </h1>

        <p className="mt-2 text-sm tracking-[0.35em] text-blue-100">
          BUILDER ID CARD
        </p>
      </div>

      <div className="flex min-w-0 w-full flex-col items-center px-8 py-8 box-border">
        {image ? (
          <img
            src={image}
            alt="profile"
            crossOrigin="anonymous"
            draggable={false}
            className="h-44 w-44 max-w-full rounded-full border-4 border-blue-500 object-cover shadow-2xl"
          />
        ) : (
          <div className="flex h-44 w-44 max-w-full items-center justify-center rounded-full border-4 border-blue-500 bg-zinc-800">
            <FaUserAstronaut size={65} className="text-zinc-500" />
          </div>
        )}

        <div className="mt-7 flex max-w-full min-w-0 items-center justify-center gap-2">
          <h2 className="min-w-0 max-w-full break-words text-center text-4xl font-extrabold text-white">
            {name || "Your Name"}
          </h2>

          <MdVerified
            size={28}
            className="shrink-0 text-blue-500"
          />
        </div>

        <p className="mt-3 max-w-full break-words text-center text-xl text-blue-400">
          {role || "Your Role"}
        </p>

        <div className="mt-8 w-full min-w-0 rounded-3xl bg-zinc-800/80 p-6 box-border">
          <p className="text-base text-zinc-400">
            Builder Title
          </p>

          <h3 className="mt-3 break-words text-3xl font-bold text-white">
            {getBuilderTitle(role)}
          </h3>
        </div>

        <div className="mt-6 grid w-full min-w-0 grid-cols-2 gap-4 box-border">
          <div className="min-w-0 overflow-hidden rounded-2xl bg-zinc-900 p-5">
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Builder ID
            </p>

            <p className="mt-3 break-all text-xl font-bold text-white">
              {builderId}
            </p>
          </div>

          <div className="min-w-0 overflow-hidden rounded-2xl bg-zinc-900 p-5">
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Status
            </p>

            <p className="mt-3 break-words text-xl font-bold text-green-400">
              VERIFIED
            </p>
          </div>
        </div>

        <div className="mt-8 flex max-w-full items-center justify-center rounded-2xl bg-white p-4 box-border">
          <QRCode
            value={qrValue}
            size={140}
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>

        <p className="mt-3 max-w-full text-center text-sm font-semibold text-zinc-300">
          Scan to Verify Builder
        </p>

        <div className="mt-8 w-full min-w-0 overflow-hidden rounded-3xl border-2 border-dashed border-blue-500 p-6 text-center box-border">
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
            HH GOA 2026
          </p>

          <p className="mt-3 text-2xl font-bold text-white">
            #FrameInGoa
          </p>

          <p className="mt-2 break-all text-sm text-zinc-400">
            {qrValue}
          </p>
        </div>
      </div>
    </div>
  );
});

BuilderCard.displayName = "BuilderCard";

export default BuilderCard;