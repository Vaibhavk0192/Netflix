const Feature4 = () => {
  return (
    <div className="h-[80%] mb-2">
      <div className="relative flex justify-center w-full h-full box-border min-h-auto bg-black lg:py-0 sm:py-6">
        <div className="flex items-center w-4/5 min-h-auto lg:flex-row sm:flex-col lg:justify-center">
          <div className="box-border basis-1/2 lg:mr-4 lg:h-auto sm:h-2/3 lg:mb-0 sm:mb-5" >
            <img src="/images/feature4.png"/>
          </div>
          <div className="box-border basis-1/2 flex flex-col h-auto text-white">
          <span className="lg:text-[2.85rem] font-black lg:text-left mb-4 sm:text-3xl sm:text-center">Create profiles for kids</span>
          <span className="text-[1.35rem] font-medium lg:text-left  sm:text-center">Send children on adventures with their favourite characters in a space made just for them—free with your membership.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature4;
