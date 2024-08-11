import { v4 as uuidv4 } from 'uuid'
import { type InferSelectModel } from "drizzle-orm"
import {
    integer,
    text,
    sqliteTable,
    AnySQLiteColumn
} from "drizzle-orm/sqlite-core"


export const tasksTable = sqliteTable("task", {
    id: text("id").notNull()
        .primaryKey().$defaultFn(uuidv4),
    title: text("title").notNull(),
    description: text("description"),
    isCompleted: integer("is_completed", { mode: "boolean" })
        .default(false),
    addedToMyDayManually: integer("added_to_my_day_manually", { mode: "boolean" }),
    addedToMyDayAutomatically: integer("added_to_my_day_automatically", { mode: "boolean" }),
    isImportant: integer("is_important", { mode: "boolean" })
        .default(false),
    createdAt: text("created_at"),
    updatedAt: text("updated_at"),
    dueDate: text("due_date"),
    reminderDate: text("reminder_date"),
    completeDate: text("complete_date"),
    priority: integer("priority"),
})

export const notesTable = sqliteTable("note", {
    id: text("id").notNull()
        .primaryKey().$defaultFn(uuidv4),
    parentId: text("parent_id")
        .references((): AnySQLiteColumn => notesTable.id, { onDelete: "cascade" }),
    title: text("title").notNull().default(""),
    // emoji: text("emoji"),
    content: text("content").notNull(),
})

export type NoteType = InferSelectModel<typeof notesTable>

export const chatsTable = sqliteTable("chat", {
    id: text("id").notNull()
        .primaryKey().$defaultFn(uuidv4),
    title: text("title").notNull().default(""),
    history: text("history").notNull().default("[]"),
})

export type ChatType = InferSelectModel<typeof chatsTable>