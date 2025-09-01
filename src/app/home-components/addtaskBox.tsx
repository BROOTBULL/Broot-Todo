import Image from "next/image";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import TextareaAutosize from "react-textarea-autosize";
import { Project, Section, useTodoStore } from "../utils/store/todo.store";
import axios from "axios";

export type TodoInput = {
  task: string;
  description: string;
  project: string;
  status: string;
  section: string;
  dueDate: Date | null; // 👈 allow null
  priority: number;
};

export default function AddTaskBox({
  setAddTaskTodoBox,
}: {
  setAddTaskTodoBox: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const activeProject = useTodoStore((state) => state.activeProject);
  const setAddBox = useTodoStore((state) => state.setAddBox);
  const projectData = useTodoStore((state) => state.projectData);
  const getProjects = useTodoStore((state) => state.getProjects);
  const InboxProject = projectData.find((project) => project.isInbox === true);

  const [priorityBox, setPriorityBox] = useState(false);
  const [projectBox, setProjectBox] = useState(false);
  const [sectionBox, setSectionBox] = useState(false);
  const [projectSelected, setProjectSelected] = useState<Project>({
    _id: "",
    title: "",
    isInbox: false,
    sections: [],
    owner: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });
  const [sectionSelected, setSectionSelected] = useState<Section | null>(null);
  const [newtask, setnewTask] = useState<TodoInput>({
    task: "",
    description: "",
    project: "",
    status: "pending",
    section: "",
    dueDate: null,
    priority: 4,
  });

  useEffect(() => {
    if (InboxProject) {
      setProjectSelected(
        activeProject.title !== "" ? activeProject : InboxProject
      );
      setSectionSelected(
        projectSelected.isInbox ? InboxProject.sections[0] : null
      );
    }
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setnewTask((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const UserInput = await axios.post("/api/todo", {
        task: newtask.task,
        description: newtask.description,
        projectId: projectSelected ? projectSelected._id : InboxProject?._id,
        sectionId: sectionSelected
          ? sectionSelected._id
          : projectSelected.isInbox
          ? InboxProject?.sections[0]._id
          : null,
        dueDate: newtask.dueDate || null,
        priority: newtask.priority,
      });

      console.log("Task created:", UserInput.data);
    } catch (err) {
      console.error("Error creating task:", err);
    }
    await getProjects();
    setAddBox(null);
    setAddTaskTodoBox(false);
    setnewTask({
      task: "",
      description: "",
      project: "Inbox",
      status: "pending",
      section: "",
      dueDate: null,
      priority: 4,
    });
    setProjectSelected(
      activeProject.title !== "" ? activeProject : InboxProject!
    );
    setSectionSelected(null);
  }

  return (
    <form
      id="taskForm"
      onSubmit={handleSubmit}
      className="bg-slate-950/60 border-1 border-slate-700 p-5 h-fit rounded-md shadow-lg w-full text-center drop-shadow-2xl/80 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-fit w-full scroll-smooth overflow-auto flex flex-col">
        <input
          onChange={handleChange}
          className="text-xl outline-none p-1"
          type="text"
          name="task"
          autoComplete="off"
          value={newtask.task}
          id="task"
          placeholder="Task name"
          required
        ></input>
        <TextareaAutosize
          minRows={2}
          maxRows={6}
          onChange={handleChange}
          className="p-1 resize-none scroll-auto outline-none custom-scroll"
          name="description"
          placeholder="Description"
          value={newtask.description}
          id="description"
          required
        />
      </div>
      <div className="flex flex-col w-full h-fit items-center justify-start">
        <div className="flex flex-row w-full gap-1.5 ">
          <DatePicker
            selected={newtask.dueDate ? newtask.dueDate : null}
            onChange={(date) => {
              setnewTask((prev) => ({
                ...prev,
                dueDate: date,
              }));
            }}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy" // or "yyyy-MM-dd"
            className="border-1 border-slate-600/50 p-2 rounded-md w-25 h-8 outline-0 cursor-pointer text-slate-300 text-sm tracking-wider"
            calendarClassName="custom-calendar"
            placeholderText="Date"
          />
          <div
            onClick={() => {
              setPriorityBox(!priorityBox);
            }}
            className="h-8 px-3 text-sm border-1 text-slate-300 border-slate-600/50 rounded-md flex flex-row items-center cursor-pointer hover:bg-slate-800"
          >
            <Image
              src="/media/priority.png"
              className="size-4 mr-1"
              alt="Logo"
              width={20}
              height={20}
            />
            Priority
            {priorityBox && (
              <div className="h-9 w-fit p-2 bg-slate-800 absolute ml-20 rounded-md flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setnewTask((prev) => ({
                      ...prev,
                      priority: 1,
                    }))
                  }
                  className="h-5 hover:bg-slate-700/60 rounded cursor-pointer bg-red-500/40 size-6"
                >
                  {" "}
                  1
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setnewTask((prev) => ({
                      ...prev,
                      priority: 2,
                    }))
                  }
                  className="h-5 hover:bg-slate-700/60 rounded cursor-pointer bg-yellow-500/40 size-6"
                >
                  {" "}
                  2
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setnewTask((prev) => ({
                      ...prev,
                      priority: 3,
                    }))
                  }
                  className="h-5 hover:bg-slate-700/60 rounded cursor-pointer bg-green-500/40 size-6"
                >
                  {" "}
                  3
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setnewTask((prev) => ({
                      ...prev,
                      priority: 4,
                    }))
                  }
                  className="h-5 hover:bg-slate-700/60 rounded cursor-pointer bg-blue-500/40 size-6"
                >
                  {" "}
                  4
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="bg-slate-600/40 my-2 w-full h-0.5 rounded-full" />
        <div className="flex flex-row w-full h-8 gap-1.5">
          <button
            onClick={() => {
              setProjectBox(!projectBox);
            }}
            type="button"
            className="h-8 w-fit px-3 text-sm border-1 text-slate-300 border-slate-600/50 rounded-md flex flex-row items-center cursor-pointer hover:bg-slate-800"
          >
            <Image
              src="/media/hashtag.png"
              className="size-4 mr-1"
              alt="Logo"
              width={20}
              height={20}
            />
            {projectSelected.title && projectSelected.title !== ""
              ? projectSelected.title
              : "Inbox"}
            <Image
              src="/media/dropDown.png"
              className="size-4 ml-1"
              alt="Logo"
              width={20}
              height={20}
            />
          </button>
          {projectBox && (
            <div className="bg-linear-to-tr from-slate-900 to-slate-800 h-fit max-h-50 w-50 absolute -left-6 mt-10 rounded gap-1 flex flex-col p-2">
              {projectData.length > 0 ? (
                projectData.map((project, i) => {
                  return (
                    <div key={i}>
                      <button
                        onClick={() => {
                          setProjectSelected(project);
                          setProjectBox(false);
                        }}
                        type="button"
                        className="h-8 w-full px-3 text-sm rounded-md flex flex-row items-center ml-auto cursor-pointer border-b-1 border-slate-600 hover:bg-slate-500/50 duration-200"
                      >
                        {"#"} {project.title}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="h-8 w-full px-3 text-sm rounded-md flex flex-row items-center ml-auto cursor-default border-b-1 border-slate-600">
                  No Projects
                  <div />
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => {
              setSectionBox(!sectionBox);
            }}
            type="button"
            className={`h-8 w-fit px-3 text-sm border-1 text-slate-300 border-slate-600/50 rounded-md flex flex-row items-center ${
              (projectSelected && !projectSelected.isInbox )
                ? " cursor-pointer"
                : "brightness-50 "
            } hover:bg-slate-800`}
          >
            <Image
              src="/media/hashtag.png"
              className="size-4 mr-1"
              alt="Logo"
              width={20}
              height={20}
            />
            {sectionSelected ? sectionSelected.name : "Select Sections"}
            <Image
              src="/media/dropDown.png"
              className="size-4 ml-1"
              alt="Logo"
              width={20}
              height={20}
            />
          </button>
          {sectionBox && projectSelected && !projectSelected.isInbox && (
            <div className="bg-linear-to-tr from-slate-900 to-slate-800 h-fit max-h-50 w-50 absolute left-24 mt-10 rounded gap-1 flex flex-col p-2 z-30">
              {projectData.length > 0 && projectSelected ? (
                projectSelected.sections.map((section, i) => {
                  return (
                    <div key={i}>
                      <button
                        type="button"
                        onClick={() => {
                          setSectionSelected(section);
                          setSectionBox(false);
                        }}
                        className="h-8 w-full px-3 text-sm rounded-md flex flex-row items-center ml-auto cursor-pointer border-b-1 border-slate-600 hover:bg-slate-500/50 duration-200"
                      >
                        {"#"} {section.name}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="h-8 w-full px-3 text-sm rounded-md flex flex-row items-center ml-auto cursor-default border-b-1 border-slate-600">
                  No Projects
                  <div />
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => {
              setAddBox(null);
              setAddTaskTodoBox(false);
            }}
            type="button"
            className="h-8 w-fit px-3 text-sm bg-slate-700 rounded-md flex flex-row items-center ml-auto cursor-pointer hover:bg-slate-500/70 duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="taskForm"
            className="h-8 w-fit px-3 text-sm text-slate-100 bg-rose-800/80 drop-shadow-md rounded-md flex flex-row items-center cursor-pointer hover:bg-rose-950 duration-200"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
