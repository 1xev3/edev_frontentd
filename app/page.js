import Navbar from "./ui/navbar";

const DefaultPage = () => {
  return (
    <main>
      <Navbar />

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