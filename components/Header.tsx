import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="navbar  bg-dark text-light">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">Sportsradar</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
