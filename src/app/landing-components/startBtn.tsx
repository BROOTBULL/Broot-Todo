"use client";
import { useRouter } from "next/navigation";
export default function StartBtn(){
      const router = useRouter();
    return(<>
          <div className="font-bold text-2xl md:text-4xl text-center flex flex-col justify-center items-center my-28 md:px-15 px-5">
        <div className="max-w-200 text-shadow-lg/80 m-4">Gain calmness and clarity with the world’s most beloved productivity app</div>
        <div
          onClick={() => router.push("/signUp")}
          className="p-6 py-4 m-3 text-lg rounded-lg hover:from-slate-800 hover:to-indigo-900 cursor-pointer duration-300 bg-linear-to-br from-slate-900 to-indigo-950 "
        >
          Start for free
        </div>
      </div>
      </>)
}