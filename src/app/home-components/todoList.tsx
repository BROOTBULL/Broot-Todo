"use client";
import { Todo } from "../utils/store/todo.store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TodoBox from "./todoBox";

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <>
      {todos ? (
        todos
          .filter((todo) => todo.status !== "done")
          .map((todo, i) => {
            return (
              <div key={i}>
                <TodoBox todo={todo} />
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
    </>
  );
}
