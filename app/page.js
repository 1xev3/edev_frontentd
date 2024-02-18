import Navbar from "./ui/navbar";
import Link from "next/link";

const DefaultPage = () => {
  return (
    <main>
      <Navbar>
        <a href="/" className="flex text-white font-bold text-2xl items-center">
            edev
            <p className="text-gray-500 pl-2 font-light">docs</p>
        </a>
        <div className="flex space-x-4 items-center">
            <a className="text-gray-300 hover:text-white">Docs</a>
            <Link className="p-2 px-8 rounded-full text-black bg-green-400 hover:bg-green-500" href="/dashboard">Dashboard</Link>
        </div>
      </Navbar>

      <div className="container mx-auto p-4 px-2 w-full md:px-10 mt-20">
        <div className="container w-full md:w-1/2">
          <p className="text-4xl p-4 text-center">Build your docs easily!</p>
          <p className="text-2xl p-4">Next generation docs generator</p>
        </div>
      </div>

    </main>
  );
};

export default DefaultPage;