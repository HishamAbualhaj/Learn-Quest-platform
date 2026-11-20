"use client";
import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const mount = useRef<HTMLDivElement | null>(null);
  const change = useRef(onChange);
  const initial = useRef(value);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    change.current = onChange;
  }, [onChange]);
  useEffect(() => {
    let active = true;
    let dispose: (() => void) | undefined;
    import("quill")
      .then(({ default: Quill }) => {
        if (!active || !mount.current) return;
        const host = mount.current;
        const element = document.createElement("div");
        host.appendChild(element);
        const editor = new Quill(element, {
          theme: "snow",
          placeholder: "Share your story...",
          modules: {
            toolbar: [
              [{ header: [2, 3, false] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "clean"],
            ],
          },
        });
        editor.clipboard.dangerouslyPasteHTML(initial.current);
        setReady(true);
        editor.root.setAttribute("role", "textbox");
        editor.root.setAttribute("aria-label", "Post content");
        editor.root.setAttribute("aria-multiline", "true");
        const handler = () => change.current(editor.getSemanticHTML());
        editor.on("text-change", handler);
        const labels: Record<string, string> = {
          bold: "Bold",
          italic: "Italic",
          underline: "Underline",
          list: "List",
          link: "Insert link",
          clean: "Clear formatting",
        };
        host.querySelectorAll(".ql-toolbar button").forEach((button) => {
          const key =
            Array.from(button.classList)
              .find((name) => name.startsWith("ql-"))
              ?.slice(3) || "";
          button.setAttribute("type", "button");
          button.setAttribute(
            "aria-label",
            key === "list"
              ? `${button.getAttribute("value")} list`
              : labels[key] || key,
          );
        });
        host
          .querySelectorAll(".ql-picker-label")
          .forEach((picker) => picker.setAttribute("aria-label", "Text style"));
        dispose = () => {
          editor.off("text-change", handler);
          host.replaceChildren();
        };
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
      dispose?.();
    };
  }, []);
  return (
    <>
      {!ready && !failed && (
        <p role="status" className="p-5 text-sm text-muted-foreground">
          Preparing your writing space...
        </p>
      )}
      {failed ? (
        <p role="alert" className="p-5 text-sm">
          The editor could not be loaded. Refresh this page to try again.
        </p>
      ) : (
        <div ref={mount} />
      )}
    </>
  );
}
