import Link from "next/link";

const Navbar = () => {
  return (
    <header className="">
      <nav className="container mx-auto p-4 px-2 md:px-10 flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-2xl">edev</Link>
        <ul className="flex space-x-4">
          <li>
            <a className="text-gray-300 hover:text-white">Docs</a>
          </li>
          <li>
            <Link className="p-2 px-8 rounded-full text-black bg-green-400 hover:bg-green-500" href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;