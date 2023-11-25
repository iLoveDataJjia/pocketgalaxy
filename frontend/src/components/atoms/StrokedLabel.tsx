export function StrokedLabel({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <label
      className={"relative text-[10px]" + (className ? ` ${className}` : "")}
    >
      <p className={"font-bold absolute"}>{text}</p>
      <p
        className={"font-bold select-none"}
        style={{ WebkitTextStroke: "2px black" }}
      >
        {text}
      </p>
    </label>
  );
}
