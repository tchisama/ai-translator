import { useStore } from "../../store/core"
import { ArrowRight } from "lucide-react"

function Controlers() {
  const { userCountry, toCountry } = useStore()

  return (
    <div className="container flex h-60 bg-[#282A3C66] border backdrop:blur-lg border-[#3a3d4f] text-white w-full gap-2 absolute rounded-lg p-2 bottom-4 left-[50%] translate-x-[-50%] z-50">
        <div className="h-full flex flex-col flex-1">
            <div className="flex py-2 gap-4">
                <h1 className="text-lg font-medium px-2">{userCountry}</h1>
            </div>
            <textarea className=" bg-[#282A3C88] w-full border border-[#3a3d4f] flex-1 text-white rounded-lg outline-none p-4 text-4xl font-medium "></textarea>
        </div>
        <div className="w-12 flex items-center justify-center mt-8">
            <button className="bg-red-400 flex justify-center items-center w-12 h-12 scale-[1.15] rounded-full "><ArrowRight/></button>
        </div>
        <div className="h-full flex flex-col flex-1">
            <div className="flex py-2 gap-4">
                <h1 className="text-lg font-medium px-2">{toCountry}</h1>
            </div>
            <div className=" bg-[#282A3C88] w-full flex-1 rounded-lg border border-[#3a3d4f] outline-none p-4 text-4xl font-medium text-gray-700"></div>
        </div>
    </div>
  )
}

export default Controlers