import { toPng } from "html-to-image";

export async function exportCard(cardRef) {
  if (!cardRef.current) {
    alert("Card not found");
    return;
  }

  const element = cardRef.current;

  try {
    const rect = element.getBoundingClientRect();

    const width = Math.ceil(
      Math.max(rect.width, element.scrollWidth)
    );

    const height = Math.ceil(
      Math.max(rect.height, element.scrollHeight)
    );

    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 3,
      backgroundColor: "#000000",
      width,
      height,
      style: {
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: "none",
        maxHeight: "none",
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