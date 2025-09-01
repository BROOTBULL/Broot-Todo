"use client"
import { useTodoStore } from "../utils/store/todo.store";
import SectionList from "./sectionList";

export default function ProjectBox(){
    const activeProject=useTodoStore((state)=>state.activeProject)
  
    return(<>
            <div className="text-2xl font-bold text-slate-300 mb-8">
          {"# "}
          {activeProject?activeProject.title:"Project"}
        </div>
        <SectionList/>
        </>)
}