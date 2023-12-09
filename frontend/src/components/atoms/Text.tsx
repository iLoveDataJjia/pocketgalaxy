interface Props {
  text: string;
  className?: string;
  onClick?: React.MouseEventHandler;
}

export function Text({ text, className, onClick }: Props) {
  return (
    <span
      className={"text-black" + (className ? ` ${className}` : "")}
      onClick={onClick}
    >
      {text}
    </span>
  );
}
