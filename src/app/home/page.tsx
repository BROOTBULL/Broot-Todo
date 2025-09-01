"use client"
import TaskEdit from "../home-components/TaskEdit";
import TodoList from "../home-components/Dashboard";
import { HomeHader } from "../landing-components/hader";
import AddWindow from "../home-components/addWindow";
import { useEffect } from "react";
import { useTodoStore } from "../utils/store/todo.store";


export default function Home() {

const getProjects=useTodoStore((state)=>state.getProjects)

useEffect(()=>{
   getProjects()
},[])


  return (
    <div className="flex flex-row min-h-[100vh] w-full bg-linear-to-bl from-black/10 via-slate-900/50 to-black/40 ">
      <HomeHader />
      <AddWindow />
      <TaskEdit/>
      <TodoList/>
    </div>
  );
}
