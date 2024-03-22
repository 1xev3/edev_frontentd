import Link from "next/link";

const Navbar = ({children}) => {

  return (
    <header className="">
      <nav className="container mx-auto p-4 px-2 md:px-10 flex justify-between items-center">
        {children}
      </nav>
    </header>
  );
};

export default Navbar;