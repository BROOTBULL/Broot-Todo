import { useState } from "react";
import { Project, useTodoStore } from "../utils/store/todo.store";
import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";
import axios from "axios";
import SectionBox from "./Section";

export default function ProjectAssistant() {
  const projectData = useTodoStore((state) => state.projectData);
  const getProjects = useTodoStore((state) => state.getProjects);

  const [prompt, setPrompt] = useState("");
  const [loading, setloading] = useState(false);
  const [responseProject,setResponseProject]=useState<Project>()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setloading(true);
      const AssistantResponse = await axios.post("/api/assistant", {
        prompt: prompt,
      });

      console.log("Created project:", AssistantResponse.data);
      setResponseProject(AssistantResponse.data)
      await getProjects();
      setPrompt("")
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("API error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="h-[90vh] flex flex-col justify-center ">
      <div className="text-2xl font-bold text-slate-300 mb-5">{responseProject?.title||"Project Assistant"}</div>
      {!loading ? (<div className="h-[75vh] custom-scroll-d overflow-y-auto scroll-smooth ">{
        projectData.find((project)=>project._id===responseProject?._id)?.sections.map((section, i) => {
          return (
            <div key={i} className="flex flex-col">
              <SectionBox section={section} />
            </div>
          );
        })
      }</div>) : (
        <>
          <div className=" border-b-1 h-20 rounded-sm border-slate-700 p-1 px-2 flex flex-col bg-slate-900/60 mb-2">
            <Skeleton
              height={14}
              width={400}
              borderRadius={2}
              baseColor="#334155"
              highlightColor="#475569"
            />
            <Skeleton
              height={12}
              width={600}
              borderRadius={2}
              baseColor="#334155"
              highlightColor="#475569"
            />
            <Skeleton
              height={12}
              width={300}
              borderRadius={2}
              baseColor="#334155"
              highlightColor="#475569"
            />
          </div>
          <div className=" border-b-1 h-20 rounded-sm border-slate-700 p-1 px-2 flex flex-col bg-slate-900/60">
            <Skeleton
              height={14}
              width={400}
              borderRadius={2}
              baseColor="#334155"
              highlightColor="#475569"
            />
            <Skeleton
              height={12}
              width={600}
              borderRadius={2}
              baseColor="#334155"
              highlightColor="#475569"
            />
            <Skeleton
              height={12}
              width={300}
              borderRadius={2}
              baseColor="#334155"
              highlightColor="#475569"
            />
          </div>
        </>
      )}
      <div className="w-[90%] h-fit flex gap-3 mt-auto self-center flex-row">
        <form
          onSubmit={(e) => handleSubmit(e)}
          id="assistantForm"
          className="w-full h-8 md:h-10 md:rounded-full bg-slate-900/60 rounded-sm border-2 border-slate-800/80 flex flex-row px-2 items-center"
        >
          <input
            type="text"
            name="prompt"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            autoComplete="off"
            className=" w-[80%] h-full outline-none rounded-full pl-2 text-slate-300/80"
          />
          <button
            type="submit"
            form="assistantForm"
            className="text-[12px] bg-slate-800/40 hover:bg-slate-800 hover:shadow-sm/30 hover:shadow-slate-300/20 px-3 p-1 h-fit rounded-full ml-auto text-slate-300 cursor-pointer hover:text-slate-100 duration-200"
          >
            {loading?"Generating Project Plan ...":"Generate Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
