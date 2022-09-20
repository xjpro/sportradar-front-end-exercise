import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className="container mt-3">{children}</div>
      <Footer />
    </div>
  );
}
