import Image from "next/image";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useTodoStore } from "../utils/store/todo.store";
import TextareaAutosize from "react-textarea-autosize";
import { TodoInput } from "./addtaskBox";
import axios from "axios";
import ReactMarkdown from "react-markdown";

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
  const [EditBox, setEditBox] = useState(false);

  const [newLocation, setNewLocation] = useState({
    projectId: "",
    sectionId: "",
  });

  const priorityBg = [
    "border-rose-500 bg-rose-500/50",
    "border-yellow-500 bg-yellow-500/50",
    "border-green-500 bg-green-500/50",
    "border-blue-500 bg-blue-500/50",
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

  const handleDelete = async (todoId: string) => {
    try {
      const res = await axios.delete("/api/todo", { data: { todoId: todoId } });

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
  };

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
      <div className="h-10 w-full border-b-2 rounded-md border-rose-800/60 px-2 flex items-center ">
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
                        {"#"}{" "}
                        {project.title.length > 20
                          ? project.title.slice(0, 20) + "..."
                          : project.title}
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
                          {"#"}{" "}
                          {section.name.length > 20
                            ? section.name.slice(0, 18) + "..."
                            : section.name}
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
      </div>

      <div className="rounded-md flex max-h-120 h-full w-full mt-5 overflow-hidden flex-col">
        {EditBox ? (
          <form
            id="EditSubmit"
            onSubmit={handleSubmit}
            className="px-2 flex flex-col w-full h-full bg-slate-900/30"
          >
            <input
              className="text-lg p-1 font-bold mb-5 outline-none "
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
            <div className="text-[13px] text-slate-500 px-1 mb-2">
              Description
            </div>
            <TextareaAutosize
              minRows={2}
              maxRows={20}
              className="text-sm text-slate-200 h-full px-1 resize-none scroll-auto outline-none custom-scroll-d"
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
        ) : (
          <div
            onClick={() => setEditBox(true)}
            className="flex flex-col h-full"
          >
            <div className="text-xl font-semibold px-3 mb-5 text-slate-200">
              {editTask.task}
            </div>
            <div className="px-3 flex flex-col">
              <div className="text-[13px] text-slate-500 mb-2">Description</div>
              <div className="text-sm text-slate-200 tracking-wider whitespace-pre-wrap">
                {editTask.description}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full rounded-md ml-auto flex flex-col my-5 px-3 gap-2">
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm text-slate-400">Status</div>

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
                ? " hover:bg-emerald-900/80"
                : " hover:bg-green-900/50"
            }  bg-green-900/50  rounded-full duration-200 cursor-pointer flex flex-row items-center px-3 py-1.5 text-[12px] text-nowrap text-green-400`}
          >
            {editTask.status === "pending"
              ? "Start Working"
              : editTask.status === "in-progress"
              ? "Mark complete"
              : "Done"}
          </div>
        </div>

        <div className="flex flex-row items-center">
          <div className="text-sm text-slate-400">DueDate</div>
          <div className="ml-auto">
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
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="text-sm text-slate-400">Priority</div>
          <div
            onClick={() => {
              setPriorityBox(!priorityBox);
            }}
            className={`size-7 text-[12px] border-2 text-slate-300 items-center justify-center flex ${
              priorityBg[editTask.priority! - 1]
            } rounded-md flex flex-row items-center cursor-pointer hover:border-slate-200`}
          >
            <Image
              src="/media/priorityF.png"
              className="size-5"
              alt="Logo"
              width={20}
              height={20}
            />
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

      <div className="mt-auto flex w-full">
        <button
          type="button"
          onClick={() => handleDelete(selectedTodo!._id)}
          className="flex flex-row items-end m-1 cursor-pointer hover:bg-rose-400/10 p-1 pr-2 rounded-sm duration-200"
        >
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
          className="rounded-sm md:rounded-md p-1.5 px-4 text-[13px] font-[600] ml-auto duration-200 hover:bg-slate-900 text-slate-200 m-1 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="EditSubmit"
          className="rounded-sm md:rounded-md p-1.5 px-4 text-[13px] font-[600] duration-200 hover:bg-rose-800/90 text-slate-100 bg-rose-800/60 m-1 cursor-pointer"
        >
          Save Task
        </button>
      </div>
    </>
  );
}
