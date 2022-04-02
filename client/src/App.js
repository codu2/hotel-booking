import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Contacts from "./pages/Contacts";
import { bookActions } from "./store/book-slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchBooked = await axios.get("http://localhost:8080/booked");
        dispatch(bookActions.getBooked(fetchBooked.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [dispatch]);

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
