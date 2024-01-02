interface TagProps{
    tag:string;
}

const Tag:React.FC<TagProps> = ({tag}) => {
    return ( <div className="text-white lg:text-sm border border-gray-500 px-1.5 border-x-white sm:text-[0.5rem] md:text-[0.7rem]">{tag}</div> );
}
 
export default Tag;