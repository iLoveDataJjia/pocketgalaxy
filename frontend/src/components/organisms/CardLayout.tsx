import { BorderBox } from "../atoms/BorderBox";
import { Text } from "../atoms/Text";

interface Props {
  title: string;
  // onRefresh?: React.MouseEventHandler;
  // onClose?: React.MouseEventHandler;
  Img: ({ className }: { className: string }) => JSX.Element;
  desc: string[];
  botLeft?: { text: string; onClick?: React.MouseEventHandler };
  // botRight?: { text: string; onClick?: React.MouseEventHandler };
}

export function CardLayout({
  title,
  // onRefresh,
  // onClose,
  Img,
  desc,
  botLeft,
}: // botRight,
Props) {
  return (
    <BorderBox
      rounded="xl"
      className="w-64 h-32 pt-2 pb-1 px-3 flex flex-col justify-between"
    >
      <header className="flex w-3/5">
        <Text text={title} className="font-semibold truncate" />
      </header>
      <div className="flex items-center mx-3 space-x-4">
        <div className="w-14 h-14 flex items-center justify-center">
          <Img className="select-none max-w-full max-h-full" />
        </div>
        <div className="flex flex-col text-sm">
          {desc
            .filter((_, idx) => idx <= 2)
            .map((text, idx) => (
              <Text text={text} key={idx} />
            ))}
        </div>
      </div>
      <footer>
        {botLeft && (
          <Text
            text={botLeft.text}
            className="italic text-xs cursor-pointer"
            onClick={botLeft.onClick}
          />
        )}
      </footer>
    </BorderBox>
  );
}
