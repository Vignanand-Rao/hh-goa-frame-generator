import { toPng } from "html-to-image";

export async function exportCard(cardRef) {
  if (!cardRef.current) {
    alert("Card not found");
    return;
  }

  const element = cardRef.current;

  try {
    const width = element.scrollWidth;
    const height = element.scrollHeight;

    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#000000",
      width,
      height,
      canvasWidth: width * 2,
      canvasHeight: height * 2,
      style: {
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: "none",
        maxHeight: "none",
        overflow: "visible",
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
    alert(error.message || "Export failed");
  }
}