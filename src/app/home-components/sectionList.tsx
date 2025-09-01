"use client";
import { useTodoStore } from "../utils/store/todo.store";
import SectionBox from "./Section";

export default function SectionList() {
  const activeProject = useTodoStore((state) => state.activeProject);
  const projectData = useTodoStore((state) => state.projectData);



  return (
    <>
      {activeProject && activeProject.sections.length > 0 ? (
        projectData
          .find((project) => project._id === activeProject._id)
          ?.sections.map((section, i) => {
            return (
              <div key={i} className="flex flex-col">
                <SectionBox section={section} />
              </div>
            );
          })
      ) : (
        <></>
      )}
    </>
  );
}
