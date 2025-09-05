import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-300">
      <div className="flex h-16 sm:h-16 lg:h-16 items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
        <Link to="/" className="flex items-center flex-shrink-0">
          <span className="font-bold text-lg sm:text-xl lg:text-2xl text-black" style={{ fontFamily: 'Noto Sans Devanagari, Inter, sans-serif' }}>
            Vaastu 360
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <NavLink
            to="#features"
            className="text-gray-600 hover:text-primary transition-colors text-sm lg:text-base font-medium"
            style={{ fontFamily: 'Noto Sans Devanagari, Inter, sans-serif' }}
          >
            Features
          </NavLink>
          <NavLink
            to="#how-it-works"
            className="text-gray-600 hover:text-primary transition-colors text-sm lg:text-base font-medium"
            style={{ fontFamily: 'Noto Sans Devanagari, Inter, sans-serif' }}
          >
            How It Works
          </NavLink>
          <NavLink
            to="#testimonials"
            className="text-gray-600 hover:text-primary transition-colors text-sm lg:text-base font-medium"
            style={{ fontFamily: 'Noto Sans Devanagari, Inter, sans-serif' }}
          >
            Testimonials
          </NavLink>
          <NavLink
            to="#pricing"
            className="text-gray-600 hover:text-primary transition-colors text-sm lg:text-base font-medium"
            style={{ fontFamily: 'Noto Sans Devanagari, Inter, sans-serif' }}
          >
            Price Plan
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <Link to="/login" className="px-3 py-2 sm:px-4 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium text-sm sm:text-base lg:text-lg" style={{ fontFamily: 'Roboto, Inter, sans-serif' }}>
            Log in
          </Link>
          <Link to="/subscription" className="px-3 py-2 sm:px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base lg:text-lg" style={{ fontFamily: 'Roboto, Inter, sans-serif' }}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
