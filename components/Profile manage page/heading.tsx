interface headingprops{
    heading:string;
}
const Headings:React.FC<headingprops> = ({heading}) => {
    return ( <span className="mt-7 text-[#c0cccc] text-[1.25rem]">
    {heading}:
  </span> );
}
 
export default Headings;