function Header() {
  return (
    <header className="border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-wide">
          HH GOA 2026
        </h1>

        <button className="bg-white text-black px-5 py-2 rounded-xl">
          Generate
        </button>
      </div>
    </header>
  );
}

export default Header;