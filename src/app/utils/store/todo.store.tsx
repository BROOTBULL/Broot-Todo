import axios from "axios";
import { create } from "zustand";

export interface Todo {
  _id: string;
  task: string;
  description: string;
  priority: 1 | 2 | 3 | 4;
  status: "pending" | "in-progress" | "done";
  project: { title: string; _id: string };
  section: { name: string; _id: string };
  dueDate: Date | null;
  createdAt: string;
  updatedAt: string;
  user: string;
  __v: number;
}

export interface Section {
  _id: string;
  name: string;
  todos: Todo[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Project {
  _id: string;
  title: string;
  isInbox: boolean;
  sections: Section[];
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface TodoStore {
  addBox: string | null;
  navOpen: boolean;
  activeView: string;
  activeProject: Project;
  addTaskTodo: boolean;
  loading: boolean;
  setAddBox: (value: string | null) => void;
  setNavOpen: (value: boolean) => void;
  setActiveView: (value: string) => void;
  setActiveProject: (value: Project) => void;
  setAddTaskTodo: (value: boolean) => void;
  getProjects: () => Promise<void>;
  projectData: Project[];
  selectedTodo: Todo | null;
  setSelectedTodo: (value: Todo | null) => void;
  getTodos: () => Promise<void>;
  todoData: Todo[];
}

export const useTodoStore = create<TodoStore>((set) => ({
  addBox: null,
  navOpen: false,
  activeView: "inbox",
  activeProject: {
    _id: "",
    title: "",
    isInbox: false,
    sections: [],
    owner: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
  addTaskTodo: false,
  loading: false,
  setAddBox: (value) => set({ addBox: value }),
  setNavOpen: (value) => set({ navOpen: value }),
  setActiveView: (value) => set({ activeView: value }),
  setAddTaskTodo: (value) => set({ addTaskTodo: value }),
  setActiveProject: (value) => set({ activeProject: value }),
  getProjects: async () => {
    set({ loading: true }); // start loading
    try {
      const projectsResponse = await axios.get<Project[]>("/api/projects", {
        withCredentials: true,
      });
      const projects = projectsResponse.data;
      set({ projectData: projects });
      console.log(projects);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      set({ loading: false }); // stop loading
    }
  },
  projectData: [],
  selectedTodo: null,
  setSelectedTodo: (value) => set({ selectedTodo: value }),
  getTodos: async () => {
    set({ loading: true }); // start loading
    try {
      const todosResponse = await axios.get("/api/todo", {
        withCredentials: true,
      });
      const todos = todosResponse.data.todos;
      set({ todoData: todos });
      console.log(todos);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      set({ loading: false }); // stop loading
    }
  },
  todoData: [],
}));
