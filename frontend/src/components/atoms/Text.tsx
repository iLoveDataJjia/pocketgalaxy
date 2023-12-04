interface Props {
  text: string;
}

export function Text({ text }: Props) {
  return <span>{text}</span>;
}
