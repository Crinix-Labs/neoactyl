import React from 'react'
import { createRoot } from 'react-dom/client'


const Loginform = () => {
  return (
    <div>
          <section className="flex  p-16 items-center justify-center h-screen w-screen bg-cover bg-[url('https://i.redd.it/1vuo8te7j2c31.gif')]">
            {/* Login Page */}
      <div className="flex items-center justify-center h-screen w-[50vw] ">
        <div className=" flex mockup-window bg-base-300 min-w-[35vw] min-h-[60vh]">
          <h1 className="text-3xl neutral-content self-center ">
            Login To Lunix-x Dash
          </h1>
          <div className=" flex flex-col items-center px-4 ">
            <div className="divider"></div>
            {/* Email Section */}
            <form
              action=""
              herf="/api/login"
              className="w-[80%] "
              method="post"
            >
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
                className="btn btn-wide btn-outline w-[100%] my-8"
                method="post"
              >
                login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Loginform
