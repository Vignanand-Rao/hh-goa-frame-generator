import html2canvas from "html2canvas";

export async function exportCard(cardRef) {
  if (!cardRef.current) {
    alert("Card not found");
    return;
  }

  try {
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#000000",
      logging: false
    });

    const link = document.createElement("a");
    link.download = "HH-Goa-Builder-Card.png";
    link.href = canvas.toDataURL("image/png");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("DOWNLOAD ERROR:", error);
    alert("Unable to download the complete Builder Card.");
  }
}