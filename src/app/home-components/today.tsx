"use client"
import { useEffect, useState } from "react";
import TodoList from "./todoList";
import axios from "axios";
import { Todo } from "../utils/store/todo.store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddTaskBox from "./addtaskBox";
import Image from "next/image";

export default function Today() {
  const [todaysTodos, setTodaysTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const [addTaskTodoBox,setAddTaskTodoBox]=useState(false)

  useEffect(() => {
    const fetchToday = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/todo/today");
        setTodaysTodos(res.data.todos);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching today's todos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchToday();
  }, []);

  return (
    <>
      <div className="text-2xl font-bold text-slate-300 mb-8">Today</div>
      {!loading ? (
        <>
          <TodoList todos={todaysTodos} />
          {addTaskTodoBox ? (
            <AddTaskBox setAddTaskTodoBox={setAddTaskTodoBox}/>
          ) : (
            <button
              onClick={() => setAddTaskTodoBox(true)}
              className={`w-full select-none text-[12px] md:text-sm flex-row p-1 px-2 text-slate-600 items-center bg-slate-900/20 cursor-pointer hover:bg-slate-900/70 rounded-md my-1 ${
                todaysTodos ? "flex" : "hidden"
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
    </>
  );
}
