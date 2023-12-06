interface Props {
  text: string;
  className?: string;
}

export function StrokedText({ text, className }: Props) {
  return (
    <span className={className ? ` ${className}` : ""}>
      <span className="relative">
        <span className="absolute inset-0 flex items-center justify-center">
          {text}
        </span>
        <span className="select-none" style={{ WebkitTextStroke: "3px black" }}>
          {text}
        </span>
      </span>
    </span>
  );
}
