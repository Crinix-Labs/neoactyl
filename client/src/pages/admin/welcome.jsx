import React from "react";
import ThemeController from "../components/Themecontroller.jsx";
import Brandcard from "../components/Brandcard.jsx";
import Sidebar from "./sidebar.jsx";

const Admingreeting = () => {
  return (
    <>
      <section className="w-screen h-screen flex justify-center items-start ">
        <ThemeController className="" />
        <Sidebar />
        <div className="m-8">
      <Brandcard />
        </div>
      </section>
    </>
  );
};

export default Admingreeting;
