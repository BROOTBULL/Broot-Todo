"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";


export default function NewHero() {
  const router = useRouter();

  return (
    <div className=" relative h-90 lg:h-150 flex md:flex-row flex-col justify-center my-10 lg:my-0 overflow-hidden z-2">
      <div className="w-full flex flex-row justify-center px-10 mb-30 text-center pb-30 pt-5 overflow-hidden">
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 80, 
            damping: 20, 
            delay: 0.5,
          }}
          className="font-bold max-w-200 absolute z-20 items-center flex flex-col "
        >
          <div className="text-4xl lg:text-7xl font-black my-2 lg:my-8 text-shadow-[0_0_100px_rgb(0_0_0_/1)]">
            Turn Your{" "}
            <span className="text-indigo-600 text-shadow-[0_0_20px_rgb(100_100_230_/0.6)] text-nowrap">
              To-Dos
            </span>{" "}
            into Done
          </div>
          <div className="text-[10px] lg:text-lg font-bold max-w-70 lg:max-w-130 text-shadow-[0_0_20px_rgb(0_0_0_/1)]">
            Simplify life for both you and your team with the world’s #1 task
            manager and to-do list app.
          </div>
          <button
            onClick={() => {
              router.push("/signUp");
            }}
            className=" px-3 py-2 lg:px-6 lg:py-4 my-3 lg:my-10  text-sm lg:text-lg bg-linear-to-br from-indigo-900 to-indigo-700 drop-shadow-[0_0_15px_rgb(100_100_230_/0.2)] w-fit rounded-lg cursor-pointer hover:drop-shadow-[0_0_15px_rgb(110_110_240_/0.4)] duration-200"
          >
            Start for free
          </button>
        </motion.div>

        {/*        
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
        </motion.div> */}

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 2, ease: "easeIn", delay: 0.5 }}
            className="absolute w-[98%] justify-self-center h-full inset-0 items-center flex justify-center overflow-hidden [perspective:800px]"
          >
            <div
              style={{
                transform: "rotateX(70deg) translateZ(-120px)", // tilt + depth
                backgroundSize: "contain",
                animation: "scroll-bg 15s linear infinite",
              }}
              className="bg-[url('/media/hero/todoList.png')] w-170 h-130 lg:w-800 lg:h-600 bg-repeat-y lg:[mask-image:linear-gradient(to_bottom,transparent_10%,black_25%,black_55%,transparent_60%)] [mask-image:linear-gradient(to_bottom,transparent_10%,black_25%,black_70%,transparent_80%)] [mask-repeat:no-repeat] [mask-size:100%_100%] opacity-50"
            ></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
