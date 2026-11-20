"use client";
import { useEffect, useState, type ReactNode } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { TextStyle, Color } from "@tiptap/extension-text-style";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Dialog } from "radix-ui";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlighter,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Code,
  Minus,
  Link2,
  Unlink,
  ImagePlus,
  Table2,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RemoveFormatting,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { cn } from "@/lib/utils";
export default function RichTextEditor({
  value,
  onChange,
  label = "Post content",
  placeholder = "Share your story...",
  disabled = false,
  className,
}: {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [dialog, setDialog] = useState<"link" | "image" | null>(null);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [error, setError] = useState("");
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, protocols: ["http", "https", "mailto"] },
      }),
      TableKit,
      Image.configure({ allowBase64: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      Placeholder.configure({ placeholder }),
      CharacterCount,
      TextStyle,
      Color,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: value,
    editable: !disabled,
    editorProps: {
      attributes: {
        class: "rich-content min-h-[360px] p-5 outline-none",
        role: "textbox",
        "aria-label": label,
        "aria-multiline": "true",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? "" : editor.getHTML()),
  });
  useEditorState({
    editor,
    selector: ({ transactionNumber }) => transactionNumber,
  });
  useEffect(() => {
    if (editor && value !== editor.getHTML() && !(editor.isEmpty && !value))
      editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);
  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [editor, disabled]);
  if (!editor)
    return (
      <p role="status" className="p-5 text-sm text-muted-foreground">
        Preparing your writing space...
      </p>
    );
  function tool(
    name: string,
    icon: ReactNode,
    run: () => void,
    active = false,
    blocked = false,
  ) {
    return (
      <Button
        key={name}
        type="button"
        variant="ghost"
        className={cn(
          "size-11 shrink-0",
          active && "bg-mainClr/15 text-mainClr dark:text-mainClrDark",
        )}
        aria-label={name}
        title={name}
        aria-pressed={active}
        disabled={disabled || blocked}
        onClick={run}
      >
        {icon}
      </Button>
    );
  }
  function open(type: "link" | "image") {
    setDialog(type);
    setUrl(type === "link" ? editor!.getAttributes("link").href || "" : "");
    setAlt("");
    setError("");
  }
  function insert() {
    let parsed: URL;
    try {
      parsed = new URL(url.trim());
      if (
        !(
          dialog === "image"
            ? ["https:", "http:"]
            : ["https:", "http:", "mailto:"]
        ).includes(parsed.protocol)
      )
        throw Error();
    } catch {
      setError(
        "Enter a valid URL using https:// or http://" +
          (dialog === "link" ? ", or a mailto: link." : "."),
      );
      return;
    }
    if (dialog === "image" && !alt.trim()) {
      setError("Describe the image for readers using assistive technology.");
      return;
    }
    if (dialog === "image")
      editor!
        .chain()
        .focus()
        .setImage({ src: parsed.href, alt: alt.trim() })
        .run();
    else
      editor!
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: parsed.href })
        .run();
    setDialog(null);
  }
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-input bg-control",
        className,
      )}
    >
      <div
        role="group"
        aria-label="Text formatting"
        className="flex flex-wrap items-center gap-1 border-b border-input bg-lightLayout/60 p-2 dark:bg-dark/40"
      >
        <div className="w-36">
          <FormSelect
            aria-label="Text style"
            value={
              editor.isActive("heading", { level: 2 })
                ? "h2"
                : editor.isActive("heading", { level: 3 })
                  ? "h3"
                  : editor.isActive("heading", { level: 4 })
                    ? "h4"
                    : "paragraph"
            }
            disabled={disabled}
            onChange={(e) =>
              e.target.value === "paragraph"
                ? editor.chain().focus().setParagraph().run()
                : editor
                    .chain()
                    .focus()
                    .toggleHeading({
                      level: Number(e.target.value.slice(1)) as 2 | 3 | 4,
                    })
                    .run()
            }
          >
            <option value="paragraph">Paragraph</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
          </FormSelect>
        </div>
        {tool(
          "Bold",
          <Bold />,
          () => editor.chain().focus().toggleBold().run(),
          editor.isActive("bold"),
        )}
        {tool(
          "Italic",
          <Italic />,
          () => editor.chain().focus().toggleItalic().run(),
          editor.isActive("italic"),
        )}
        {tool(
          "Underline",
          <Underline />,
          () => editor.chain().focus().toggleUnderline().run(),
          editor.isActive("underline"),
        )}
        {tool(
          "Strikethrough",
          <Strikethrough />,
          () => editor.chain().focus().toggleStrike().run(),
          editor.isActive("strike"),
        )}
        {tool(
          "Highlight",
          <Highlighter />,
          () => editor.chain().focus().toggleHighlight().run(),
          editor.isActive("highlight"),
        )}
        <label className="flex min-h-11 items-center gap-2 px-2 text-sm">
          Text color
          <input
            aria-label="Text color"
            type="color"
            value={editor.getAttributes("textStyle").color || "#7c3aed"}
            disabled={disabled}
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
            className="size-8 cursor-pointer rounded-md border border-input"
          />
        </label>
        {tool(
          "Bullet list",
          <List />,
          () => editor.chain().focus().toggleBulletList().run(),
          editor.isActive("bulletList"),
        )}
        {tool(
          "Numbered list",
          <ListOrdered />,
          () => editor.chain().focus().toggleOrderedList().run(),
          editor.isActive("orderedList"),
        )}
        {tool(
          "Task list",
          <ListTodo />,
          () => editor.chain().focus().toggleTaskList().run(),
          editor.isActive("taskList"),
        )}
        {tool(
          "Blockquote",
          <Quote />,
          () => editor.chain().focus().toggleBlockquote().run(),
          editor.isActive("blockquote"),
        )}
        {tool(
          "Code block",
          <Code />,
          () => editor.chain().focus().toggleCodeBlock().run(),
          editor.isActive("codeBlock"),
        )}
        {tool("Divider", <Minus />, () =>
          editor.chain().focus().setHorizontalRule().run(),
        )}
        {tool(
          "Align left",
          <AlignLeft />,
          () => editor.chain().focus().setTextAlign("left").run(),
          editor.isActive({ textAlign: "left" }),
        )}
        {tool(
          "Align center",
          <AlignCenter />,
          () => editor.chain().focus().setTextAlign("center").run(),
          editor.isActive({ textAlign: "center" }),
        )}
        {tool(
          "Align right",
          <AlignRight />,
          () => editor.chain().focus().setTextAlign("right").run(),
          editor.isActive({ textAlign: "right" }),
        )}
        {tool(
          "Insert link",
          <Link2 />,
          () => open("link"),
          editor.isActive("link"),
        )}
        {tool(
          "Remove link",
          <Unlink />,
          () => editor.chain().focus().unsetLink().run(),
          false,
          !editor.isActive("link"),
        )}
        {tool("Insert image", <ImagePlus />, () => open("image"))}
        {tool("Insert table", <Table2 />, () =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run(),
        )}
        {tool("Clear formatting", <RemoveFormatting />, () =>
          editor.chain().focus().unsetAllMarks().clearNodes().run(),
        )}
        {tool(
          "Undo",
          <Undo2 />,
          () => editor.chain().focus().undo().run(),
          false,
          !editor.can().undo(),
        )}
        {tool(
          "Redo",
          <Redo2 />,
          () => editor.chain().focus().redo().run(),
          false,
          !editor.can().redo(),
        )}
      </div>
      {editor.isActive("table") && (
        <div
          role="group"
          aria-label="Table editing"
          className="flex flex-wrap gap-2 border-b border-input p-3"
        >
          {[
            {
              name: "Add row",
              run: () => editor.chain().focus().addRowAfter().run(),
            },
            {
              name: "Add column",
              run: () => editor.chain().focus().addColumnAfter().run(),
            },
            {
              name: "Delete row",
              run: () => editor.chain().focus().deleteRow().run(),
            },
            {
              name: "Delete column",
              run: () => editor.chain().focus().deleteColumn().run(),
            },
            {
              name: "Delete table",
              run: () => editor.chain().focus().deleteTable().run(),
            },
          ].map((item) => (
            <Button
              key={item.name}
              type="button"
              variant="outline"
              className="min-h-11"
              disabled={disabled}
              onClick={item.run}
            >
              {item.name}
            </Button>
          ))}
        </div>
      )}
      <EditorContent editor={editor} />
      <div className="flex flex-wrap justify-between gap-3 border-t border-input px-5 py-3 text-sm text-muted-foreground">
        <span>{editor.storage.characterCount.words()} words</span>
        <span>{editor.storage.characterCount.characters()} characters</span>
      </div>
      <Dialog.Root
        open={dialog !== null}
        onOpenChange={(open) => {
          if (!open) setDialog(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/60" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-[71] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md border border-input bg-white p-6 text-lightText outline-none dark:bg-dark dark:text-white">
            <Dialog.Title className="text-xl font-semibold">
              {dialog === "image" ? "Insert image" : "Insert link"}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm leading-7 text-muted-foreground">
              {dialog === "image"
                ? "Use a public image URL and describe what the image shows."
                : "Add a destination for the selected text."}
            </Dialog.Description>
            <label className="mt-5 mb-2 block text-sm" htmlFor="editor-url">
              URL
            </label>
            <Input
              id="editor-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://"
            />
            {dialog === "image" && (
              <>
                <label className="mt-4 mb-2 block text-sm" htmlFor="editor-alt">
                  Image description
                </label>
                <Input
                  id="editor-alt"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                />
              </>
            )}
            {error && (
              <p
                role="alert"
                className="mt-3 text-sm text-red-700 dark:text-red-300"
              >
                {error}
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <Dialog.Close asChild>
                <Button type="button" variant="outline" className="min-h-11">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="button" className="min-h-11" onClick={insert}>
                Insert
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
