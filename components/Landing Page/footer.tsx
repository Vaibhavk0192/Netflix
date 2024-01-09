import FooterText from "./footer_text"

const FooterHome = () => {
  return (
    <footer className="block m-auto text-base font-normal mt-2 mb-8  md:pl-8 md:pr-8 md:mt-18 md:mb-18 text-white text-opacity-70 bg-black ">
      <div className="box-border w-4/5 inherit h-auto block mx-auto pt-20">
        <div className=" container inline-flex flex-wrap h-inherit mt-0 ml-0 w-full flex-row p-0 mx-auto">
          <div className="box-border inline-flex flex-wrap w-inherit p-0 flex-shrink-0 flex-grow-0 w-full">
            <div className="box-border mt-0 ml-0 block mr-3 ">
              {" "}
              Questions? Call{" "}
              <a className="underline cursor-pointer ml-1 hover:text-gray-500">
                000-090-462
              </a>
            </div>
          </div>

          <div className="box-border inline-flex flex-wrap w-inherit p-0 flex-shrink-0 flex-grow-0 w-full">
            <div className="my-3 w-full text-sm font-normal block box-border">
              <div className="wrapper w-full inherit h-auto">
                <div className="inline-flex h-inherit w-full flex-wrap flex-row  ">
                  <FooterText text="FAQ"/>
                  <FooterText text="Help Center"/>
                  <FooterText text="Account"/>
                  <FooterText text="Media Centre"/>
                  <FooterText text="Invester Relations"/>
                  <FooterText text="Jobs"/>
                  <FooterText text="Ways to Watch"/>
                  <FooterText text="Terms of Use"/>
                  <FooterText text="Privacy"/>
                  <FooterText text="Cookie Preferences"/>
                  <FooterText text="Contact Us"/>
                  <FooterText text="Corporate Information"/>
                  <FooterText text="Speed Test"/>
                  <FooterText text="Legal Notices"/>
                  <FooterText text="Only on Netflix"/>
                  
                </div>
              </div>
            </div>
          </div>

          <div className="box-border inline-flex flex-wrap w-inherit p-0 flex-shrink-0 flex-grow-0 w-full">
            <div className="box-border mt-8 ml-0 block mr-3 mb-20">
             Netflix India
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default FooterHome;
