const NotFound = () => {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="bg-black w-full px-10 z-10 py-4">
        <img src="/images/logo.png" className="h-6 mt-3" />
      </div>
      <div className="h-full w-full relative ">
        <img
          src="/images/lost bg.png"
          className="h-full w-full mt-[-2rem]"
        />
        <div className="text-white absolute top-[23%] left-[27%]  flex flex-col items-center">
          <div className="text-7xl font-bold mb-8">Lost your way?</div>
          <div className="text-xl">
            Sorry, we can&apost find that page, You&aposll find lots to explore on the
            home page.
          </div>
          <button className="text-black bg-white bg-opacity-100 hover:bg-opacity-80 py-2 px-5 rounded-md font-semibold text-lg mt-8">
            Netflix home
          </button>
          <div className="px-4 py-2 border-l-2 border-[#e50914] text-3xl mt-10">Error Code <span className
          ="font-semibold">NSES-404</span></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
