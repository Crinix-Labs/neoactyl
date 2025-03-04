import { useState } from "react";
import ThemeController from "./pages/components/Themecontroller";

function App() {
  return (
    <div className="flex justify-center content-center items-center w-100vw h-100vh">
      <ThemeController />
      <div className=" m-24 ">
        <h1 className="text-4xl m-4">Lunix-x Dash Routes</h1>

        <ul className="list bg-base-100 rounded-box shadow-md">

          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Total Routes</li>

          <li className="list-row">

              <div>
                <div>Login Page </div>
                <div className="text-xs font-semibold opacity-60">/auth</div>
              </div>
              <button className="btn btn-square btn-ghost" herf="/auth">
                <a target="_blank" href="/auth">

                  <svg xmlns="http://www.w3.org/2000/svg" className="size-[1.2em]" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
                  </svg>
                </a>
              </button>
          </li>

          <li className="list-row">

              <div>
                <div>404</div>
                <div className="text-xs font-semibold opacity-60">404 : Page Not Found</div>
              </div>
              <button className="btn btn-square btn-ghost" herf="/404">
                <a target="_blank" href="/404">

                  <svg xmlns="http://www.w3.org/2000/svg" className="size-[1.2em]" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
                  </svg>
                </a>
              </button>
          </li>

          <li className="list-row">

              <div>
                <div>Admin Greeting Page</div>
                <div className="text-xs font-semibold opacity-60">/admin/greeting</div>
              </div>
              <button className="btn btn-square btn-ghost" herf="/admind/greeting">
                <a target="_blank" href="/admin/greeting">

                  <svg xmlns="http://www.w3.org/2000/svg" className="size-[1.2em]" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
                  </svg>
                </a>
              </button>
          </li>

        </ul>
      </div>

    </div>
  );
}

export default App;
