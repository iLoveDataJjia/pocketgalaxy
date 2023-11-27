export function SectionTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={"font-medium text-xs" + className ? ` ${className}` : ""}>
      {text}
    </p>
  );
}
