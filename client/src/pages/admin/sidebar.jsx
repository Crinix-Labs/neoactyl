import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="z-100">
      <button className="md:hidden p-4" onClick={toggleSidebar}>
        {isOpen ? "Close" : "Open"} Menu
      </button>
      <div
        className={`fixed inset-0 bg-base-200 text-base-content h-screen p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64`}>
        <div className="flex items-center justify-center">
        <div className="card bg-base-300 self-center">
            <div className="card-body flex flex-row items-center">

          <img src="https://placehold.co/64" alt="" className="rounded-box"/>
          <h1 className="card-title	">Crinix Cloud</h1>
            </div>
        </div>
        </div>
        <ul className="menu bg-base-200 rounded-box w-56">
          <li>
            <details open>
              <summary>Parent</summary>
              <ul>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
                <li></li>
              </ul>
            </details>
            <details open>
              <summary>Parent</summary>
              <ul>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
            <details open>
              <summary>Parent</summary>
              <ul>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
