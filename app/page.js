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
            {/* <a className="text-gray-300 hover:text-white">Docs</a> */}
            <Link className="p-2 px-8 rounded-full text-black bg-green-500 hover:bg-green-400 font-bold" href="/dashboard">Client area</Link>
        </div>
      </Navbar>

      <div className="container mx-auto p-4 px-2 w-full md:px-10 mt-20">
        <div className="container w-full md:w-1/2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-lg">
          <p className="text-2xl p-2 text-center w-full border-b border-zinc-700">About!</p>
          <p className="text-xl p-4"> lorem 123 glgoasogj tjj impsum agsagkkt derivatv</p>
        </div>
      </div>

    </main>
  );
};

export default DefaultPage;