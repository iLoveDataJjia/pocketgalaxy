import toast, { useToasterStore } from "react-hot-toast";
import { useEffect } from "react";
import { Toaster } from "../components/molecules/Toaster";
import { motion, AnimatePresence } from "framer-motion";
import { useViewportSize } from "./useViewportSize";

export function useToaster() {
  const { isMd } = useViewportSize();
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= (isMd ? 3 : 2)) // 2-3 as maximum number of toasts
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts, isMd]);

  const notify = (
    text: string,
    status: "success" | "info" | "warning" | "error"
  ) =>
    toast.custom((t) => (
      <AnimatePresence>
        {t.visible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <Toaster text={text} status={status} />
          </motion.div>
        )}
      </AnimatePresence>
    ));
  return { notify };
}
