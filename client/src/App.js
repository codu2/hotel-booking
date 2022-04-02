import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import axios from "axios";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Contacts from "./pages/Contacts";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("http://localhost:5000");
  }, []);

  useEffect(async () => {
    const fetchBooked = await axios.get("http://localhost:8080/booked");

    try {
      dispatch({
        type: "SUCCESS",
        payload: fetchBooked.data,
      });
    } catch (err) {
      console.log(err);
    }
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
