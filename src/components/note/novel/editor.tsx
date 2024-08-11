"use client";

import "@/styles/prosemirror.css";

import { useState } from "react";
import {
    EditorRoot,
    EditorContent,
    type JSONContent,
    EditorCommand,
    EditorCommandList,
    EditorCommandItem,
    EditorCommandEmpty,
    EditorBubble
} from "novel";
import { defaultExtensions } from "./extensions";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";

import { slashCommand, suggestionItems } from "./slash-command";

import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { TextButtons } from "./selectors/text-buttons";
import { ColorSelector } from "./selectors/color-selector";

import { Separator } from "@/components/ui/separator";
import { useDebouncedCallback } from "use-debounce";
import { NoteType } from "@/lib/schema";
import { defaultEditorContent } from "./default-content";
import { updateNote } from "@/actions/note";

const extensions = [...defaultExtensions, slashCommand];

interface EditorProp {
    note: NoteType,
}

const Editor = ({ note }: EditorProp) => {

    const content = note ? JSON.parse(note.content) : defaultEditorContent;

    const [title, setTitle] = useState(note ? note.title : "");
    const [saveStatus, setSaveStatus] = useState("Saved");

    const updateContent = useDebouncedCallback(
        async (content: JSONContent) => {
            const updateData = {
                content: JSON.stringify(content),
            };
            await updateNote(note.id, updateData);
            setSaveStatus("Saved");
        },
        500,
    );

    const updateTitle = useDebouncedCallback(
        async (title: string) => {
            await updateNote(note.id, { title });
            setSaveStatus("Saved");
        },
        500,
    );

    const [openNode, setOpenNode] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openLink, setOpenLink] = useState(false);

    return (
        <div className="relative w-full max-w-screen-lg">
            <div className="pl-12">
                <input type="text" placeholder="Untitled"
                    className="text-3xl font-bold bg-transparent"
                    value={title}
                    onChange={(e) => {
                        setSaveStatus("Unsaved");
                        setTitle(e.target.value);
                        updateTitle(e.target.value)
                    }}
                />
            </div>
            <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
                {saveStatus}
            </div>
            <EditorRoot>
                <EditorContent
                    {...(content && { initialContent: content })}
                    extensions={extensions}
                    // className="relative min-h-[500px] w-full max-w-screen-lg border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"
                    editorProps={{
                        handleDOMEvents: {
                            keydown: (_view, event) => handleCommandNavigation(event),
                        },
                        // handlePaste: (view, event) =>
                        //   handleImagePaste(view, event, uploadFn),
                        // handleDrop: (view, event, _slice, moved) =>
                        //   handleImageDrop(view, event, moved, uploadFn),
                        attributes: {
                            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
                        },
                    }}
                    onUpdate={({ editor }) => {
                        setSaveStatus("Unsaved");
                        updateContent(editor.getJSON());
                    }}
                    slotAfter={<ImageResizer />}
                >
                    <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
                        <EditorCommandEmpty className="px-2 text-muted-foreground">
                            No results
                        </EditorCommandEmpty>
                        <EditorCommandList>
                            {suggestionItems.map((item) => (
                                <EditorCommandItem
                                    value={item.title}
                                    onCommand={(val) => item.command && item.command(val)}
                                    className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                                    key={item.title}
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium">{item.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                </EditorCommandItem>
                            ))}
                        </EditorCommandList>
                    </EditorCommand>

                    <EditorBubble
                        tippyOptions={{
                            placement: "top",
                        }}
                        className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
                    >
                        <Separator orientation="vertical" />
                        <NodeSelector open={openNode} onOpenChange={setOpenNode} />
                        <Separator orientation="vertical" />
                        <LinkSelector open={openLink} onOpenChange={setOpenLink} />
                        <Separator orientation="vertical" />
                        <TextButtons />
                        <Separator orientation="vertical" />
                        <ColorSelector open={openColor} onOpenChange={setOpenColor} />
                    </EditorBubble>
                </EditorContent>
            </EditorRoot>
        </div>
    );
};

export default Editor;
