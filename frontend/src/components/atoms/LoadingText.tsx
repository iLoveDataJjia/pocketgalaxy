import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  onClick?: React.MouseEventHandler;
}

export function LoadingText({ text, className, onClick }: Props) {
  const [idx, setIdx] = useState(0);

  const texts = [`${text}`, `${text} .`, `${text} . .`, `${text} . . .`];
  const nextText = () => setIdx((_) => (_ + 1) % texts.length);
  return (
    <motion.span
      className={"text-black" + (className ? ` ${className}` : "")}
      onClick={onClick}
      key={idx}
      initial={{ opacity: 1 }}
      animate={{
        opacity: 1.01,
        transition: { delay: 0.25 },
      }}
      onAnimationComplete={nextText}
    >
      {texts[idx]}
    </motion.span>
  );
}
