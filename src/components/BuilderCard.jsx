import { forwardRef } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import QRCode from "react-qr-code";
import { getBuilderTitle } from "../utils/titles";

const BuilderCard = forwardRef(
  ({ image, name, mobile, role, builderId }, ref) => {
    const qrValue = `https://hh-goa-frame-generator.vercel.app/card/${builderId}`;

    return (
      <div
        ref={ref}
        className="w-full box-border bg-black p-2 sm:p-3"
      >
        <div
          className="mx-auto w-full max-w-lg overflow-hidden rounded-[28px] border border-blue-500 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 shadow-[0_0_60px_rgba(37,99,235,0.25)]"
          style={{
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "512px",
            minWidth: 0,
          }}
        >
          <div className="w-full box-border bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 px-4 py-6 text-center sm:px-8 sm:py-8">
            <h1 className="whitespace-nowrap text-2xl font-black tracking-widest text-white sm:text-4xl">
              HH GOA 2026
            </h1>

            <p className="mt-2 text-[10px] tracking-[0.28em] text-blue-100 sm:text-sm sm:tracking-[0.35em]">
              BUILDER ID CARD
            </p>
          </div>

          <div className="flex min-w-0 w-full flex-col items-center px-4 py-6 box-border sm:px-8 sm:py-8">
            {image ? (
              <img
                src={image}
                alt="profile"
                crossOrigin="anonymous"
                draggable={false}
                className="h-32 w-32 max-w-full rounded-full border-4 border-blue-500 object-cover shadow-2xl sm:h-44 sm:w-44"
              />
            ) : (
              <div className="flex h-32 w-32 max-w-full items-center justify-center rounded-full border-4 border-blue-500 bg-zinc-800 sm:h-44 sm:w-44">
                <FaUserAstronaut
                  size={50}
                  className="text-zinc-500 sm:hidden"
                />

                <FaUserAstronaut
                  size={65}
                  className="hidden text-zinc-500 sm:block"
                />
              </div>
            )}

            <div className="mt-6 flex w-full min-w-0 items-center justify-center gap-2 sm:mt-7">
              <h2 className="min-w-0 max-w-[calc(100%-38px)] break-words text-center text-2xl font-extrabold leading-tight text-white sm:text-4xl">
                {name || "Your Name"}
              </h2>

              <MdVerified
                size={24}
                className="shrink-0 text-blue-500 sm:h-7 sm:w-7"
              />
            </div>

            <p className="mt-3 max-w-full break-words text-center text-base leading-tight text-blue-400 sm:text-xl">
              {role || "Your Role"}
            </p>

            <div className="mt-3 flex max-w-full items-center justify-center gap-2 text-sm text-zinc-300 sm:text-base">
              <span className="shrink-0">📱</span>

              <span className="break-all text-center">
                {mobile || "Mobile Number"}
              </span>
            </div>

            <div className="mt-7 w-full min-w-0 rounded-3xl bg-zinc-800/80 p-4 box-border sm:mt-8 sm:p-6">
              <p className="text-sm text-zinc-400 sm:text-base">
                Builder Title
              </p>

              <h3 className="mt-2 break-words text-2xl font-bold leading-tight text-white sm:mt-3 sm:text-3xl">
                {getBuilderTitle(role)}
              </h3>
            </div>

            <div className="mt-5 grid w-full min-w-0 grid-cols-2 gap-3 box-border sm:mt-6 sm:gap-5">
              <div className="min-w-0 overflow-hidden rounded-2xl bg-zinc-900 p-3 sm:p-5">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 sm:text-xs">
                  Builder ID
                </p>

                <p className="mt-2 break-all text-base font-bold text-white sm:mt-3 sm:text-xl">
                  {builderId}
                </p>
              </div>

              <div className="min-w-0 overflow-hidden rounded-2xl bg-zinc-900 p-3 sm:p-5">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 sm:text-xs">
                  Status
                </p>

                <p className="mt-2 break-words text-base font-bold text-green-400 sm:mt-3 sm:text-xl">
                  VERIFIED
                </p>
              </div>
            </div>

            <div className="mt-7 flex max-w-full items-center justify-center rounded-2xl bg-white p-3 box-border sm:mt-8 sm:p-4">
              <QRCode
                value={qrValue}
                size={140}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>

            <p className="mt-3 max-w-full text-center text-xs font-semibold text-zinc-300 sm:text-sm">
              Scan to Verify Builder
            </p>

            <div className="mt-7 w-full min-w-0 overflow-hidden rounded-3xl border-2 border-dashed border-blue-500 p-4 text-center box-border sm:mt-8 sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 sm:text-sm sm:tracking-[0.35em]">
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
      </div>
    );
  }
);

BuilderCard.displayName = "BuilderCard";

export default BuilderCard;