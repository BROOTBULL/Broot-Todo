"use client";
import Image from "next/image";
import AddTaskBox from "./addtaskBox";
import { Todo, useTodoStore } from "../utils/store/todo.store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

const priorityColor = [
  "from-rose-500/20",
  "from-yellow-500/20",
  "from-green-500/20",
  "from-blue-500/20",
];

export default function TodoList({ todos }: { todos: Todo[] }) {
  const addTaskTodo = useTodoStore((state) => state.addTaskTodo);
  const setAddTaskTodo = useTodoStore((state) => state.setAddTaskTodo);
  const setSelectedTodo = useTodoStore((state) => state.setSelectedTodo);
  const selectedTodo = useTodoStore((state) => state.selectedTodo);
  const getProjects = useTodoStore((state) => state.getProjects);


  async function handleTodoStatus(todo: Todo) {
    try {

      const res = await axios.patch("/api/todo", {
        ...todo,
        status: todo.status === "pending" ? "in-progress" : "done",
      });

      console.log("✅ Todo Status updated:", res.data);
      await getProjects();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Frontend error:", err.message);
      } else {
        console.error("Unknown error", err);
      }
    } finally {
    }
  }

  return (
    <>
      {todos ? (
        todos
          .filter((todo) => todo.status !== "done")
          .map((todo, i) => {
            return (
              <div
                key={i}
                onDoubleClick={() => {
                  setSelectedTodo(selectedTodo ? null : todo);
                }}
                className={` ${
                  selectedTodo?._id === todo._id
                    ? "inset-ring-2 inset-ring-rose-800/60"
                    : ""
                } group border-b-1 h-20 rounded-lg border-slate-700 p-2 py-1 pl-1 flex flex-row items-center bg-linear-to-t hover:from-indigo-500/10 cursor-pointer hover:to-transparent`}
              >
                <div
                  className={`h-full w-fit flex items-center bg-linear-to-r ${
                    priorityColor[todo.priority - 1]
                  } to-transparent  pl-2 rounded-l-md select-none`}
                >
                  <Image
                    src="/media/todo.png"
                    className="size-5 mr-2"
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="flex flex-col pointer-events-none select-none">
                  <div className="text-sm text-slate-300 font-bold ml-0.5">
                    {todo ? todo.task : "Task name..."}
                  </div>
                  <div className="text-[12px] pl-1 text-slate-400">
                    {todo ? todo.description : "Description..."}
                  </div>
                  <div className="text-[10px] px-0.5 pt-1.5 text-slate-400 tracking-wider flex items-center flex-row select-none">
                    <Image
                      src="/media/calander.png"
                      className="size-3 mr-0.5 mb-0.5"
                      alt="Logo"
                      width={20}
                      height={20}
                    />
                    <div>
                      {todo.dueDate
                        ? new Date(todo.dueDate).toLocaleDateString("en-GB")
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="w-35 ml-auto flex flex-col items-end h-full">
                  {todo.status === "in-progress" && (
                    <div className="p-1 flex px-2 select-none text-sm text-emerald-400/60 items-center">
                      In-Progress
                    </div>
                  )}
                  <button
                    onClick={() => handleTodoStatus(todo)}
                    className="hover:bg-emerald-900/40 duration-200 rounded-md mt-auto p-1 group-hover:flex hidden px-2 cursor-pointer select-none text-sm text-emerald-400/80 items-center"
                  >
                    {todo.status === "pending"
                      ? "Start Working"
                      : "Mark Complete"}
                    <Image
                      src={`/media/${
                        todo.status === "pending" ? "working" : "done"
                      }.png`}
                      className="size-5"
                      alt="Logo"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
            );
          })
      ) : (
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
      {addTaskTodo ? (
        <AddTaskBox />
      ) : (
        <button
          onClick={() => setAddTaskTodo(true)}
          className={`w-full select-none text-sm flex-row p-1 px-2 text-slate-600 items-center bg-slate-900/20 cursor-pointer hover:bg-slate-900/70 rounded-md my-1 ${
            todos ? "flex" : "hidden"
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
    </>
  );
}
