import { useTodoStore } from "../utils/store/todo.store";
import EditTask from "./TaskEdit";

export default function TaskEditBoxSm() {
  const selectedTodo = useTodoStore((state) => state.selectedTodo);

  return (
    <>
      {selectedTodo && (
        <div className="w-full h-[100vh] fixed p-2 md:p-5 right-0 flex lg:hidden z-102 items-center">
          <div className="w-full h-[92%] rounded-lg bg-slate-900 border-2 border-slate-800 drop-shadow-lg/60 p-2 px-4 flex flex-col">
            <EditTask />
          </div>
        </div>
      )}
    </>
  );
}
