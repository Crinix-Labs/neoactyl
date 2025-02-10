import { Button } from "../components/ui/button"


const Home = () => (
  <div className="h-screen flex justify-center items-center">
    <div className=' block justify-center items-center bg-slate-400 mt-15 pt-15 m-15 p-10 rounded-sm'>
      <h1 className='text-white text-[26px] justify-center align-top mb-20 px-2 py-2'>Welcome</h1>
      <Button variant="outline">Login With Discord</Button>
    </div>
  </div>
);

export default Home;