const titles = {
  backend: "API Architect ⚡",
  frontend: "Pixel Wizard 🎨",
  "full stack": "Stack Shifter 🚀",
  python: "Python Ninja 🐍",
  "python developer": "Python Ninja 🐍",
  ai: "Neural Navigator 🧠",
  "ai engineer": "Neural Navigator 🧠",
  ml: "Model Whisperer 🤖",
  "ml engineer": "Model Whisperer 🤖",
  devops: "Cloud Commander ☁️",
  designer: "UI Magician ✨",
  student: "Future Founder 🌟",
};

export function getBuilderTitle(role) {
  if (!role) return "Future Founder 🌟";

  const key = role.toLowerCase().trim();

  return titles[key] || "Code Explorer 🚀";
}