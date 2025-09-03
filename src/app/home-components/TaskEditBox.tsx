import { useTodoStore } from "../utils/store/todo.store";
import EditTask from "./TaskEdit";

export default function TaskEditBox() {
  const selectedTodo = useTodoStore((state) => state.selectedTodo);

  return (
    <>
      {selectedTodo ? (
        <div className="w-full lg:w-[30%] h-[100vh] fixed p-2 pt-14 md:pt-2 right-0 z-102 flex">
          <div className="w-full h-[90%] lg:h-full rounded-lg bg-slate-900 lg:bg-slate-900/50 border-2 border-slate-800 lg:max-w-[600px] drop-shadow-lg/60 p-2 px-4 flex flex-col">
            <EditTask />
          </div>
        </div>
      ) : (
        <div className="w-[30%] h-[100vh] fixed p-2 pt-14 md:pt-2 right-0 z-102 lg:flex hidden">
          <div className="w-full h-full lg:h-full rounded-lg bg-slate-900/50 border-2 border-slate-800 max-w-[600px] text-slate-600 drop-shadow-lg/60 flex items-center justify-center">
            Click on Todo to expand
          </div>
        </div>
      )}
    </>
  );
}
