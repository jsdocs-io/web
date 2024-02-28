import useAnchorLinks from "../../hooks/useAnchorLinks";
import useLocationHashRefresh from "../../hooks/useLocationHashRefresh";
import Footer from "../Footer";
import Head from "./Head";
import Main from "./Main";
import Navbar from "./Navbar";

const Layout = (props: any) => {
  useAnchorLinks();
  useLocationHashRefresh();

  return (
    <>
      <Head />

      <div className="flex flex-col h-screen text-stone-900 dark:text-stone-100">
        <Navbar />

        <Main {...props} />

        <Footer />
      </div>
    </>
  );
};

export default Layout;
