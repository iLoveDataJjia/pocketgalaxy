export function Header({ text }: { text: string }) {
  return (
    <h1 className="relative">
      <p className={"text-white absolute font-bold"}>{text}</p>
      <p
        className="text-white font-bold select-none"
        style={{ WebkitTextStroke: "4px black" }}
      >
        {text}
      </p>
    </h1>
  );
}
