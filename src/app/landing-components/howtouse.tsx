"use client";
import { motion } from "framer-motion";

export default function HowToUse() {
  return (
      <div className="flex flex-col gap-5 lg:gap-25 max-w-270 md:max-w-450 justify-self-center my-5 lg:my-24 px-5">
        <motion.div
          initial={{ opacity: 0, y: 40,scale:0.8 }}
          whileInView={{ opacity: 1, y: 0,scale:1 }}
          transition={{
            type: "spring",
            stiffness: 80, 
            damping: 20, 
            delay: 0.6,
          }}
          viewport={{ once: true }}
          className="flex flex-col xl:flex-row h-fit gap-5 lg:gap-8 w-full relative justify-between"
        >
          <div className="text-lg text-start lg:text-2xl xl:text-4xl max-w-120 text-indigo-300 font-bold text-shadow-[0_0_20px_rgb(100_100_230_/0.5)]">
            Generate Projects with AI
            <div className="text-[10px] lg:text-sm text-slate-400 font-normal m-1 flex flex-col gap-0.5 lg:gap-2 lg:w-[80%]">
              <div className="my-2 text-indigo-200">
                Kickstart your productivity with the built-in AI Project
                Generator.{" "}
              </div>
              <p>
                - Just type a simple idea like “Build a portfolio website” or
                “Prepare for DSA revision”.{" "}
              </p>
              <p>
                - The AI instantly breaks it into structured tasks with
                deadlines, priorities, and categories.
              </p>
              <p>
                {" "}
                - You get a ready-made project plan without wasting time
                thinking what to do first.
              </p>
            </div>
          </div>
          <div className="h-52 w-80 sm:w-150 sm:h-100 lg:h-110 lg:w-160 self-center border-2 border-indigo-950 drop-shadow-[0_0_20px_rgb(100_100_230_/0.2)] right-0 bg-no-repeat bg-cover rounded-lg bg-[url(/media/howtouse/aiProject.png)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 ,scale:0.8}}
          whileInView={{ opacity: 1, y: 0 ,scale:1}}
          transition={{
            type: "spring",
            stiffness: 80, 
            damping: 20, 
            delay: 0.6,
          }}
          viewport={{ once: true }}
          className="flex xl:flex-row h-fit gap-5 lg:gap-8 w-full relative justify-between flex-col-reverse "
        >
          <div className="h-52 w-80 sm:w-150 sm:h-100 lg:h-110 lg:w-160 self-center border-2 border-indigo-950 drop-shadow-[0_0_20px_rgb(100_100_230_/0.2)] right-0 bg-no-repeat bg-cover rounded-lg bg-[url(/media/howtouse/addNew.png)]" />

          <div className="text-lg text-end ml-auto lg:text-2xl xl:text-4xl max-w-120 text-indigo-300 font-bold text-shadow-[0_0_20px_rgb(100_100_230_/0.5)]">
            Organize Your Tasks
            <div className="text-[10px] ml-auto lg:text-sm text-slate-400 font-normal m-1 flex flex-col gap-0.5 lg:gap-2 lg:w-[80%]">
              <div className="my-2 text-indigo-200">
                Stay on top of your day with the Task Inbox.{" "}
              </div>
              <p>- View today’s tasks at a glance.</p>
              <p>- Use the search bar to quickly find any todo.</p>
              <p>- Create new tasks and assign them to projects or sections.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 ,scale:0.8}}
          whileInView={{ opacity: 1, y: 0,scale:1 }}
          transition={{
            type: "spring",
            stiffness: 80, 
            damping: 20, 
            delay: 0.6,
          }}
          viewport={{ once: true }}
          className="flex flex-col xl:flex-row h-fit gap-5 lg:gap-8 w-full relative  justify-between"
        >
          <div className="text-lg text-start lg:text-2xl xl:text-4xl max-w-120 text-indigo-300 font-bold text-shadow-[0_0_20px_rgb(100_100_230_/0.5)]">
          Track Progress Effortlessly
            <div className="text-[10px] lg:text-sm text-slate-400 font-normal m-1 flex flex-col gap-0.5 lg:gap-2 lg:w-[80%]">
              <div className="my-2 text-indigo-200">
               Stay productive by keeping your tasks moving through clear stages: Pending → In Progress → Done.
              </div>
              <p>
                - Start every idea as Pending while you decide when to tackle it.
              </p>
              <p>
                - Switch to In Progress once you’re actively working, so you always know your current focus.
              </p>
              <p>
                - Mark as Done when completed, and enjoy the satisfaction of clearing your list.
              </p>
            </div>
          </div>
          <div className="h-52 w-80 sm:w-150 sm:h-100 lg:h-110 lg:w-160 self-center border-2 border-indigo-950 drop-shadow-[0_0_20px_rgb(100_100_230_/0.2)] right-0 bg-no-repeat bg-cover rounded-lg bg-[url(/media/howtouse/search.png)]" />
        </motion.div>
      </div>
  );
}
