export function StrokedSubText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={
        "italic text-[6px] text-white" + (className ? ` ${className}` : "")
      }
    >
      <p className="absolute">{text}</p>
      <p className="select-none" style={{ WebkitTextStroke: "2px black" }}>
        {text}
      </p>
    </span>
  );
}
