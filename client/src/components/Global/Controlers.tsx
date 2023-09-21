import { useEffect} from "react"
import { useStore } from "../../store/core"
import { ArrowRight } from "lucide-react"
import axios from "axios"

function Controlers() {
  const { userCountry, toCountry , toCountryText,userCountryText ,setToCountryText,setUserCountryText} = useStore()

  useEffect(() => {
        if (userCountryText && toCountry && userCountry) {
            handleSubmit()
        }
  }, [toCountry])
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/translate', 
      {
        "from_country":userCountry,
        "to_country":toCountry,
        "input_text": userCountryText
      }
      );
      console.log(response.data)
      setToCountryText(response.data)
      
      // Clear the form
    } catch (error) {
      // Handle any errors that occurred during the POST request
      console.error('Error:', error);
    }
  };

  return (
    <div className="container flex h-60 bg-[#282a3c8c] border backdrop:blur-lg border-[#37394f] text-white w-full gap-2 absolute rounded-lg p-2 bottom-4 left-[50%] translate-x-[-50%] z-50">
        <div className="h-full flex flex-col flex-1">
            <div className="flex py-2 gap-4">
                <h1 className="text-lg font-medium px-2">{userCountry}</h1>
            </div>
            <textarea value={userCountryText} onInput={(e)=>setUserCountryText((e.target as any).value)}  className=" bg-[#282A3C88] w-full border border-[#3a3d4f] flex-1 text-white rounded-lg outline-none p-4 text-4xl font-medium "></textarea>
        </div>
        <div className="w-12 flex items-center justify-center mt-8">
            <button onClick={handleSubmit} className="bg-red-400 flex justify-center items-center w-12 h-12 scale-[1.15] rounded-2xl "><ArrowRight/></button>
        </div>
        <div className="h-full flex flex-col flex-1">
            <div className="flex py-2 gap-4">
                <h1 className="text-lg font-medium px-2">{toCountry}</h1>
            </div>
            <div className=" bg-[#282A3C88] w-full flex-1 rounded-lg border border-[#3a3d4f] outline-none p-4 text-4xl font-medium text-white">
                {toCountryText}
            </div>
        </div>
    </div>
  )
}

export default Controlers