import Image from "next/image";
import { useEffect, useState } from "react";
import { useTodoStore } from "../utils/store/todo.store";
import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";
import TodoBox from "./todoBox";

export default function Search() {
  const todoData = useTodoStore((state) => state.todoData);
  const getTodos = useTodoStore((state) => state.getTodos);

  useEffect(() => {
    const getTodo = async () => {
      await getTodos();
      console.log(todoData);
    };
    getTodo();
  }, []);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("filter");
  const [dateOrder, setDateOrder] = useState(false);
  const [priorityOrder, setPriorityOrder] = useState<null | boolean>(null);
  const [filterBox, setFilterBox] = useState(false);

  const filteredTodos = todoData.filter((todo) => {
    if (filter === "all" || filter === "filter") return true;
    return todo.status === filter;
  });
  const SortedTodos = [...filteredTodos]
    .sort((a, b) => {
      const timeA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const timeB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;

      return dateOrder ? timeA - timeB : timeB - timeA;
    })
    .sort((a, b) => {
      if (priorityOrder === null) return 0;
      return priorityOrder ? a.priority - b.priority : b.priority - a.priority;
    });

  return (
    <div>
      <div className="text-2xl font-bold text-slate-300 mb-8">Search</div>
      <div className="w-full h-fit flex gap-3 mb-12 flex-row">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full h-6.5 md:h-8 md:rounded-md rounded-sm border-2 border-slate-800/80 flex flex-row"
        >
          <input
            type="text"
            name="search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            autoComplete="off"
            className="bg-slate-950/40 w-[94%] h-full outline-none rounded-l-sm pl-2 text-slate-300/80"
          />
          <button
            type="submit"
            className="h-full w-[6%] border-l-2 border-0 border-slate-800/80 rounded-r-sm bg-slate-900 justify-center items-center flex hover:bg-slate-800"
          >
            <Image
              src="/media/search.png"
              className="size-5"
              alt="Logo"
              width={20}
              height={20}
            />
          </button>
        </form>
        <div
          onClick={() => setFilterBox(!filterBox)}
          className="bg-slate-900 border-slate-800/80 border-2 h-8 w-25 rounded-md flex items-center px-3 relative cursor-pointer hover:bg-slate-800"
        >
          <div className="text-slate-400 text-sm tracking-wider overflow-x-hidden text-nowrap">
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </div>
          <Image
            src="/media/dropDown.png"
            className="size-5 ml-auto"
            alt="Logo"
            width={20}
            height={20}
          />
          {filterBox && (
            <div className="absolute w-35 h-fit bg-slate-800 rounded-md text-[12px] md:text-sm z-102 p-2 top-9 -left-5">
              <button
                onClick={() => setFilter("all")}
                className="border-b-1 cursor-pointer h-7 w-full border-slate-900/80 rounded-sm hover:bg-slate-700 text-slate-300"
              >
                All
              </button>
              <button
                onClick={() => setFilter("pending")}
                className="border-b-1 cursor-pointer h-7 w-full border-slate-900/80 rounded-sm hover:bg-slate-700 text-slate-300"
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("in-progress")}
                className="border-b-1 cursor-pointer h-7 w-full border-slate-900/80 rounded-sm hover:bg-slate-700 text-slate-300"
              >
                In-progress
              </button>
              <button
                onClick={() => setFilter("done")}
                className="border-b-1 cursor-pointer h-7 w-full border-slate-900/80 rounded-sm hover:bg-slate-700 text-slate-300"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row w-full h-fit justify-between">
        <div className="text-xl text-slate-500 font-bold mb-3">
          Filter Results
        </div>
        <div className="flex flex-row w-fit h-fit gap-2">
          <button
            onClick={() => setPriorityOrder(!priorityOrder)}
            className="bg-slate-900 border-slate-800/80 border-2 h-8 w-25 rounded-md flex items-center justify-between px-2 relative cursor-pointer text-sm text-nowrap overflow-x-hidden text-slate-400  hover:bg-slate-800"
          >
            Priority
            <Image
              src="/media/dropDown.png"
              className={`size-5 ${priorityOrder ? "rotate-180" : ""}`}
              alt="Logo"
              width={20}
              height={20}
            />
          </button>
          <button
            onClick={() => setDateOrder(!dateOrder)}
            className="bg-slate-900 border-slate-800/80 border-2 h-8 w-25 rounded-md flex items-center px-2 justify-between relative cursor-pointer text-sm text-nowrap overflow-x-hidden text-slate-400  hover:bg-slate-800"
          >
            Due Date
            <Image
              src="/media/dropDown.png"
              className={`size-5 ${dateOrder ? "rotate-180" : ""}`}
              alt="Logo"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      {todoData ? (
        SortedTodos.filter(
          (todo) =>
            todo.task.toLowerCase().includes(query.toLowerCase()) ||
            todo.description.toLowerCase().includes(query.toLowerCase())
        ).map((todo, i) => {
          return (
            <div key={i}>
              <TodoBox todo={todo} />
            </div>
          );
        })
      ) : (
        <>
          <div className=" border-b-1 h-20 rounded-sm border-slate-700 p-1 px-2 flex flex-col bg-slate-900/60 mb-2">
            <div className="w-[50%] h-fit">
              <Skeleton
                height={14}
                className="w-30"
                borderRadius={2}
                baseColor="#334155"
                highlightColor="#475569"
              />
            </div>
            <div className="w-[90%] h-fit">
              <Skeleton
                height={12}
                className="w-30"
                borderRadius={2}
                baseColor="#334155"
                highlightColor="#475569"
              />
            </div>
            <div className="w-[70%] h-fit">
              <Skeleton
                height={12}
                className="w-30"
                borderRadius={2}
                baseColor="#334155"
                highlightColor="#475569"
              />
            </div>
          </div>
          <div className=" border-b-1 h-20 rounded-sm border-slate-700 p-1 px-2 flex flex-col bg-slate-900/60">
            <div className="w-[50%] h-fit">
              <Skeleton
                height={14}
                className="w-30"
                borderRadius={2}
                baseColor="#334155"
                highlightColor="#475569"
              />
            </div>
            <div className="w-[90%] h-fit">
              <Skeleton
                height={12}
                className="w-30"
                borderRadius={2}
                baseColor="#334155"
                highlightColor="#475569"
              />
            </div>
            <div className="w-[70%] h-fit">
              <Skeleton
                height={12}
                className="w-30"
                borderRadius={2}
                baseColor="#334155"
                highlightColor="#475569"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
