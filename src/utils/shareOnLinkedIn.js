export async function shareOnLinkedIn(builderId, name, role) {
  const url = `https://hh-goa-frame-generator.vercel.app/card/${builderId}`;

  const text = `I just created my HH GOA 2026 ID Card! 🚀

I'm ${name}, a ${role}.

#HHGOA2026 #FrameInGoa`;

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Could not copy LinkedIn text:", error);
  }

  const shareUrl =
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  window.open(
    shareUrl,
    "_blank",
    "noopener,noreferrer,width=700,height=700"
  );
}