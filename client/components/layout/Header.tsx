import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur border-b border-gray-300">
      <div className="flex h-16 sm:h-16 lg:h-16 items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
        <Link to="/" className="flex items-center flex-shrink-0">
          <span
            className="font-bold text-lg sm:text-xl lg:text-2xl text-black"
            style={{ fontFamily: "Noto Sans Devanagari, Inter, sans-serif" }}
          >
            Vaastu 360
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <a
            href="/#features"
            className="text-gray-600 hover:text-primary transition-colors text-sm lg:text-base font-medium"
            style={{ fontFamily: "Noto Sans Devanagari, Inter, sans-serif" }}
          >
            Features
          </a>
          <a
            href="/#how-it-works"
            className="text-gray-600 hover:text-primary transition-colors text-sm lg:text-base font-medium"
            style={{ fontFamily: "Noto Sans Devanagari, Inter, sans-serif" }}
          >
            How It Works
          </a>
          <a
            href="/#testimonials"
            className="text-gray-600 hover:text-primary transition-colors text-sm lg:text-base font-medium"
            style={{ fontFamily: "Noto Sans Devanagari, Inter, sans-serif" }}
          >
            Testimonials
          </a>
          <a
            href="/#pricing"
            className="text-gray-600 hover:text-primary transition-colors text-sm lg:text-base font-medium"
            style={{ fontFamily: "Noto Sans Devanagari, Inter, sans-serif" }}
          >
            Price Plan
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="font-medium text-sm sm:text-base lg:text-lg"
            style={{ fontFamily: "Roboto, Inter, sans-serif" }}
          >
            <Link to="/login">Log in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="font-medium text-sm sm:text-base lg:text-lg"
            style={{ fontFamily: "Roboto, Inter, sans-serif" }}
          >
            <Link to="/subscription">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
