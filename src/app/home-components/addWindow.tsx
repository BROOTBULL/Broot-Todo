"use client";

import { useTodoStore } from "../utils/store/todo.store";
import "react-datepicker/dist/react-datepicker.css";
import AddTaskBox from "./addtaskBox";
import AddProject from "./AddProject";
import { useState } from "react";

export default function AddWindow() {
  const addBox = useTodoStore((state) => state.addBox);
  const setAddBox = useTodoStore((state) => state.setAddBox);
  const [addTaskTodoBox, setAddTaskTodoBox] = useState(false);

  return (
    <>
      {addBox && (
        <div
          className="fixed inset-0 flex pt-35 p-6 justify-center bg-black/40 backdrop-blur-[1px] z-120"
          onClick={() => setAddBox(null)}
        >
          <div className="w-150 h-fit bg-slate-900">
            {addBox === "project" ? (
              <AddProject />
            ) : (
              <AddTaskBox setAddTaskTodoBox={setAddTaskTodoBox} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
