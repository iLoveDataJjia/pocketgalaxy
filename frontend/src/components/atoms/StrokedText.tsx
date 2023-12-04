interface Props {
  text: string;
  className?: string;
}

export function StrokedText({ text, className }: Props) {
  return (
    <span className={"relative" + (className ? ` ${className}` : "")}>
      <span className="absolute">{text}</span>
      <span className="select-none" style={{ WebkitTextStroke: "3px black" }}>
        {text}
      </span>
    </span>
  );
}
