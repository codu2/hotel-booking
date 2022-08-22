import React, { useState } from "react";

import Main from "../components/home/Main";
import Category from "../components/home/Category";

const Home = () => {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <Main />
      <Category tab={tab} setTab={setTab} />
    </div>
  );
};

export default Home;
