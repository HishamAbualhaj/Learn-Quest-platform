export default function BlogSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-md border border-borderLight dark:border-borderDark"
        >
          <div className="aspect-[16/10] bg-mainClr/10 motion-safe:animate-pulse dark:bg-mainClrDark/10" />
          <div className="space-y-4 p-6">
            <div className="h-4 w-24 rounded-md bg-mainClr/10 motion-safe:animate-pulse dark:bg-mainClrDark/10" />
            <div className="h-7 w-4/5 rounded-md bg-mainClr/10 motion-safe:animate-pulse dark:bg-mainClrDark/10" />
            <div className="h-4 w-full rounded-md bg-mainClr/10 motion-safe:animate-pulse dark:bg-mainClrDark/10" />
            <div className="h-4 w-3/4 rounded-md bg-mainClr/10 motion-safe:animate-pulse dark:bg-mainClrDark/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
