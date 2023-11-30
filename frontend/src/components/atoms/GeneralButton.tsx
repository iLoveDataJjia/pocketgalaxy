export function GeneralButton({
  text,
  color,
  active,
  formAction,
}: {
  text: string;
  color: "post" | "get" | "put";
  active: boolean;
  formAction: (payload: FormData) => void;
}) {
  const bgColor = (() => {
    switch (color) {
      case "post":
        return "bg-emerald-500";
      case "get":
        return "bg-sky-500";
      case "put":
        return "bg-amber-500";
    }
  })();

  return (
    <button
      disabled={!active}
      className={
        "text-xs font-medium opacity-90 h-9 w-32 rounded-lg border-2 border-black" +
        (active ? ` ${bgColor}` : ` bg-transparent`)
      }
      formAction={formAction}
    >
      {text}
    </button>
  );
}
