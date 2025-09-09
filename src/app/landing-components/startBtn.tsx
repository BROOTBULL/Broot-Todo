"use client";
import { useRouter } from "next/navigation";
export default function StartBtn(){
      const router = useRouter();
    return(<>
          <div className="font-bold text-xl md:text-4xl text-center flex flex-col justify-center items-center my-15 lg:my-28 md:px-15 px-5">
        <div className="max-w-200 text-shadow-lg/80 m-4 text-shadow-[0_0_15px_rgb(100_100_230_/0.8)]">Gain calmness and clarity with the world’s most beloved productivity app</div>
        <div
          onClick={() => router.push("/signUp")}
          className="lg:p-6 lg:py-4 py-2 px-3 m-3 text-base lg:text-lg rounded-lg hover:from-slate-800 hover:to-indigo-900 drop-shadow-[0_0_15px_rgb(100_100_230_/0.4)] cursor-pointer duration-300 bg-linear-to-br from-indigo-900 to-indigo-700 "
        >
          Start for free
        </div>
      </div>
      </>)
}