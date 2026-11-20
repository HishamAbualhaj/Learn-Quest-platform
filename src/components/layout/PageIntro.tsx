export default function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 border-b border-borderLight pb-8 pt-4 dark:border-borderDark md:mb-10 md:pb-10">
      <span className="text-sm font-semibold tracking-[2px] text-mainClr dark:text-mainClrDark">
        {eyebrow}
      </span>
      <h1 className="mt-4 text-4xl leading-tight font-semibold tracking-[-0.05em] md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-lightText/65 dark:text-textDark">
        {description}
      </p>
    </div>
  );
}
