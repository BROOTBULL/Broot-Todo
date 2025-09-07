"use client";
import { ReactNode } from "react";
import { useTodoStore } from "../utils/store/todo.store";
import Inbox from "./Inbox";
import ProjectBox from "./projectBox";
import Search from "./search";
import Today from "./today";
import ProjectAssistant from "./ProjectAssistant";

export default function DashBoard() {
  const navOpen = useTodoStore((state) => state.navOpen);
  const activeView = useTodoStore((state) => state.activeView);
  const selectedTodo = useTodoStore((state) => state.selectedTodo);

  function renderComponent(activeView: string): ReactNode {
    switch (activeView) {
      case "inbox":
        return <Inbox />;
      case "project":
        return <ProjectBox />;
      case "assistant":
        return <ProjectAssistant />;
      case "today":
        return <Today />;
      case "search":
        return <Search />;
      default:
        return null; // fallback if no match
    }
  }

  return (
    <div className={`h-full w-full ${ selectedTodo?"lg:w-[70%]":"lg:w-[85%]"} duration-150 ease-in-out p-3 sm:p-5 pt-4.5`}>
      <div
        className={`h-full p-3 pt-10 lg:pt-1 ${
          navOpen
            ? "w-full lg:w-[calc(100%-300px)]"
            : "w-full lg:pl-10 min-[1900px]:pl-0"
        } max-w-280 ml-auto duration-150 `}
      >
        {renderComponent(activeView)}
      </div>
    </div>
  );
}
