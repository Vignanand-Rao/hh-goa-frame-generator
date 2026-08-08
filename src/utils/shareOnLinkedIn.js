export function shareOnLinkedIn(builderId) {
  const url = `https://hh-goa-frame-generator.vercel.app/card/${builderId}`;

  const shareUrl =
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  window.open(
    shareUrl,
    "_blank",
    "noopener,noreferrer,width=700,height=700"
  );
}