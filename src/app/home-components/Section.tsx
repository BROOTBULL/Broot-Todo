"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { Section, useTodoStore } from "../utils/store/todo.store";
import TodoList from "./todoList";
import AddSection from "./AddSection";
import AddTaskBox from "./addtaskBox";

export default function SectionBox({ section }: { section: Section }) {
  const [showTodo, setShowTodo] = useState(true);

  const activeProject = useTodoStore((state) => state.activeProject);
  const getProjects = useTodoStore((state) => state.getProjects);

  const [addTaskTodoBox, setAddTaskTodoBox] = useState(false);

  const [sectionOption, setSectionOption] = useState(false);
  const [addSectionBox, setAddSectionBox] = useState(false);

  async function handleSectionDelete(sectionId: string) {
    try {
      const deleteResponse = await axios.delete("/api/sections", {
        data: { sectionId: sectionId, projectId: activeProject._id },
      });
      console.log(deleteResponse.data);
    } catch (err) {
      console.error(err);
    }
    await getProjects();
  }

  return (
    <>
      <div className="border-b-2 border-slate-500 w-full rounded-md h-10">
        <div className="flex flex-row items-center h-full w-full ">
          <button
            onClick={() => setShowTodo(!showTodo)}
            className="rounded-md p-1 hover:bg-slate-700/50 cursor-pointer"
          >
            <Image
              src="/media/dropDown.png"
              className="size-6"
              alt="Logo"
              width={20}
              height={20}
            />
          </button>
          <div className="mx-1 text-slate-300 text-lg font-bold">
            {section ? section.name : "SectionName"}
          </div>
          <div className="ml-2 text-slate-600">
            {"("}
            {section ? section.todos.length : ""}
            {")"}
          </div>
          <div
            onClick={() => setSectionOption(!sectionOption)}
            className="hover:bg-slate-800 rounded-md p-1 ml-auto mr-3 cursor-pointer"
          >
            <Image
              src="/media/OptionD.png"
              className="size-5 "
              alt="Logo"
              width={20}
              height={20}
            />

            {sectionOption && (
              <div className="bg-slate-900 p-1 absolute w-45 rounded-md z-20">
                <button
                  onClick={() => handleSectionDelete(section._id)}
                  className="flex hover:bg-slate-800 p-2 rounded-sm items-center flex-row w-full h-full cursor-pointer"
                >
                  <div className="text-sm text-rose-400 ">Delete</div>
                  <Image
                    src="/media/delete.png"
                    className="size-5 ml-auto"
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          showTodo ? "max-h-2000" : "max-h-0 overflow-hidden "
        } h-fit duration-200`}
      >
        <TodoList todos={section.todos} />
      </div>
      {addTaskTodoBox ? (
        <AddTaskBox setAddTaskTodoBox={setAddTaskTodoBox} />
      ) : (
        <button
          onClick={() => setAddTaskTodoBox(true)}
          className={`w-full select-none text-sm flex-row p-1 px-2 text-slate-600 items-center bg-slate-900/20 cursor-pointer hover:bg-slate-900/70 rounded-md my-1 ${
            section ? "flex" : "hidden"
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
      <div className="w-full h-fit">
        {addSectionBox ? (
          <AddSection setAddSectionBox={setAddSectionBox} />
        ) : (
          <button
            onClick={() => setAddSectionBox(!addSectionBox)}
            className="h-8 w-full flex justify-center my-1 items-center cursor-pointer group"
          >
            <div className="text-sm text-slate-900 group-hover:text-slate-500 duration-200">
              ------ Add Section ------
            </div>
          </button>
        )}
      </div>
    </>
  );
}
