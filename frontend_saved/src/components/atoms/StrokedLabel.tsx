export function StrokedLabel({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <label
      className={
        "relative font-bold text-[10px]" + (className ? ` ${className}` : "")
      }
    >
      <p className="absolute">{text}</p>
      <p className="select-none" style={{ WebkitTextStroke: "2px black" }}>
        {text}
      </p>
    </label>
  );
}
