import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./Category.css";
import Recommend from "./Recommend";

const Category = ({ tab, setTab }) => {
  return (
    <>
      <div className="category">
        <ul className="category__container">
          <li className={tab === 0 ? "active" : null} onClick={() => setTab(0)}>
            ocean view
          </li>
          <li className={tab === 1 ? "active" : null} onClick={() => setTab(1)}>
            city view
          </li>
          <li className={tab === 2 ? "active" : null} onClick={() => setTab(2)}>
            mountain view
          </li>
        </ul>
      </div>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={tab ? tab : "empty"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Recommend tab={tab} setTab={setTab} />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Category;
