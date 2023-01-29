import { useContext, useState } from "react";

import { tooltipContext } from "../contexts/tooltipContext";

export function TooltipProvider({ children }) {
  const [isSuccess, setIsSuccess] = useState();
  const [message, setMessage] = useState("");
  const [isOpened, setIsOpened] = useState(false);

  function close() {
    setMessage("");
    setIsSuccess(undefined);
    setIsOpened(false);
  }

  function open(message, isSuccess) {
    setIsSuccess(isSuccess);
    setMessage(message);
    setIsOpened(true);
  }

  const value = { message, isOpened, isSuccess, open, close };

  return (
    <tooltipContext.Provider value={value}>{children}</tooltipContext.Provider>
  );
}

export const useTooltip = () => {
  return useContext(tooltipContext);
};
