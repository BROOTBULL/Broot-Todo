"use client";
import {motion} from "framer-motion"
export default function Reviews(){

    return(<>
        <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeIn" }}
        viewport={{ once: true }}
        className="md:flex flex-row items-center h-100 my-28 hidden xl:px-20"
      >
        <div className="w-full h-100 absolute -z-1 bg-[url(/media/hero/reviewBG.png)] bg-center bg-contian opacity-20 bg-no-repeat z-1"/>
        <div className="flex flex-col items-center justify-center flex-1 text-xl p-8 text-center">
          “Simple, straightforward, and super powerful”
          <div className="font-bold m-1">THE VERGE</div>
        </div>
        <div className="h-50 w-1 bg-indigo-600/10 rounded-full"/>
        <div className="flex flex-col items-center justify-center flex-1 text-xl p-8 text-center">
          “Simply a joy to use”
          <div className="font-bold m-1">TECH REDAR</div>
        </div>
        <div className="h-50 w-1 bg-indigo-600/10 rounded-full"/>
        <div className="flex flex-col items-center justify-center flex-1 text-xl p-8 text-center">
          “The best to-do list app on the market”
          <div className="font-bold m-1">WIRECUTTER</div>
        </div>
        <div className="h-50 w-1 bg-indigo-600/10 rounded-full"/>
        <div className="flex flex-col items-center justify-center flex-1 text-xl p-8 text-center">
          “Nothing short of stellar”
          <div className="font-bold m-1">PAC MAG</div>
        </div>
      </motion.div>
      </>)
}