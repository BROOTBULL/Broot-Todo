"use client";
import { ReactNode } from "react";
import { useTodoStore } from "../utils/store/todo.store";
import Inbox from "./Inbox";
import ProjectBox from "./projectBox";
import Search from "./search";
import Today from "./today";

export default function DashBoard() {
  const navOpen = useTodoStore((state) => state.navOpen);
  const activeView = useTodoStore((state) => state.activeView);
  function renderComponent(activeView: string): ReactNode {
    switch (activeView) {
      case "inbox":
        return <Inbox />;
      case "project":
        return <ProjectBox />;
      case "today":
        return <Today />;
      case "search":
        return <Search />;
      default:
        return null; // fallback if no match
    }
  }

  return (
    <div className={`h-full w-[70%] p-5 pb-50 pt-4.5`}>
      <div
        className={`h-full ${
          navOpen ? "w-[calc(100%-300px)]" : "w-full pl-10 min-[1900px]:pl-0"
        } max-w-280 ml-auto duration-150 `}
      >
        {renderComponent(activeView)}
      </div>
    </div>
  );
}
