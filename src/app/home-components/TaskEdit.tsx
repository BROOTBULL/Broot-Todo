import Image from "next/image";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useTodoStore } from "../utils/store/todo.store";
import TextareaAutosize from "react-textarea-autosize";
import { TodoInput } from "./addtaskBox";
import axios from "axios";

export default function EditTask() {
  const selectedTodo = useTodoStore((state) => state.selectedTodo);
  const setSelectedTodo = useTodoStore((state) => state.setSelectedTodo);
  const projectData = useTodoStore((state) => state.projectData);
  const getProjects = useTodoStore((state) => state.getProjects);
  const getTodos = useTodoStore((state) => state.getTodos);

  const [editTask, setEditTask] = useState<TodoInput>({
    task: "Task name ...",
    description: "Task Description ...",
    status: "pending",
    project: "",
    section: "",
    dueDate: null, // 👈 start null instead of undefined
    priority: 4,
  });

  const [priorityBox, setPriorityBox] = useState(false);
  const [projectBox, setProjectBox] = useState(false);
  const [sectionBox, setSectionBox] = useState(false);
  const [editLocation, setEditlocation] = useState(false);

  const [newLocation, setNewLocation] = useState({
    projectId: "",
    sectionId: "",
  });

  const priorityBg = [
    "bg-rose-500/20",
    "bg-yellow-500/20",
    "bg-green-500/20",
    "bg-blue-500/20",
  ];

  useEffect(() => {
    if (selectedTodo) {
      setEditTask({
        task: selectedTodo.task,
        description: selectedTodo.description,
        project: selectedTodo.project.title,
        section: selectedTodo.section.name,
        status: selectedTodo.status,
        dueDate: selectedTodo.dueDate,
        priority: selectedTodo.priority || 4,
      });
      setNewLocation({
        projectId: selectedTodo.project._id,
        sectionId: selectedTodo.section._id,
      });
    }
  }, [selectedTodo]);

  const handleDelete= async(todoId:string)=>{
    try {
      const res = await axios.delete("/api/todo", {data: { todoId: todoId}});

      console.log("Todo deleted :", res.data);
      await getProjects();
      await getTodos();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Frontend error:", err.message);
      } else {
        console.error("Unknown error", err);
      }
    }
    setSelectedTodo(null);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/todo", {
        _id: selectedTodo!._id,
        task: editTask.task,
        description: editTask.description,
        priority: editTask.priority,
        dueDate: editTask.dueDate,
        status: editTask.status,
        projectId: newLocation.projectId,
        sectionId: newLocation.sectionId,
      });

      console.log(" Todo updated:", res.data);
      await getProjects();
      await getTodos();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Frontend error:", err.message);
      } else {
        console.error("Unknown error", err);
      }
    }
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="h-9 w-full border-b-2 rounded-md border-rose-800/60 px-2 flex items-center ">
        <div
          onClick={() => setEditlocation(true)}
          className={`text-sm text-slate-300 hover:bg-slate-800 p-1 pr-0 rounded-md max-w-60 overflow-x-hidden text-nowrap cursor-pointer ${
            editLocation ? "hidden" : "flex"
          }`}
        >
          {"# "}
          {editTask.project.slice(0, 12) || "ProjectName"}
          {" / "}
          {editTask.section.slice(0, 14) || "SectionName"}
          <Image
            src="/media/dropDown.png"
            className="size-6"
            alt="Logo"
            width={20}
            height={20}
          />
        </div>

        <div className={`${editLocation ? "flex" : "hidden"} flex-row gap-1`}>
          <button
            onClick={() => {
              setProjectBox(!projectBox);
            }}
            type="button"
            className="h-8 w-fit px-3 text-sm border-1 text-slate-300 border-slate-600/50 rounded-md flex flex-row items-center cursor-pointer hover:bg-slate-800"
          >
            <Image
              src="/media/hashtag.png"
              className="size-4 mr-1"
              alt="Logo"
              width={20}
              height={20}
            />
            <div className="max-w-15 md:max-w-26 text-nowrap overflow-x-hidden">
              {editTask.project || "Select Project"}
            </div>
            <Image
              src="/media/dropDown.png"
              className="size-4 ml-1"
              alt="Logo"
              width={20}
              height={20}
            />
          </button>
          {/* //////////// project button ///////////// */}
          {projectBox && (
            <div className="bg-linear-to-tr from-slate-900 to-slate-800 h-fit max-h-50 w-50 absolute mt-8.5 rounded gap-1 flex flex-col p-2 z-2 left-0">
              {projectData.length > 0 ? (
                projectData.map((project, i) => {
                  return (
                    <div key={i}>
                      <button
                        onClick={() => {
                          setNewLocation((prev) => ({
                            ...prev,
                            projectId: project._id,
                          }));
                          setEditTask((prev) => ({
                            ...prev,
                            project: project.title,
                          }));
                          setProjectBox(false);
                        }}
                        type="button"
                        className="h-8 w-full px-3 text-sm rounded-md flex flex-row items-center ml-auto cursor-pointer border-b-1 border-slate-600 hover:bg-slate-500/50 duration-200"
                      >
                        {"#"} {project.title}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="h-8 w-full px-3 text-sm rounded-md flex flex-row items-center ml-auto cursor-default border-b-1 border-slate-600">
                  No Projects
                  <div />
                </div>
              )}
            </div>
          )}
          {/* ///////// section button ///////// */}
          <button
            onClick={() => {
              setSectionBox(!sectionBox);
            }}
            type="button"
            className={`h-8 w-fit px-3 text-sm border-1 text-slate-300 border-slate-600/50 rounded-md flex flex-row items-center cursor-pointer`}
          >
            <Image
              src="/media/hashtag.png"
              className="size-4 mr-1"
              alt="Logo"
              width={20}
              height={20}
            />
            <div className="max-w-15 md:max-w-26 text-nowrap overflow-x-hidden">
              {editTask.section || "Select Section"}
            </div>
            <Image
              src="/media/dropDown.png"
              className="size-4 ml-1"
              alt="Logo"
              width={20}
              height={20}
            />
          </button>
          {sectionBox && (
            <div className="bg-linear-to-tr from-slate-900 to-slate-800 h-fit max-h-50 w-50 absolute left-40 mt-8.5 rounded gap-1 flex flex-col p-2 z-2">
              {projectData.length > 0 ? (
                projectData
                  .find((project) => project._id === newLocation.projectId)
                  ?.sections.map((section, i) => {
                    return (
                      <div key={i}>
                        <button
                          type="button"
                          onClick={() => {
                            setNewLocation((prev) => ({
                              ...prev,
                              sectionId: section._id,
                            }));
                            setEditTask((prev) => ({
                              ...prev,
                              section: section.name,
                            }));
                            setSectionBox(false);
                          }}
                          className="h-8 w-full px-3 text-sm rounded-md flex flex-row items-center ml-auto cursor-pointer border-b-1 border-slate-600 hover:bg-slate-500/50 duration-200"
                        >
                          {"#"} {section.name}
                        </button>
                      </div>
                    );
                  })
              ) : (
                <div className="h-8 w-full px-3 text-sm rounded-md flex flex-row items-center ml-auto cursor-default border-b-1 border-slate-600">
                  No Projects
                  <div />
                </div>
              )}
            </div>
          )}
        </div>

        <button className="ml-auto mr-1 hover:bg-slate-800 rounded-md cursor-pointer">
          <Image
            src="/media/dropDown.png"
            className="size-6 rotate-90"
            alt="Logo"
            width={20}
            height={20}
          />
        </button>
        <button className=" hover:bg-slate-800 rounded-md cursor-pointer z-100">
          <Image
            src="/media/dropDown.png"
            className="size-full -rotate-90"
            alt="Logo"
            width={20}
            height={20}
          />
        </button>
      </div>

      <div className="w-full rounded-md ml-auto flex my-5 ">
        <div
          onClick={() =>
            setEditTask((prev) => ({
              ...prev,
              status:
                prev.status === "pending"
                  ? "in-progress"
                  : prev.status === "done"
                  ? "pending"
                  : "done",
            }))
          }
          className={` ${
            editTask.status === "done"
              ? " hover:bg-emerald-900/20 "
              : "bg-slate-800/80 hover:bg-emerald-900/50"
          } rounded-md duration-200 cursor-pointer flex flex-row items-center px-2 text-[12px] text-nowrap text-emerald-400/80`}
        >
          {editTask.status === "pending"
            ? "Start Working"
            : editTask.status === "in-progress"
            ? "Mark complete"
            : "Done"}
        </div>
        <div className="flex flex-row w-full gap-1.5 justify-end">
          <DatePicker
            selected={editTask.dueDate ? editTask.dueDate : null}
            minDate={new Date()}
            onChange={(date) => {
              setEditTask((prev) => ({
                ...prev,
                dueDate: date || prev.dueDate,
              }));
            }}
            dateFormat="dd/MM/yyyy" // or "yyyy-MM-dd"
            className="border-1 border-slate-600/50 p-2 rounded-md w-25 h-8 outline-none cursor-pointer text-slate-300 text-[12px] tracking-wider"
            calendarClassName="custom-calendar"
            placeholderText="Date"
            dayClassName={(date: Date) =>
              date.getTime() < new Date().setHours(0, 0, 0, 0)
                ? "past-day"
                : "future-day"
            }
          />
          <div
            onClick={() => {
              setPriorityBox(!priorityBox);
            }}
            className={`h-8 px-2 text-[12px] border-1 text-slate-300 border-slate-600/50 items-center flex ${
              priorityBg[editTask.priority! - 1]
            } rounded-md flex flex-row items-center cursor-pointer hover:border-slate-500`}
          >
            <Image
              src="/media/priority.png"
              className="size-3 mr-1"
              alt="Logo"
              width={20}
              height={20}
            />
            Priority
            {priorityBox && (
              <div className="h-9 w-fit p-2 bg-slate-800 absolute mt-20 right-0 rounded-md flex flex-wrap gap-1">
                <button
                  onClick={() =>
                    setEditTask((prev) => ({
                      ...prev,
                      priority: 1,
                    }))
                  }
                  className="h-5 hover:bg-slate-700/60 rounded cursor-pointer bg-red-500/40 size-6"
                >
                  {" "}
                  1
                </button>
                <button
                  onClick={() =>
                    setEditTask((prev) => ({
                      ...prev,
                      priority: 2,
                    }))
                  }
                  className="h-5 hover:bg-slate-700/60 rounded cursor-pointer bg-yellow-500/40 size-6"
                >
                  {" "}
                  2
                </button>
                <button
                  onClick={() =>
                    setEditTask((prev) => ({
                      ...prev,
                      priority: 3,
                    }))
                  }
                  className="h-5 hover:bg-slate-700/60 rounded cursor-pointer bg-green-500/40 size-6"
                >
                  {" "}
                  3
                </button>
                <button
                  onClick={() =>
                    setEditTask((prev) => ({
                      ...prev,
                      priority: 4,
                    }))
                  }
                  className="h-5 hover:bg-slate-700/60 rounded cursor-pointer bg-blue-500/40 size-6"
                >
                  {" "}
                  4
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-md bg-slate-950/50 flex max-h-147 h-full w-full overflow-hidden border-1 border-slate-700">
        <form
          id="EditSubmit"
          onSubmit={handleSubmit}
          className="px-2 flex flex-col w-full h-full mt-1"
        >
          <input
            className="text-base text-slate-300 p-1 outline-none"
            type="text"
            name="task"
            autoComplete="off"
            value={editTask.task}
            id="task"
            placeholder="Task name"
            onChange={(e) =>
              setEditTask((prev) => ({ ...prev, task: e.target.value }))
            }
            required
          ></input>
          <TextareaAutosize
            minRows={2}
            className="text-[12px] text-slate-400 h-full px-1 py-2 resize-none scroll-auto outline-none custom-scroll"
            name="description"
            placeholder="Description"
            value={editTask.description}
            onChange={(e) =>
              setEditTask((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            id="description"
            required
          />
        </form>
      </div>

      <div className="mt-auto flex w-full">
        <button
        type="button"
        onClick={()=>handleDelete(selectedTodo!._id)}
        className="flex flex-row items-end m-1 cursor-pointer hover:bg-rose-400/10 p-1 pr-2 rounded-sm duration-200">
          <Image
            src="/media/delete.png"
            className="size-6"
            alt="Logo"
            width={20}
            height={20}
          />
          <div className="text-[12px]">Delete</div>
        </button>
        <button
          type="button"
          onClick={() => setSelectedTodo(null)}
          className="rounded-sm md:rounded-md p-1.5 px-4 text-[12px] ml-auto duration-200 hover:bg-slate-600 text-slate-200 bg-slate-700 m-1 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="EditSubmit"
          className="rounded-sm md:rounded-md p-1.5 px-4 text-[12px] duration-200 hover:bg-rose-950 text-slate-100 bg-rose-800/80 m-1 cursor-pointer"
        >
          Save Task
        </button>
      </div>
    </>
  );
}
