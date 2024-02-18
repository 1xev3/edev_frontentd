import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingPage({text}) {
    return (
        <div className="flex justify-center items-center h-screen text-3xl font-bold">
            <AiOutlineLoading3Quarters className="animate-spin mr-4"/>
            {text}
        </div>
    )
}