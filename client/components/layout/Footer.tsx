export default function Footer() {
  return (
    <footer className="bg-white border-t border-primary py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {/* Brand Section */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-black" style={{ fontFamily: 'Noticia Text, serif' }}>
              Vaastu 360
            </h3>
            <p className="text-black leading-relaxed max-w-xs" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              Bringing ancient Vastu wisdom to the modern world through intelligent technology.
            </p>
          </div>

          {/* Product Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-black" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              Product
            </h4>
            <nav className="space-y-4">
              <a href="#features" className="block text-black hover:text-primary transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                Features
              </a>
              <a href="#pricing" className="block text-black hover:text-primary transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                Pricing
              </a>
              <a href="#demo" className="block text-black hover:text-primary transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                Demo
              </a>
              <a href="#api" className="block text-black hover:text-primary transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                API
              </a>
            </nav>
          </div>

          {/* Resources Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-black" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              Resources
            </h4>
            <nav className="space-y-4">
              <a href="#documentation" className="block text-black hover:text-primary transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                Documentation
              </a>
              <a href="#vastu-guide" className="block text-black hover:text-primary transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                Vastu Guide
              </a>
              <a href="#support" className="block text-black hover:text-primary transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                Support
              </a>
              <a href="#blog" className="block text-black hover:text-primary transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                Blog
              </a>
            </nav>
          </div>

          {/* Company Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-black" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              Company
            </h4>
            <nav className="space-y-4">
              <a href="#about" className="block text-black hover:text-primary transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                About
              </a>
              <a href="#contact" className="block text-black hover:text-primary transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                Contact
              </a>
              <a href="#privacy" className="block text-black hover:text-primary transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                Privacy
              </a>
              <a href="#terms" className="block text-black hover:text-primary transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                Terms
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
