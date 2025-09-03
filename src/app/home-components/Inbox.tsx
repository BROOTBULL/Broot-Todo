"use client"
import Skeleton from "react-loading-skeleton";
import { useTodoStore } from "../utils/store/todo.store";
import TodoList from "./todoList";
import "react-loading-skeleton/dist/skeleton.css";
import AddTaskBox from "./addtaskBox";
import Image from "next/image";
import { useState } from "react";

export default function Inbox() {
  const projectData = useTodoStore((state) => state.projectData);
  const InboxProject = projectData.find((project) => project.isInbox === true);
  const InboxSection = InboxProject?.sections?.[0];

  const [addTaskTodoBox,setAddTaskTodoBox]=useState(false)



  return (
    <>
      <div className="text-2xl font-bold text-slate-300 mb-8 select-none">
        Inbox
      </div>
      {InboxSection ? (
        <>
          <TodoList todos={InboxSection.todos} />
          {addTaskTodoBox ? (
            <AddTaskBox setAddTaskTodoBox={setAddTaskTodoBox}/>
          ) : (
            <button
              onClick={() => setAddTaskTodoBox(true)}
              className={`w-full select-none text-[12px] md:text-sm flex-row p-1 px-2 text-slate-600 items-center bg-slate-900/20 cursor-pointer hover:bg-slate-900/70 rounded-md my-1 ${
                InboxSection ? "flex" : "hidden"
              }`}
            >
              <Image
                src="/media/closeOption.png"
                className="size-5 mr-2 mb-1 invert opacity-35"
                alt="Logo"
                width={20}
                height={20}
              />
              Add Task
            </button>
          )}
        </>
      ) : (
        <>
          <div className=" border-b-1 h-20 rounded-sm border-slate-700 p-1 px-2 flex flex-col bg-slate-900/60 mb-2">
            <div className="w-[50%] h-fit">
              <Skeleton
              height={14}
              className="w-30"
              borderRadius={2}
              baseColor="#334155"
              highlightColor="#475569"
            />
            </div>
            <div className="w-[90%] h-fit">
              <Skeleton
              height={12}
              className="w-30"
              borderRadius={2}
              baseColor="#334155"
              highlightColor="#475569"
            />
            </div>
            <div className="w-[70%] h-fit">
              <Skeleton
              height={12}
              className="w-30"
              borderRadius={2}
              baseColor="#334155"
              highlightColor="#475569"
            />
            </div>
          </div>
          <div className=" border-b-1 h-20 rounded-sm border-slate-700 p-1 px-2 flex flex-col bg-slate-900/60">
            <div className="w-[50%] h-fit">
              <Skeleton
              height={14}
              className="w-30"
              borderRadius={2}
              baseColor="#334155"
              highlightColor="#475569"
            />
            </div>
            <div className="w-[90%] h-fit">
              <Skeleton
              height={12}
              className="w-30"
              borderRadius={2}
              baseColor="#334155"
              highlightColor="#475569"
            />
            </div>
            <div className="w-[70%] h-fit">
              <Skeleton
              height={12}
              className="w-30"
              borderRadius={2}
              baseColor="#334155"
              highlightColor="#475569"
            />
            </div>
          </div>
        </>
      )}
    </>
  );
}
