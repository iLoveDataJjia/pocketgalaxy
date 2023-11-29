export function BodyText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <p className="text-[10px]">{text}</p>;
}
