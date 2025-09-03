"use client";
import { useState } from "react";
import { useTodoStore } from "../utils/store/todo.store";
import AddSection from "./AddSection";
import SectionBox from "./Section";

export default function SectionList() {
  const activeProject = useTodoStore((state) => state.activeProject);
  const projectData = useTodoStore((state) => state.projectData);
  const [addSectionBox, setAddSectionBox] = useState(false);


  return (
    <>
      {activeProject && activeProject.sections.length > 0 ? (
        <>
          {projectData
            .find((project) => project._id === activeProject._id)
            ?.sections.map((section, i) => {
              return (
                <div key={i} className="flex flex-col">
                  <SectionBox section={section} />
                </div>
              );
            })}
          <div className="w-full h-fit">
            {addSectionBox ? (
              <AddSection setAddSectionBox={setAddSectionBox} />
            ) : (
              <button
                onClick={() => setAddSectionBox(!addSectionBox)}
                className="h-8 w-full flex justify-center my-1 items-center cursor-pointer group"
              >
                <div className=" text-[12px] md:text-sm text-slate-700 md:text-slate-900 group-hover:text-slate-500 duration-200">
                  ------ Add Section ------
                </div>
              </button>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
