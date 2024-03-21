import { RxAvatar } from "react-icons/rx";

export default function Nav(){
    return(
        <div>
            <nav className="flex flex-row justify-between items-center px-6 border-b-[0.8px] border-zinc-700 py-3">
                <h2 className="font-bold text-2xl">AXO</h2>

                <div className="flex justify-center items-center gap-x-3">
                    <ul className="flex flex-row gap-x-5">
                        <li className="text-sm">Home</li>
                        <li className="text-sm">Album</li>
                        <li className="text-sm">Messages</li>
                    </ul>
                    <RxAvatar fontSize={30} className="cursor-pointer"/>
                </div>
            </nav>
        </div>
    )
}