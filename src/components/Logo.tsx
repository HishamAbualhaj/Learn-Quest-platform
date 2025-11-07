import Link from "next/link";

export default function Logo({ textSize = "text-2xl" }: { textSize: string }) {
  return (
    <Link href="/">
      <div
        className={`dark:text-white text-black ${textSize} py-[18px] font-bold flex gap-1`}
      >
        LEARN <div className="text-purple-600">QUEST</div>
      </div>
    </Link>
  );
}
