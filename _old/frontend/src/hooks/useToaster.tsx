import toast, { useToasterStore } from "react-hot-toast";
import { useEffect } from "react";
import { Toaster as ToasterCpt } from "@/components/molecules/Toaster";
import { StatusType } from "@/helpers/StatusType";
import { motion, AnimatePresence } from "framer-motion";

export function useToaster() {
  const notify = (text: string, status: StatusType) =>
    toast.custom((t) => (
      <AnimatePresence>
        {t.visible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <ToasterCpt text={text} status={status} />
          </motion.div>
        )}
      </AnimatePresence>
    ));

  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= 3) // 3 as maximum number of toasts
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return { notify };
}
