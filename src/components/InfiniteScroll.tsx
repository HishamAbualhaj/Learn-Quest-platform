import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";

const InfiniteScroll = () => {
  const [items, setItems] = useState<number[]>(
    Array.from({ length: 20 }, (_, index) => (index = index + 1))
  );
  const [page, setPage] = useState<number>(1);

  const [loading, setLoading] = useState(false);
  const area = useRef<HTMLDivElement | null>(null);

  const observer = useRef<IntersectionObserver>();

  const [lastNode, setLastNode] = useState<HTMLDivElement | null>(null);
  const selectedEle = useCallback((node: HTMLDivElement | null) => {
    setLastNode(node);
  }, []);

  useEffect(() => {
    if (loading || !lastNode || !area.current) return;
    if (observer) observer.current?.disconnect();

    let options = {
      root: area.current,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Item is Intersecting");
          if (!loading) setPage((prev) => prev + 1);
          setLoading(true);
        }
      });
    }, options);

    observer.current.observe(lastNode);
  }, [loading, lastNode]);

  useEffect(() => {
    if (page > 1) {
      setTimeout(() => {
        const arr = Array.from(
          { length: 10 },
          (_, index) => index + (items.at(-1)! + 1)
        );

        setItems((prev) => [...prev, ...arr]);
        setLoading(false);
      }, 1000);
    }

  }, [page]);

  return (
    <div className="flex flex-col gap-5">
      <div
        ref={area}
        className="h-[500px] mt-10 overflow-auto p-5 flex flex-col gap-3 bg-slate-100/50 mx-4"
      >
        {items.map((item) => (
          <div
            ref={items.at(-4) === item ? selectedEle : null}
            className={`border p-2 ${
              items.at(-4) === item ? "bg-red-200" : "bg-slate-200"
            }`}
          >
            {item}
          </div>
        ))}
        {loading && (
          <div className="flex flex-col gap-5">
            <div className="bg-slate-400/20 h-[42px] p-2 animate-pulse"></div>
            <div className="bg-slate-400/20 h-[42px] p-2 animate-pulse"></div>
            <div className="bg-slate-400/20 h-[42px] p-2 animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
