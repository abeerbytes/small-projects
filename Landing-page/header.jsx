function Header() {
  return (
    <header className="bg-[#0B5ED7] text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        <h1 className="text-xl font-semibold tracking-wide">
          Unbounce
        </h1>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a className="hover:opacity-80">Products</a>
          <a className="hover:opacity-80">Solutions</a>
          <a className="hover:opacity-80">Pricing</a>
          <a className="hover:opacity-80">Resources</a>
        </nav>

        <button className="bg-[#F59E0B] text-black px-5 py-2 rounded-md text-sm font-semibold">
          Start My Free Trial
        </button>

      </div>
    </header>
  );
}

export default Header;

