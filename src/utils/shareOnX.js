export function shareOnX(name, role) {
  const website = "https://hh-goa-frame-generator.vercel.app/";

  const text = `🚀 Just built my official HH GOA 2026 Builder ID Card!

👤 Name: ${name || "Builder"}

💻 Role: ${role || "Developer"}

✨ Create yours here:
${website}

#FrameInGoa #HHGoa2026 #HackerHouseGoa`;

  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    "_blank"
  );
}