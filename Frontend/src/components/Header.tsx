import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: "Atlas", href: "/atlas" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Upload", href: "/upload" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Load Google Translate script
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    // @ts-ignore
    window.googleTranslateElementInit = () => {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,bn,mr,ta,te,ml,kn,gu,pa,or",
          autoDisplay: false,
        },
        "google_translate_element_hidden"
      );
    };
  }, []);

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    const selectEl: HTMLSelectElement | null = document.querySelector(".goog-te-combo");
    if (!selectEl) return;

    // Show temporary loader
    const loader = document.createElement("div");
    loader.id = "translate-loader";
    Object.assign(loader.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(255,255,255,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "9999",
      fontSize: "1.5rem",
      color: "#333",
      transition: "opacity 0.3s",
    });
    loader.innerText = "Switching Language...";
    document.body.appendChild(loader);

    selectEl.value = lang;
    selectEl.dispatchEvent(new Event("change"));

    setTimeout(() => {
      loader.remove();
    }, 1500);
  };

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "bn", label: "বাংলা" },
    { code: "mr", label: "मराठी" },
    { code: "ta", label: "தமிழ்" },
    { code: "te", label: "తెలుగు" },
    { code: "ml", label: "മലയാളം" },
    { code: "kn", label: "ಕನ್ನಡ" },
    { code: "gu", label: "ગુજરાતી" },
    { code: "pa", label: "ਪੰਜਾਬੀ" },
    { code: "or", label: "ଓଡ଼ିଆ" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="fra-container">
        <div className="flex h-header items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-lift">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-hero rounded-lg">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold fra-gradient-text">FRA Atlas</h1>
              <p className="text-xs text-muted-foreground -mt-1">Empowering Communities</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons + Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="hero" size="sm">Sign Up</Button>
                </Link>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
            )}

            {/* Language Selector (locked from translation) */}
            <div className="notranslate" translate="no">
              <Select onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[160px] z-[100]" translate="no">
                  <SelectValue placeholder="🌐 Language" translate="no" />
                </SelectTrigger>
                <SelectContent translate="no">
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code} translate="no">
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex space-x-2 pt-2">
                {!isAuthenticated ? (
                  <>
                    <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">Login</Button>
                    </Link>
                    <Link to="/signup" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="hero" size="sm" className="w-full">Sign Up</Button>
                    </Link>
                  </>
                ) : (
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</Button>
                )}
              </div>

              {/* Mobile Language Selector */}
              <div className="pt-3 notranslate z-[100]" translate="no">
                <Select onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-full" translate="no">
                    <SelectValue placeholder="🌐 Language" translate="no" />
                  </SelectTrigger>
                  <SelectContent translate="no">
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code} translate="no">
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Google Translate element */}
      <div id="google_translate_element_hidden" className="hidden"></div>
    </header>
  );
};

export default Header;
