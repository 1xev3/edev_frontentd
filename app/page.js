import Navbar from "./ui/basic/navbar";

import Link from "next/link";

const DefaultPage = () => {
  return (
    <main>
      <Navbar>
        <Link href="/" className="flex text-white font-bold text-2xl items-center">
            edev
            <p className="text-gray-500 pl-2 font-light">front</p>
        </Link>
        <div className="flex space-x-4 items-center">
            <Link className="p-2 px-8 rounded-full font-bold hover:grad_text" href="/dashboard">
              TODO
            </Link>
        </div>
      </Navbar>

      <div className="container mx-auto p-4 px-2 w-full md:px-10 mt-40">
        <div className="container w-full md:w-1/2">
          <h1 className="text-5xl font-bold p-2 grad_text">WELCOME, FRIEND</h1>
          <p className="text-xl p-4">Welcome to my development site</p>
        </div>
      </div>

    </main>
  );
};

export default DefaultPage;