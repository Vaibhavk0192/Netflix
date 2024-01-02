import HDIcon from "./HD";
import Tag from "./Tag"

interface MovieDescProps{
    tag: string,
    duration:string
}

const MovieDesc :React.FC<MovieDescProps>= ({tag,duration}) => {
    return ( <div className="flex flex-wrap mt-6 w-full gap-2 items-center">
    <span className="text-green-400 font-semibold lg:text-[15px] sm:text-[px]">
      97% Match
    </span>
    <Tag tag={tag}/>
    <span className="text-white text-[10px] lg:text-sm">
      {duration}
    </span>
    <HDIcon />
  </div> );
}
 
export default MovieDesc;