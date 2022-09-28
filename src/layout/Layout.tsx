import Header from "./Header/Header";
import Footer from "./Footer";

function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="lg:grid lg:grid-cols-5">
      <Header />

      <main className="pt-10 lg:pt-0 lg:col-start-2 lg:col-end-6">
        {props.children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
