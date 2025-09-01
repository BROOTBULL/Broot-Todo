"use client";

import axios from "axios";
import { useState } from "react";
import { useTodoStore } from "../utils/store/todo.store";

export default function AddProject() {

    const [projectName,setProjectName]=useState("")
    const setAddBox = useTodoStore((state) => state.setAddBox);
    const getProjects = useTodoStore((state) => state.getProjects);

    

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  try {

    const projectsResponse = await axios.post("/api/projects", {
      title: projectName,
    });

    console.log("Created project:", projectsResponse.data);

    await getProjects();

    setAddBox(null);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to create project");
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
        className="bg-slate-950/60 border-1 border-slate-700 p-5 h-fit rounded-md shadow-lg w-full text-center drop-shadow-2xl/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-fit w-full scroll-smooth overflow-auto flex flex-col">
          <input
            onChange={(e)=>setProjectName(e.target.value)}
            className="text-xl outline-none p-1"
            type="text"
            name="ProjectName"
            autoComplete="off"
            value={projectName}
            id="projectName"
            placeholder="Enter project name"
            required
          ></input>
        </div>
        <div className="flex flex-col w-full h-fit items-center justify-start">
          <div className="bg-slate-600/40 my-2 w-full h-0.5 rounded-full" />
          <div className="flex flex-row w-full h-8 gap-1.5">
            <button
              onClick={(e) => {
                setAddBox(null);
              }}
              type="button"
              className="h-8 w-fit px-3 text-sm bg-slate-700 rounded-md flex flex-row items-center ml-auto cursor-pointer hover:bg-slate-500/70 duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="taskForm"
              className="h-8 w-fit px-3 text-sm text-slate-100 bg-rose-800/80 drop-shadow-md rounded-md flex flex-row items-center cursor-pointer hover:bg-rose-950 duration-200"
            >
              Add Project
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
