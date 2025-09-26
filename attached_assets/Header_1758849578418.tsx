import Link from "next/link";
import Logo from "./Logo";
import Container from "./Container";

export default function Header() {
  return (
    <header className="header">
      <Container>
        <div className="header-content">
          <Logo size="medium" showText={true} />
          
          <nav className="nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/properties" className="nav-link">Properties</Link>
            <Link href="/real-estate" className="nav-link">Real Estate</Link>
            <Link href="/mexico-guide" className="nav-link">Mexico Guide</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </nav>
          
          <div className="header-cta">
            <Link href="/mexico-guide" className="btn primary">
              Free Guide
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}

