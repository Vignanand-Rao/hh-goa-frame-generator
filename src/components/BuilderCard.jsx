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
        className="mx-auto w-full max-w-lg overflow-hidden rounded-[30px] border-2 border-yellow-400 bg-[#043b29] shadow-[0_0_60px_rgba(250,204,21,0.15)]"
        style={{
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "512px",
          minWidth: 0,
        }}
      >
        <div className="relative overflow-hidden border-b-2 border-yellow-400 bg-[#075536] px-5 py-7 text-center sm:px-8 sm:py-8">
          <div className="absolute left-2 top-1 text-4xl opacity-30">
            🌴
          </div>

          <div className="absolute right-2 top-1 text-4xl opacity-30">
            🌴
          </div>

          <p className="text-[9px] font-black tracking-[0.3em] text-yellow-300 sm:text-xs">
            GOA, INDIA • 2026
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-wide text-yellow-300 sm:text-4xl">
            HACKER HOUSE
          </h1>

          <p className="mt-1 text-xl font-black text-white">
            GOA
          </p>

          <div className="mx-auto mt-3 h-1 w-20 bg-yellow-400" />

          <h2 className="mt-3 text-xl font-black tracking-widest text-white">
            HH GOA 2026
          </h2>

          <p className="mt-1 text-[9px] font-black tracking-[0.3em] text-pink-300">
            ONE FRAME, WHOLE CREW
          </p>
        </div>

        <div className="flex min-w-0 w-full flex-col items-center px-4 py-6 box-border sm:px-7 sm:py-8">
          <div className="mb-6 flex w-full justify-around text-2xl opacity-70">
            🌴 🌊 🌴
          </div>

          {image ? (
            <img
              src={image}
              alt="profile"
              crossOrigin="anonymous"
              draggable={false}
              className="h-32 w-32 max-w-full rounded-full border-4 border-yellow-400 object-cover shadow-[0_0_30px_rgba(250,204,21,0.2)] sm:h-44 sm:w-44"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-yellow-400 bg-[#075536] sm:h-44 sm:w-44">
              <FaUserAstronaut
                size={55}
                className="text-yellow-300"
              />
            </div>
          )}

          <div className="mt-6 flex w-full min-w-0 items-center justify-center gap-2">
            <h2 className="min-w-0 max-w-[calc(100%-38px)] break-words text-center text-2xl font-extrabold leading-tight text-white sm:text-4xl">
              {name || "Your Name"}
            </h2>

            <MdVerified
              size={25}
              className="shrink-0 text-blue-500"
            />
          </div>

          <p className="mt-3 max-w-full break-words text-center text-base text-yellow-300 sm:text-xl">
            {role || "Your Role"}
          </p>

          <div className="mt-7 grid w-full grid-cols-2 gap-3 rounded-3xl border border-yellow-400/50 bg-[#075536] p-4 sm:gap-5 sm:p-5">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-yellow-300">
                Name
              </p>

              <p className="mt-2 break-words text-sm font-bold text-white sm:text-base">
                {name || "Your Name"}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-yellow-300">
                Builder Title
              </p>

              <p className="mt-2 break-words text-sm font-bold text-white sm:text-base">
                {getBuilderTitle(role)}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-yellow-300">
                Role
              </p>

              <p className="mt-2 break-words text-sm font-bold text-white sm:text-base">
                {role || "Your Role"}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-yellow-300">
                Mobile
              </p>

              <p className="mt-2 break-all text-sm font-bold text-white sm:text-base">
                {mobile || "Not provided"}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-[9px] font-black uppercase tracking-widest text-yellow-300">
                Email
              </p>

              <p className="mt-2 break-all text-sm font-bold text-white sm:text-base">
                {email || "Not provided"}
              </p>
            </div>
          </div>

          <div className="mt-5 grid w-full grid-cols-2 gap-3">
            <div className="min-w-0 rounded-2xl border border-yellow-400/40 bg-[#022b1d] p-4">
              <p className="text-[9px] uppercase tracking-widest text-yellow-300/70">
                Builder ID
              </p>

              <p className="mt-2 break-all text-base font-black text-white sm:text-xl">
                {builderId}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl border border-yellow-400/40 bg-[#022b1d] p-4">
              <p className="text-[9px] uppercase tracking-widest text-yellow-300/70">
                Status
              </p>

              <p className="mt-2 text-base font-black text-green-400 sm:text-xl">
                VERIFIED
              </p>
            </div>
          </div>

          <div className="mt-7 flex max-w-full items-center justify-center rounded-2xl bg-white p-3">
            <QRCode
              value={qrValue}
              size={140}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          <p className="mt-3 text-center text-xs font-black text-white sm:text-sm">
            SCAN TO VERIFY BUILDER
          </p>

          <div className="mt-7 w-full rounded-3xl border-2 border-dashed border-yellow-400 p-4 text-center sm:p-6">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-yellow-300 sm:text-xs">
              HH GOA 2026 • GOA, INDIA
            </p>

            <p className="mt-3 text-xl font-black text-white sm:text-2xl">
              #FrameInGoa
            </p>

            <p className="mt-2 break-all text-xs text-emerald-100/60 sm:text-sm">
              {qrValue}
            </p>
          </div>

          <div className="mt-6 flex w-full justify-around border-t border-yellow-400/20 pt-5 text-[9px] font-black tracking-widest">
            <span className="text-yellow-300">BUILD</span>
            <span className="text-pink-300">SHIP</span>
            <span className="text-yellow-300">LAUNCH</span>
            <span className="text-pink-300">REPEAT</span>
          </div>
        </div>
      </div>
    );
  }
);

BuilderCard.displayName = "BuilderCard";

export default BuilderCard;