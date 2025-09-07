import { useTodoStore } from "../utils/store/todo.store";
import EditTask from "./TaskEdit";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskEditBox() {
  const selectedTodo = useTodoStore((state) => state.selectedTodo);

  return (
    <>
      <AnimatePresence>
        {selectedTodo && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="w-full lg:w-[30%] h-[100vh] fixed pt-14 p-2 lg:p-0 right-0 z-[102] flex"
          >
            <div className="w-full h-[90%] lg:h-full rounded-lg bg-gray-950 lg:bg-gray-950/80 border-1 p-3 border-gray-800/60 lg:max-w-[600px] drop-shadow-lg/60 px-4 flex flex-col">
              <EditTask />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
