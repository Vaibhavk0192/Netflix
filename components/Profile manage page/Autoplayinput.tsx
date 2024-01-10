import {AiOutlineCheck } from "react-icons/ai";
import {useState} from "react"
interface autoInputprops{
    text:string
}
const AutoplayInput:React.FC<autoInputprops> = ({text}) => {
    const [isClicked, setisClicked] = useState(true)

    const toggleClick=()=>{
        setisClicked((prev)=>!prev)
    }


    return ( <div className="flex items-center text-sm mb-2">
    <div className="flex justify-center items-center transition border border-[#232323] mr-2 w-8 h-8" onClick={toggleClick}>{isClicked?<AiOutlineCheck className="text-[#c0cccc] size-8"/>:null}</div>
    <span className="text-white text-sm">{text}</span>
    </div> );
}
 
export default AutoplayInput;