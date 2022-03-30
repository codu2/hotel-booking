import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ActionButton from "./ActionButton";

const Layout = () => {
  return (
    <div>
      <header>
        <Header />
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <ActionButton />
    </div>
  );
};

export default Layout;
