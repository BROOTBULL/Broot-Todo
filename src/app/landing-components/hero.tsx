"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image"; 


export default function Hero() {
  const router = useRouter();

  return (
    <div className="py-16 flex md:flex-row flex-col justify-center md:mb-16 overflow-hidden items-center z-2">

      <div className=" w-full xl:max-w-[1350px] h-80 md:h-120 flex flex-row items-center md:justify-start justify-center lg:pl-16 lg:pr-8 px-10 text-center lg:text-start ">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeIn", delay: 0.5 }}
          className="font-bold lg:w-[60%] xl:w-[55%] max-w-200 absolute z-20 items-center lg:items-start flex flex-col sm:px-10"
        >
          <div className="text-5xl md:text-7xl text-shadow-lg/80 my-8">
            Turn Your{" "}
            <span className="text-indigo-800 text-nowrap">To-Dos</span> into
            Done
          </div>
          <div className="text-lg font-normal max-w-130 px-15 lg:text-sm lg:pr-20 lg:pl-0">
            Simplify life for both you and your team with the world’s #1 task
            manager and to-do list app.
          </div>
          <div
            onClick={() => {
              router.push("/signUp");
            }}
            className="px-5 py-3 my-8 md:px-3 md:py-4 text-sm md:text-lg bg-linear-to-br from-slate-800 to-indigo-900 drop-shadow-lg/60 w-fit rounded-lg md:my-2 cursor-pointer"
          >
            Start for free
          </div>
        </motion.div>

       
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeIn", delay: 0.5 }}
         className="w-full h-full hidden md:flex justify-end blur-md min-[1190px]:blur-none mt-10">
        <Image className="absolute updown1 drop-shadow-xl/60 z-3 mr-90 mt-10" src="/media/hero/1.png" alt="Logo" width={200} height={300} />
        <Image className="absolute updown4 drop-shadow-xl/60 z-4 mr-50 mt-10" src="/media/hero/2.png" alt="Logo" width={250} height={250} />
        <Image className="absolute updown3 drop-shadow-xl/60 z-5 mt-10 mr-8" src="/media/hero/3.png" alt="Logo" width={250} height={250} />
        <Image className="absolute updown7 drop-shadow-xl/60 z-3 mr-105 mt-29" src="/media/hero/4.png" alt="Logo" width={260} height={260} />
        <Image className="absolute updown5 drop-shadow-xl/60 z-7 mt-50 mr-32 " src="/media/hero/5.png" alt="Logo" width={400} height={400} />
        <Image className="absolute updown2 drop-shadow-xl/60 z-8 mt-75 mr-43" src="/media/hero/6.png" alt="Logo" width={600} height={600} />
        <Image className="absolute updown6 drop-shadow-xl/60 z-2 mr-5" src="/media/hero/8.png" alt="Logo" width={500} height={500} />
        <Image className="absolute updown drop-shadow-xl/60 z-2 mt-8 mr-3" src="/media/hero/base.png" alt="Logo" width={900} height={900} />
        <div className="absolute z-1 bg-indigo-800/10  rounded-[100%] h-140 w-[80%] blur-2xl " />
        </motion.div>
      </div>
        <div className="md:hidden w-190 h-120 flex justify-self-center bg-[url(/media/hero/floatbox2.png)] bg-contain bg-center bg-no-repeat  mask-b-from-80% mask-linear-from-30% mask-radial-to-80%"/>
    </div>
  );
}



