import { useTodoStore } from "../utils/store/todo.store";
import EditTask from "./TaskEdit";

export default function TaskEditBox() {
  const selectedTodo = useTodoStore((state) => state.selectedTodo);

  return (
    <div className="w-[30%] h-[100vh] fixed p-2 right-0 z-1 hidden lg:flex">
      <div className="w-full h-full rounded-lg bg-slate-900/50 border-2 border-slate-800 max-w-[600px] drop-shadow-lg/60 p-2 px-4 flex flex-col">
        {selectedTodo ? (
          <EditTask />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[70%] text-slate-600 text-sm text-center">
              Double-click a task to view details
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
