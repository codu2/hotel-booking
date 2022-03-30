import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Contacts from "./pages/Contacts";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:5000");
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/contacts" element={<Contacts />} />
      </Route>
    </Routes>
  );
}

export default App;
