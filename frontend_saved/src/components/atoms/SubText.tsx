export function SubText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={"italic text-[6px]" + (className ? ` ${className}` : "")}>
      {text}
    </span>
  );
}
