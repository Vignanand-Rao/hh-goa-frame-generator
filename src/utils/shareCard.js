import { toBlob } from "html-to-image";

export async function shareCard({
  cardElement,
  builderId,
  name,
  role,
  platform,
}) {
  if (!cardElement) {
    alert("ID Card is not ready.");
    return;
  }

  const verificationUrl =
    `https://hh-goa-frame-generator.vercel.app/card/${builderId}`;

  const text =
    `I just created my HH GOA 2026 ID Card! 🚀\n\n` +
    `Name: ${name}\n` +
    `Role: ${role}\n` +
    `ID: ${builderId}\n\n` +
    `Verify my ID Card: ${verificationUrl}\n\n` +
    `#HHGOA2026 #FrameInGoa`;

  try {
    const blob = await toBlob(cardElement, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#000000",
    });

    if (!blob) {
      throw new Error("Could not create ID Card image.");
    }

    const file = new File(
      [blob],
      `HH-GOA-${builderId}.png`,
      {
        type: "image/png",
      }
    );

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({
        files: [file],
      })
    ) {
      await navigator.share({
        title: "HH GOA 2026 ID Card",
        text,
        url: verificationUrl,
        files: [file],
      });

      return;
    }

    if (navigator.share) {
      await navigator.share({
        title: "HH GOA 2026 ID Card",
        text,
        url: verificationUrl,
      });

      return;
    }

    await navigator.clipboard.writeText(text);

    if (platform === "x") {
      const xUrl =
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

      window.open(
        xUrl,
        "_blank",
        "noopener,noreferrer,width=700,height=700"
      );

      alert(
        "Your ID Card image was generated. X web sharing cannot automatically attach the image. The post text and verification link were copied."
      );

      return;
    }

    if (platform === "linkedin") {
      const linkedInUrl =
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          verificationUrl
        )}`;

      window.open(
        linkedInUrl,
        "_blank",
        "noopener,noreferrer,width=700,height=700"
      );

      alert(
        "Your ID Card image was generated. LinkedIn web sharing cannot automatically attach the image. The post text was copied so you can paste it."
      );
    }
  } catch (error) {
    if (error?.name === "AbortError") {
      return;
    }

    console.error("Share failed:", error);
    alert("Unable to share the ID Card.");
  }
}