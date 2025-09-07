"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTodoStore } from "../utils/store/todo.store";
import { signOut, useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

const Hader = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className=" flex flex-row items-center p-3 md:p-8 z-2"
    >
      <div className="flex flex-row items-end">
        <Image
          src="/media/BrootW.png"
          className="w-7 h-10 md:w-12 md:h-16 drop-shadow-lg/80"
          alt="Logo"
          width={40}
          height={40}
        />
        <div
          className="cursor-pointer text-lg md:text-3xl font-bold mx-2 text-shadow-lg/80"
          onClick={() => router.push("/")}
        >
          TodoList
        </div>
      </div>

      <div className="hidden md:flex flex-row ml-auto gap-2 items-center text-sm z-2">
        <div className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 cursor-pointer duration-200">
          Feautres
        </div>
        <div className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 cursor-pointer duration-200">
          About
        </div>
        <div className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 cursor-pointer duration-200">
          Contact us
        </div>
        <div className="h-10 w-0.5 rounded-4xl bg-slate-600" />
        {session?.user ? (
          <div className="flex flex-row items-center gap-2 mx-2">
            <div className="text-slate-100 font-bold cursor-pointer">
              {session.user.name}
            </div>
            <Image
              src={session?.user?.image || "/media/user.png"} // fallback if no image
              className="size-10 bg-slate-950 rounded-md p-0.5"
              alt="User Avatar"
              width={40}
              height={40}
            />
          </div>
        ) : (
          <div className="flex flex-row items-center">
            <div
              onClick={() => router.push("/login")}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 cursor-pointer duration-200"
            >
              Log In
            </div>
            <div
              onClick={() => router.push("/signUp")}
              className="p-2 py-3 rounded-lg hover:from-slate-800 hover:to-indigo-900 cursor-pointer duration-300 bg-linear-to-br from-slate-900 to-indigo-950 "
            >
              Start for free
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
export default Hader;

export const HomeHader = () => {
  const setAddBox = useTodoStore((state) => state.setAddBox);
  const setNavOpen = useTodoStore((state) => state.setNavOpen);
  const navOpen = useTodoStore((state) => state.navOpen);
  const loading = useTodoStore((state) => state.loading);
  const setActiveView = useTodoStore((state) => state.setActiveView);
  const activeView = useTodoStore((state) => state.activeView);
  const projectData = useTodoStore((state) => state.projectData);
  const setActiveProject = useTodoStore((state) => state.setActiveProject);
  const activeProject = useTodoStore((state) => state.activeProject);
  const InboxProject = projectData.find((project) => project.isInbox === true);

  const { data: session } = useSession();

  const [profileOpen, setProfilOpen] = useState(false);
  const getProjects = useTodoStore((state) => state.getProjects);

  async function handleDelete(projectId: string) {
    try {
      const deleteResponse = await axios.delete("/api/projects", {
        data: { projectId },
      });
      await getProjects();
      console.log(deleteResponse.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Image
        src="/media/navButton.png"
        onClick={() => setNavOpen(!navOpen)}
        className="size-7 ml-auto hover:bg-slate-800 rounded-md cursor-pointer fixed left-1 mt-5 z-100 "
        alt="Logo"
        width={40}
        height={40}
      />
      <div
        className={`fixed h-full ${
          navOpen ? "max-w-100 opacity-100" : "max-w-0 opacity-0"
        } w-[280px] overflow-x-hidden overflow-y-auto custom-scroll-d scroll-smooth duration-200 border-r-1 border-gray-800/60 bg-gray-950 rounded-r-2xl left-0 drop-shadow-2xl/80 md:drop-shadow-none z-101`}
      >
        <div className="w-full h-full flex p-2 flex-col">
          <div className="h-fit w-full flex flex-row items-center mb-5">
            <Image
              src="/media/BrootW.png"
              className="w-7 h-10 md:w-7 md:h-10 drop-shadow-sm/80"
              alt="Logo"
              width={40}
              height={40}
            />
            <Image
              src="/media/navButton.png"
              onClick={() => setNavOpen(!navOpen)}
              className="size-7 ml-auto hover:bg-slate-800 rounded-md cursor-pointer"
              alt="Logo"
              width={40}
              height={40}
            />
          </div>

          <div className="h-fit w-full flex flex-row items-center">
            <div
              onClick={() => setProfilOpen(!profileOpen)}
              className=" duration-200 cursor-pointer hover:bg-slate-500/10 w-50 rounded-md h-10 flex items-center flex-row p-1 gap-1 text-[13px] md:text-sm font-bold tracking-wider text-slate-300"
            ><div className="bg-gray-800 rounded-lg p-1">
              
              <Image
                src={session?.user?.image || "/media/user.png"} // fallback if no image
                className="size-7 bg-slate-950 rounded-md p-0.5"
                alt="User Avatar"
                width={40}
                height={40}
              />
            </div>
              {session ? session.user?.name?.slice(0, 11) : "Username"}
              <Image
                src="/media/dropDown.png"
                className={`${
                  profileOpen ? "rotate-180" : ""
                } duration-200 size-7 p-0.5 ml-auto`}
                alt="Logo"
                width={40}
                height={40}
              />
              <div
                className={`bg-slate-800 absolute w-40 left-30 h-fit ${
                  profileOpen ? "max-h-100" : "max-h-0"
                } top-28 rounded-md z-112 drop-shadow-lg/60 flex-row flex duration-200 overflow-hidden`}
              >
                <button
                  onClick={() => signOut()}
                  className=" flex items-center pl-4 h-8 md:h-10 w-full md:text-sm text-[12px] flex-row p-2 rounded-md text-rose-400 font-bold hover:bg-slate-900 cursor-pointer justify-between"
                >
                  Logout
                  <Image
                    src="/media/logoutR.png"
                    className="size-5 md:size-7"
                    alt="Logo"
                    width={40}
                    height={40}
                  />
                </button>
              </div>
            </div>

            <div className="ml-auto">
              <div
                className={`hidden bg-red-400 size-2 absolute rounded-full ml-5`}
              />
              <Image
                src="/media/bell.png"
                className="size-7 p-0.5 "
                alt="Logo"
                width={40}
                height={40}
              />
            </div>
          </div>

          <div className="h-fit w-full flex flex-col gap-2 items-center mt-5 md:mt-8 mb-3 md:mb-5 text-[13px] ">
            <div
              onClick={() => setAddBox("task")}
              className="h-8 md:h-10 w-full rounded-sm md:rounded-md bg-rose-800/10 border-1 border-rose-800/40 hover:bg-rose-800/20 cursor-pointer duration-200 flex flex-row items-center p-2 pl-3 gap-1"
            >
              <div className="text-rose-400/90 font-semibold text-nowrap">Add Task</div>
              <Image
                src="/media/addTaskR.png"
                className="size-7 p-0.5 opacity-70 ml-auto"
                alt="Logo"
                width={40}
                height={40}
              />
            </div>

            <button
              onClick={() => {
                setActiveView("search");
                setNavOpen(false);
              }}
              className={` ${activeView==="search"?"bg-slate-900":""} h-8 md:h-10 w-full rounded-sm md:rounded-md hover:bg-slate-800/50 cursor-pointer duration-200 p-1 flex flex-row items-center gap-1`}         >
              <Image
                src="/media/search.png"
                className="size-7 p-0.5 "
                alt="Logo"
                width={40}
                height={40}
              />
              <div className="text-slate-400 text-nowrap">Search</div>
            </button>
            <button
              onClick={() => {
                setActiveView("inbox");
                setActiveProject(InboxProject!);
                setNavOpen(false);
              }}
              className={` ${activeView==="inbox"?"bg-slate-900":""} h-8 md:h-10 w-full rounded-sm md:rounded-md hover:bg-slate-800/50 cursor-pointer duration-200 p-1 flex flex-row items-center gap-1`}         >
              <Image
                src="/media/inbox.png"
                className="size-7 p-0.5 "
                alt="Logo"
                width={40}
                height={40}
              />
              <div className="text-slate-400 text-nowrap">Inbox</div>
            </button>
            <button
              onClick={() => {
                setActiveView("assistant");
                setNavOpen(false);
              }}
              className={` ${activeView==="assistant"?"bg-slate-900":""} h-8 md:h-10 w-full rounded-sm md:rounded-md hover:bg-slate-800/50 cursor-pointer duration-200 p-1 flex flex-row items-center gap-1`}         >
              <Image
                src="/media/assistant.png"
                className="size-7 p-0.5 "
                alt="Logo"
                width={40}
                height={40}
              />
              <div className="text-slate-400 text-nowrap" >AI Assistant</div>
            </button>
            <button
              onClick={() => {
                setActiveView("today");
                setNavOpen(false);
              }}
              className={` ${activeView==="today"?"bg-slate-900":""} h-8 md:h-10 w-full rounded-sm md:rounded-md hover:bg-slate-800/50 cursor-pointer duration-200 p-1 flex flex-row items-center gap-1`}         >
              <Image
                src="/media/calander.png"
                className="size-7 p-0.5 "
                alt="Logo"
                width={40}
                height={40}
              />
              <div className="text-slate-400 text-nowrap" >Today</div>
            </button>
          </div>


          <div className="h-fit w-full flex flex-col gap-1 items-center my-3 md:my-5 text-[13px] pb-20 ">
            <button
              onClick={() => setAddBox("project")}
              className=" h-8 md:h-10 w-full rounded-sm md:rounded-md bg-rose-800/10 border-1 border-rose-800/40 hover:bg-rose-800/20 cursor-pointer duration-200 flex flex-row items-center p-2 pl-3 gap-1"
            >
              <div className="text-rose-400/90 font-semibold text-nowrap">Add Project</div>
              <Image
                src="/media/addTaskR.png"
                className="size-7 p-0.5 opacity-70 ml-auto"
                alt="Logo"
                width={40}
                height={40}
              />
            </button>
            {projectData.length > 0 ? (
              projectData
                .filter((project) => !project.isInbox)
                .map((project, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setActiveView("project");
                        setActiveProject(project);
                      }}
                      className={`${activeProject._id===project._id?"bg-rose-800/10 text-rose-400/90":""} group h-8 md:h-10 w-full rounded-sm md:rounded-md hover:bg-slate-800/50 cursor-pointer duration-200 p-1 flex flex-row items-center gap-1 `}
                    >
                      <Image
                        src={`${activeProject._id===project._id?"/media/hashtagR.png":"/media/hashtag.png"}`}
                        className="size-7 p-0.5 "
                        alt="Logo"
                        width={40}
                        height={40}
                      />
                      <div className={`${activeProject._id===project._id?" text-rose-400/80":"text-slate-400"} text-nowrap overflow-hidden`}>{project.title.length>30?project.title.slice(0,30)+"...":project.title}</div>
                      <button
                        className="size-7 ml-auto cursor-pointer"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(project._id);
                        }}
                      >
                        <Image
                          src="/media/delete.png"
                          className="size-7 img p-1 opacity-20 lg:opacity-0 lg:group-hover:opacity-20 lg:hover:opacity-100 transition duration-200"
                          alt="Logo"
                          width={40}
                          height={40}
                        />
                      </button>
                    </div>
                  );
                })
            ) : (
              <>
                <Skeleton
                  height={30}
                  width={260}
                  baseColor="#334155"
                  highlightColor="#475569"
                  borderRadius={4}
                />
                <Skeleton
                  height={30}
                  width={260}
                  baseColor="#334155"
                  highlightColor="#475569"
                  borderRadius={4}
                />
                <Skeleton
                  height={30}
                  width={260}
                  baseColor="#334155"
                  highlightColor="#475569"
                  borderRadius={4}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
