import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="navbar bg-dark navbar-dark">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">Sportradar</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
