"use client";
import TaskEditBox from "../home-components/TaskEditBox";
import DashBoard from "../home-components/Dashboard";
import { HomeHader } from "../landing-components/hader";
import AddWindow from "../home-components/addWindow";
import { useEffect, useState } from "react";
import { useTodoStore } from "../utils/store/todo.store";

export default function Home() {
  const getProjects = useTodoStore((state) => state.getProjects);

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="flex flex-row min-h-[100vh] w-full bg-linear-to-bl from-black/10 via-slate-900/50 to-black/40 ">
      <HomeHader />
      <AddWindow />
      <TaskEditBox />
      <DashBoard />
    </div>
  );
}
