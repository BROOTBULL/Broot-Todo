"use client";

import axios from "axios";
import { useState } from "react";
import { useTodoStore } from "../utils/store/todo.store";

export default function AddSection({setAddSectionBox}:{setAddSectionBox:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [sectionName, setSectionName] = useState("");
  const getProjects = useTodoStore((state) => state.getProjects);
  const activeProject = useTodoStore((state) => state.activeProject);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const sectionsResponse = await axios.post("/api/sections", {
        projectId: activeProject._id,
        name: sectionName,
      });

      console.log("Created section:", sectionsResponse.data);

      await getProjects();
      setAddSectionBox(false)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("API error:", error.response?.data || error.message);
        alert(error.response?.data?.error || "Failed to create section");
      } else {
        console.error("Unexpected error:", error);
        alert("Something went wrong");
      }
    }
  }

  return (
    <>
      <form
        id="taskForm"
        onSubmit={handleSubmit}
        className="bg-slate-950/30 border-1 border-slate-700 p-3 h-fit rounded-md shadow-lg w-full text-center drop-shadow-2xl/80 my-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-fit w-full scroll-smooth overflow-auto flex flex-col">
          <input
            onChange={(e) => setSectionName(e.target.value)}
            className="text-base outline-none p-0.5"
            type="text"
            name="SectionName"
            autoComplete="off"
            value={sectionName}
            id="sectionName"
            placeholder="Enter section name"
            required
          ></input>
        </div>
        <div className="flex flex-col w-full h-fit items-center justify-start">
          <div className="border-b-2 border-slate-600/40 my-1.5 w-full rounded-full" />
          <div className="flex flex-row w-full h-8 gap-1.5">
            <button
              type="button"
              onClick={()=>setAddSectionBox(false)}
              className="h-8 w-fit px-3 text-sm bg-slate-700 rounded-md flex flex-row items-center ml-auto cursor-pointer hover:bg-slate-500/70 duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="taskForm"
              className="h-8 w-fit px-3 text-sm text-slate-100 bg-rose-800/80 drop-shadow-md rounded-md flex flex-row items-center cursor-pointer hover:bg-rose-950 duration-200"
            >
              Add Section
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
