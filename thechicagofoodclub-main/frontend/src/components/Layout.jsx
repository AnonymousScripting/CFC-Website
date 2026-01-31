import Header from '../componenets/Header';
import Footer from '../componenets/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pt-20 bg-black">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
