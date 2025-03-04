import React from "react";
import Themecontroller from "./components/Themecontroller";

const Loginform = () => {
  return (
    <div>
      <Themecontroller />
      <section className="flex text-sm p-16 items-center justify-center h-screen w-screen bg-cover bg-[url('https://i.redd.it/1vuo8te7j2c31.gif')]">
        {/* Login Page */}

        <div className="flex items-center justify-center h-screen w-[50vw] ">
          <div className=" flex mockup-window bg-base-300 min-w-[35vw] min-h-[60vh]">
            <h1 className="text-3xl neutral-content self-center ">
              Login To Lunix-x Dash
            </h1>
            <div className=" flex flex-col items-center px-4 ">
              <div className="divider"></div>
              {/* Email Section */}
              <form action="" herf="/api/login" className="w-[80%] flex flex-col" method="post">
                <h1 className="text-sm mb-2 pt-4">
                  Enter Your Email Or Username
                </h1>
                <label className="input input-bordered flex items-center w-[100%]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-4 w-4 fill-current mr-2"
                  >
                    <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="lunix@crinix.cloud"
                  />
                </label>
                {/* Password Section */}
                <h1 className="text-sm mb-2 pt-4">Enter Your Password</h1>
                <label className=" input input-bordered flex items-center w-[100%]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-4 w-4 fill-current mr-2"
                  >
                    <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
                  </svg>
                  <input
                    type="password"
                    className="grow"
                    placeholder="********"
                  />
                </label>
                <button
                  className="btn btn-soft btn-outline w-[100%] my-8 self-center"
                  method="post"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 left-8 rounded-lg glass w-auto h-auto py-2 pl-2 pr-8">
          <a className="link link-hover flex-row flex items-center " href="https://google.com" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" height="12" className="mr-2" viewBox="0 0 512 512"><path d="M64 48C37.5 48 16 69.5 16 96l0 64c0 26.5 21.5 48 48 48l384 0c26.5 0 48-21.5 48-48l0-64c0-26.5-21.5-48-48-48L64 48zM0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64L64 224c-35.3 0-64-28.7-64-64L0 96zM64 304c-26.5 0-48 21.5-48 48l0 64c0 26.5 21.5 48 48 48l384 0c26.5 0 48-21.5 48-48l0-64c0-26.5-21.5-48-48-48L64 304zM0 352c0-35.3 28.7-64 64-64l384 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64l0-64zm336 32a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zm16-272a16 16 0 1 1 0 32 16 16 0 1 1 0-32zm48 272a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zm16-272a16 16 0 1 1 0 32 16 16 0 1 1 0-32z"/></svg>
            Hosting Support Server</a>
          <br />
          <a className="link link-hover flex-row flex items-center" href="https://google.com" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" height="12" className="mr-2" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256l0 40c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-40C0 114.6 114.6 0 256 0S512 114.6 512 256l0 144.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24l-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40L464 256c0-114.9-93.1-208-208-208zM144 208l16 0c17.7 0 32 14.3 32 32l0 112c0 17.7-14.3 32-32 32l-16 0c-35.3 0-64-28.7-64-64l0-48c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64l0 48c0 35.3-28.7 64-64 64l-16 0c-17.7 0-32-14.3-32-32l0-112c0-17.7 14.3-32 32-32l16 0z"/></svg>
            Panel Support Server</a>
          <br />

          <a className="link link-hover flex-row flex items-center " href="https://google.com" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" height="12" className="mr-2" viewBox="0 0 512 512"><path d="M256 0c53 0 96 43 96 96l0 3.6c0 15.7-12.7 28.4-28.4 28.4l-135.1 0c-15.7 0-28.4-12.7-28.4-28.4l0-3.6c0-53 43-96 96-96zM41.4 105.4c12.5-12.5 32.8-12.5 45.3 0l64 64c.7 .7 1.3 1.4 1.9 2.1c14.2-7.3 30.4-11.4 47.5-11.4l112 0c17.1 0 33.2 4.1 47.5 11.4c.6-.7 1.2-1.4 1.9-2.1l64-64c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-64 64c-.7 .7-1.4 1.3-2.1 1.9c6.2 12 10.1 25.3 11.1 39.5l64.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c0 24.6-5.5 47.8-15.4 68.6c2.2 1.3 4.2 2.9 6 4.8l64 64c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-63.1-63.1c-24.5 21.8-55.8 36.2-90.3 39.6L272 240c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 239.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l64-64c1.9-1.9 3.9-3.4 6-4.8C101.5 367.8 96 344.6 96 320l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64.3 0c1.1-14.1 5-27.5 11.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8 0-45.3z" /></svg>
            Found a Bug? </a>
        </div>
      </section>
    </div>
  );
};

export default Loginform;
