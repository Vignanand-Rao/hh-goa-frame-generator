import { toPng } from "html-to-image";

export async function exportCard(cardRef) {
  if (!cardRef.current) {
    alert("Card not found");
    return;
  }

  const card = cardRef.current;

  try {
    await document.fonts.ready;

    const images = [...card.querySelectorAll("img")];

    await Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          })
      )
    );

    const dataUrl = await toPng(card, {
      cacheBust: true,
      backgroundColor: "#000000",
      pixelRatio: 1,
      skipFonts: true
    });

    const link = document.createElement("a");
    link.download = "HH-Goa-Builder-Card.png";
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("EXPORT ERROR:", error);
    alert("Unable to download the complete Builder Card.");
  }
}