import mongoose, { Schema, models } from "mongoose";

// Todo Schema
const TodoSchema = new Schema(
  {
    task: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, default: null },
    priority: { type: Number, default: 4 },
    status: { type: String, enum: ["pending", "in-progress", "done"], default: "pending" },
    project: { type: Schema.Types.ObjectId, ref: "Project" }, 
    section: { type: Schema.Types.ObjectId, ref: "Section" }, 
    user: { type: Schema.Types.ObjectId, ref: "User",required:true }, 
  },
  { timestamps: true }
);


// Section Schema
const SectionSchema = new Schema(
  {
    name: { type: String, required: true },
    todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
  },
  { timestamps: true }
);

// Project Schema
const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
    isInbox:{type:Boolean,default:false},
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, // link to user
  },
  { timestamps: true }
);

// Prevent model overwrite in Next.js
export const Todo = models.Todo || mongoose.model("Todo", TodoSchema);
export const Section =
  models.Section || mongoose.model("Section", SectionSchema);
export const Project =
  models.Project || mongoose.model("Project", ProjectSchema);
