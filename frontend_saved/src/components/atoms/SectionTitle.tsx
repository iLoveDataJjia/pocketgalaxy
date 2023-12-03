export function SectionTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h2 className={"font-medium text-xs" + (className ? ` ${className}` : "")}>
      {text}
    </h2>
  );
}
