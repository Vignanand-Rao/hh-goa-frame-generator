import { toPng } from "html-to-image";

export async function exportCard(cardRef) {
  if (!cardRef.current) {
    alert("Card not found");
    return;
  }

  console.log("CARD REF:", cardRef.current);

  try {
    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 3,
      skipFonts: true,
      backgroundColor: "#000000",
    });

    const link = document.createElement("a");

    link.download = "HH-Goa-Builder-Card.png";
    link.href = dataUrl;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  } catch (error) {
    console.error("FULL EXPORT ERROR:", error);

    alert(error.message || "Export failed");
  }
}