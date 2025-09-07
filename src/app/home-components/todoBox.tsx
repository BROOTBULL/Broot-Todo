import Image from "next/image";
import { Todo, useTodoStore } from "../utils/store/todo.store";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function TodoBox({ todo }: { todo: Todo }) {
  const setSelectedTodo = useTodoStore((state) => state.setSelectedTodo);
  const selectedTodo = useTodoStore((state) => state.selectedTodo);
  const getProjects = useTodoStore((state) => state.getProjects);
  const getTodos = useTodoStore((state) => state.getTodos);

  const priorityColor = [
    "from-rose-500/20",
    "from-yellow-500/20",
    "from-green-500/20",
    "from-blue-500/20",
  ];

  async function handleTodoStatus(todo: Todo) {
    try {
      const res = await axios.patch("/api/todo", {
        ...todo,
        status: todo.status === "pending" ? "in-progress" : "done",
      });

      console.log("✅ Todo Status updated:", res.data);
      await getProjects();
      await getTodos();
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
    <div
      onClick={() => {
        setSelectedTodo(todo);
      }}
      className={` ${
        selectedTodo?._id === todo._id
          ? "inset-ring-2 inset-ring-rose-800/40 bg-rose-950/10"
          : ""
      } group pb-1 h-18 rounded-lg flex flex-row items-center bg-linear-to-t hover:from-indigo-500/10 cursor-pointer hover:to-transparent`}
    >
      <div
        className={`h-full w-fit flex items-center bg-linear-to-r ${
          priorityColor[todo.priority - 1]
        } to-transparent  pl-2 rounded-l-md select-none`}
      >
        <Image
          src="/media/todo.png"
          className="size-4 md:size-5 mr-2"
          alt="Logo"
          width={20}
          height={20}
        />
      </div>
      <div className="flex flex-col pointer-events-none select-none max-w-50 md:max-w-120 overflow-x-hidden">
        <div className="text-[12px] md:text-[13px] text-slate-300 font-[600] ml-0.5 h-4 overflow-y-hidden">
          {todo ? todo.task : "Task name..."}
        </div>
        <div className="text-[10px] tracking-wide md:text-[12px] pl-0.5 text-slate-400 h-4 overflow-y-hidden">
          <ReactMarkdown>
            {todo
              ? todo.description.length > 25
                ? todo.description.slice(0, 25) + "..."
                : todo.description
              : "Description..."}
          </ReactMarkdown>
        </div>
        <div className="text-[9px] md:text-[10px] px-0.5 text-slate-400 tracking-wider flex items-center flex-row select-none">
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
          <div className="p-1 flex px-2 select-none text-[10px] md:text-sm text-emerald-400/60 items-center">
            In-Progress
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleTodoStatus(todo);
          }}
          className={`${
            todo.status !== "done"
              ? "hover:bg-emerald-900/40 "
              : "pointer-events-none"
          } flex flex-row duration-200 rounded-md mt-auto p-1 group-hover:flex lg:hidden px-2 cursor-pointer select-none text-[11px] md:text-sm text-emerald-400/70 items-center`}
        >
          {todo.status === "pending"
            ? "Start Working"
            : todo.status === "done"
            ? "Completed"
            : "Mark Complete"}
          <Image
            src={`/media/${todo.status === "pending" ? "working" : "done"}.png`}
            className="size-3 md:size-5"
            alt="Logo"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
}
