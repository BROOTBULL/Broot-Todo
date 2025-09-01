"use client";
import { motion } from "framer-motion";

export default function HowToUse() {
  return (
    <>
      <div className="flex flex-col gap-10 max-w-270 md:max-w-400 justify-center justify-self-center my-24 text-start md:text-center px-5 ">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeIn" }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row h-fit lg:h-100 gap-5 lg:gap-8 items-center"
        >
          <div className="text-3xl lg:text-4xl  max-w-150 text-indigo-400/70 font-bold lg:flex-1 self-center text-shadow-lg/80">
            Capture tasks at the speed of thought
            <div className="text-lg text-slate-300 font-normal lg:px-10 m-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>

          <div className="h-80 w-100 sm:w-150 sm:h-100 lg:h-100 lg:w-130 bg-no-repeat bg-cover rounded-lg drop-shadow-2xl bg-[url(/media/howtouse/addtask.png)] lg:flex-1" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeIn" }}
          viewport={{ once: true }}
          className="flex flex-col-reverse lg:flex-row h-fit lg:h-100 gap-5 lg:gap-8 items-center"
        >
          <div className="h-80 w-100 sm:w-150 sm:h-100 lg:lg:h-100 lg:w-130 bg-no-repeat bg-cover bg-center rounded-lg drop-shadow-2xl bg-[url(/media/howtouse/editsection.png)] lg:flex-1" />

          <div className="text-3xl lg:text-4xl  max-w-150 text-indigo-400/70 font-bold lg:flex-1 self-center text-shadow-lg/80">
            Arrange your tasks in sections
            <div className="text-lg text-slate-300 font-normal lg:px-10 m-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore exercitation
              laborum.
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeIn" }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row h-fit lg:h-100 gap-5 lg:gap-8 items-center"
        >
          <div className="text-3xl lg:text-4xl w-full max-w-150 text-indigo-400/70 font-bold lg:flex-1 self-center text-shadow-lg/80">
            Stay uptodate about your tasks
            <div className="text-lg text-slate-300 font-normal lg:px-10 m-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut
            </div>
          </div>
          <div className="h-80 w-100 sm:w-150 sm:h-100 lg:h-100 lg:w-130 bg-no-repeat bg-cover rounded-lg drop-shadow-2xl bg-[url(/media/howtouse/project.png)] lg:flex-1" />
        </motion.div>
      </div>
    </>
  );
}
