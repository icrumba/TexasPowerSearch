import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div>
          <p className="font-space font-bold text-white text-lg">
            <span className="text-texas-gold">★</span> Texas Power Search
          </p>
          <p className="font-jetbrains text-white/30 text-sm mt-1">
            Built for the Texas deregulated energy market.
          </p>
        </div>

        {/* Links */}
        <nav className="flex gap-6 font-jetbrains text-sm text-white/40">
          <Link href="/search" className="hover:text-white/80 transition-colors">Search Plans</Link>
          <Link href="/chat" className="hover:text-white/80 transition-colors">AI Chat</Link>
          <Link href="/login" className="hover:text-white/80 transition-colors">Admin</Link>
        </nav>

        {/* Copyright */}
        <p className="font-jetbrains text-white/20 text-xs">
          &copy; {new Date().getFullYear()} Texas Power Search
        </p>
      </div>
    </footer>
  );
}
