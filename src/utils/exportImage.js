import { toPng } from "html-to-image";

export async function exportCard(cardRef) {
  if (!cardRef.current) {
    alert("Card not found");
    return;
  }

  const card = cardRef.current;

  try {
    await document.fonts.ready;

    const dataUrl = await toPng(card, {
      cacheBust: true,
      backgroundColor: "#000000",
      pixelRatio: window.devicePixelRatio || 1,
      skipFonts: true,
      style: {
        margin: "0",
        transform: "none",
      },
    });

    const link = document.createElement("a");
    link.download = "HH-Goa-Builder-Card.png";
    link.href = dataUrl;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("FULL EXPORT ERROR:", error);
    alert("Unable to download the complete Builder Card.");
  }
}