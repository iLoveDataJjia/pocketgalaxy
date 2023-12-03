interface Props {
  text: string;
}

export function StrokedText({ text }: Props) {
  return <span>{text}</span>;
}
