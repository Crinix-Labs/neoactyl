import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="flex text-sm p-16 items-center justify-center h-screen w-screen bg-cover bg-[url('https://i.redd.it/1vuo8te7j2c31.gif')]">

        <div className="glass p-4 rounded-lg flex flex-col justify-center items-center w-[40vw] ">
            <h1 className="text-4xl font-black p-4">404</h1>
            <h2 className="">I Guess You Lost Somewhere, Nobody Is Here ...</h2>
            <div className="flex flex-row m-8">

            <button className="btn btn-soft btn-accent m-4">
                <a href="/">Go to Dashboard</a>
            </button>
            <button className="btn btn-soft btn-accent m-4">
                <a href="/auth"> Login Page</a>
                </button>
            </div>
        </div>
    </div>
  );
}
