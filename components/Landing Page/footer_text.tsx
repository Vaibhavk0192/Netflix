interface Footertext{
    text:string
}

const FooterText:React.FC<Footertext> = ({text}) => {
    return (<div className="inline-flex flex-wrap w-inherit p-0 mt-4 lg:basis-1/4 underline md:basis-1/3 max-md:basis-1/2 cursor-pointer ">
    <span className=" hover:text-gray-500" >{text}</span>
  </div>);
}
 
export default FooterText;