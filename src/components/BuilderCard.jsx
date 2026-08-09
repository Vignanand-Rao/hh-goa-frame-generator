import { forwardRef } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import QRCode from "react-qr-code";
import { getBuilderTitle } from "../utils/titles";

const BuilderCard = forwardRef(
  ({ image, name, role, builderId }, ref) => {
    const qrValue = `https://hh-goa-frame-generator.vercel.app/card/${builderId}`;

    return (
      <div
        ref={ref}
        className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[32px] bg-gradient-to-br from-zinc-900 via-black to-zinc-950 shadow-[0_0_60px_rgba(37,99,235,0.25)]"
      >
        <div className="pointer-events-none absolute inset-0 z-50 rounded-[32px] border-2 border-blue-500" />

        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 px-6 py-8 text-center sm:px-8">
          <h1 className="text-3xl font-black tracking-widest text-white sm:text-4xl">
            HH GOA 2026
          </h1>

          <p className="mt-2 text-xs tracking-[0.35em] text-blue-100 sm:text-sm">
            BUILDER ID CARD
          </p>
        </div>

        <div className="flex flex-col items-center px-5 py-8 sm:px-8">
          {image ? (
            <img
              src={image}
              alt="profile"
              crossOrigin="anonymous"
              draggable={false}
              className="h-40 w-40 rounded-full border-4 border-blue-500 object-cover shadow-2xl sm:h-44 sm:w-44"
            />
          ) : (
            <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-blue-500 bg-zinc-800 sm:h-44 sm:w-44">
              <FaUserAstronaut
                size={60}
                className="text-zinc-500 sm:hidden"
              />

              <FaUserAstronaut
                size={65}
                className="hidden text-zinc-500 sm:block"
              />
            </div>
          )}

          <div className="mt-7 flex max-w-full items-center justify-center gap-2">
            <h2 className="break-words text-center text-3xl font-extrabold text-white sm:text-4xl">
              {name || "Your Name"}
            </h2>

            <MdVerified
              size={28}
              className="shrink-0 text-blue-500"
            />
          </div>

          <p className="mt-3 max-w-full break-words text-center text-lg text-blue-400 sm:text-xl">
            {role || "Your Role"}
          </p>

          <div className="mt-8 w-full rounded-3xl bg-zinc-800/80 p-5 sm:p-6">
            <p className="text-sm text-zinc-400 sm:text-base">
              Builder Title
            </p>

            <h3 className="mt-3 break-words text-2xl font-bold text-white sm:text-3xl">
              {getBuilderTitle(role)}
            </h3>
          </div>

          <div className="mt-6 grid w-full grid-cols-2 gap-3 sm:gap-5">
            <div className="min-w-0 rounded-2xl bg-zinc-900 p-4 sm:p-5">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 sm:text-xs">
                Builder ID
              </p>

              <p className="mt-3 break-all text-lg font-bold text-white sm:text-xl">
                {builderId}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl bg-zinc-900 p-4 sm:p-5">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 sm:text-xs">
                Status
              </p>

              <p className="mt-3 text-lg font-bold text-green-400 sm:text-xl">
                VERIFIED
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-3 sm:p-4">
            <QRCode
              value={qrValue}
              size={140}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          <p className="mt-3 text-center text-sm font-semibold text-zinc-300">
            Scan to Verify Builder
          </p>

          <div className="mt-8 w-full rounded-3xl border-2 border-dashed border-blue-500 p-5 text-center sm:p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 sm:text-sm">
              HH GOA 2026
            </p>

            <p className="mt-3 text-xl font-bold text-white sm:text-2xl">
              #FrameInGoa
            </p>

            <p className="mt-2 break-all text-xs text-zinc-400 sm:text-sm">
              {qrValue}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

BuilderCard.displayName = "BuilderCard";

export default BuilderCard;