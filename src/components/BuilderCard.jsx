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
        className="relative mx-auto w-full overflow-hidden rounded-[28px] border-2 border-yellow-400 bg-[#021f16] text-white shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
        style={{
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "520px",
          minWidth: 0,
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-12 top-20 text-6xl opacity-20">
            🌴
          </div>

          <div className="absolute -right-10 top-32 text-6xl opacity-20">
            🌴
          </div>

          <div className="absolute left-4 top-[42%] text-4xl opacity-10">
            🌿
          </div>

          <div className="absolute right-4 top-[58%] text-4xl opacity-10">
            🌿
          </div>

          <div className="absolute bottom-24 left-2 text-5xl opacity-10">
            🌴
          </div>

          <div className="absolute bottom-20 right-2 text-5xl opacity-10">
            🌴
          </div>
        </div>

        <div className="relative border-b-2 border-yellow-400 bg-[#075c3c] px-5 py-7 text-center sm:px-8 sm:py-9">
          <div className="flex items-center justify-between text-xl">
            <span>🌴</span>

            <span className="text-[10px] font-black tracking-[0.4em] text-yellow-300 sm:text-xs">
              GOA, INDIA • 2026
            </span>

            <span>🌴</span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-wide text-yellow-300 sm:text-4xl">
            HACKER HOUSE
          </h1>

          <p className="mt-1 text-xl font-black text-white sm:text-2xl">
            GOA
          </p>

          <div className="mx-auto mt-3 h-1 w-20 bg-yellow-400" />

          <h2 className="mt-5 text-2xl font-black tracking-wider text-white sm:text-3xl">
            HH GOA 2026
          </h2>

          <p className="mt-1 text-[10px] font-black tracking-[0.35em] text-pink-300 sm:text-xs">
            ONE FRAME, WHOLE CREW
          </p>
        </div>

        <div className="relative px-5 py-7 sm:px-8 sm:py-9">
          <div className="mb-5 text-center text-2xl">
            🌴 🌊 🌴
          </div>

          <div className="flex justify-center">
            {image ? (
              <img
                src={image}
                alt="Builder"
                crossOrigin="anonymous"
                draggable={false}
                className="h-36 w-36 rounded-full border-4 border-yellow-400 object-cover shadow-[0_0_35px_rgba(250,204,21,0.25)] sm:h-44 sm:w-44"
              />
            ) : (
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-yellow-400 bg-[#06452f] sm:h-44 sm:w-44">
                <FaUserAstronaut
                  size={58}
                  className="text-yellow-300"
                />
              </div>
            )}
          </div>

          <div className="mt-6 flex min-w-0 items-center justify-center gap-2">
            <h2 className="max-w-[calc(100%-42px)] break-words text-center text-3xl font-black leading-tight text-white sm:text-4xl">
              {name || "Your Name"}
            </h2>

            <MdVerified
              size={27}
              className="shrink-0 text-blue-500 sm:h-8 sm:w-8"
            />
          </div>

          <p className="mt-2 break-words text-center text-lg font-semibold text-yellow-300 sm:text-xl">
            {role || "Your Role"}
          </p>

          <div className="mt-7 rounded-[25px] border border-yellow-500/70 bg-[#075c3c] p-5 sm:p-6">
            <div className="grid grid-cols-2 gap-x-5 gap-y-5">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">
                  Name
                </p>

                <p className="mt-2 break-words text-sm font-bold text-white sm:text-base">
                  {name || "Your Name"}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">
                  Builder Title
                </p>

                <p className="mt-2 break-words text-sm font-bold text-white sm:text-base">
                  {getBuilderTitle(role)} 🚀
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">
                  Role
                </p>

                <p className="mt-2 break-words text-sm font-bold text-white sm:text-base">
                  {role || "Your Role"}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">
                  Mobile
                </p>

                <p className="mt-2 break-all text-sm font-bold text-white sm:text-base">
                  {mobile || "Not provided"}
                </p>
              </div>

              <div className="col-span-2 min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">
                  Email
                </p>

                <p className="mt-2 break-all text-sm font-bold text-white sm:text-base">
                  {email || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="min-w-0 rounded-2xl border border-yellow-500/60 bg-[#033c29] p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-yellow-300">
                Builder ID
              </p>

              <p className="mt-2 break-all text-base font-black text-white sm:text-lg">
                {builderId}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl border border-yellow-500/60 bg-[#033c29] p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-yellow-300">
                Status
              </p>

              <p className="mt-2 text-base font-black text-green-400 sm:text-lg">
                VERIFIED
              </p>
            </div>
          </div>

          <div className="mt-7 flex justify-center">
            <div className="rounded-2xl bg-white p-4">
              <QRCode
                value={qrValue}
                size={150}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
          </div>

          <p className="mt-3 text-center text-xs font-black uppercase text-white sm:text-sm">
            Scan to Verify Builder
          </p>

          <div className="mt-7 rounded-[25px] border-2 border-dashed border-yellow-400 bg-[#043c2b] p-5 text-center sm:p-6">
            <p className="text-[10px] font-black tracking-[0.3em] text-yellow-300 sm:text-xs">
              HH GOA 2026 • GOA, INDIA
            </p>

            <p className="mt-3 text-2xl font-black text-white">
              #FrameInGoa
            </p>

            <p className="mt-3 break-all text-xs text-zinc-300">
              {qrValue}
            </p>
          </div>

          <div className="mt-7 border-t border-yellow-500/40 pt-5">
            <div className="grid grid-cols-4 text-center">
              <span className="text-[9px] font-black text-yellow-300">
                BUILD
              </span>

              <span className="text-[9px] font-black text-pink-300">
                SHIP
              </span>

              <span className="text-[9px] font-black text-yellow-300">
                LAUNCH
              </span>

              <span className="text-[9px] font-black text-pink-300">
                REPEAT
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BuilderCard.displayName = "BuilderCard";

export default BuilderCard;