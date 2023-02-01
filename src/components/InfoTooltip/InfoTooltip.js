import "./InfoTooltip.css";

import { useCallback, useEffect } from "react";

import errorIcon from "../../images/popup-error.svg";
import successIcon from "../../images/popup-success.svg";
import { useTooltip } from "../../hooks/useTooltip";

function InfoTooltip() {
  const { message, isOpened, isSuccess, close } = useTooltip();

  const handleEscClose = useCallback(
    (e) => {
      if (e.code === "Escape") {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [handleEscClose]);

  return (
    <div
      className={`tooltip ${isOpened && "tooltip_opened"}`}
      onClick={() => {
        close();
      }}
    >
      <div
        className="tooltip__container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={close}
          className="tooltip__close"
          type="button"
          aria-label="Закрыть окно"
        />
        <img
          className="tooltip__icon"
          src={isSuccess ? successIcon : errorIcon}
          alt={message}
        />
        <p className="tooltip__icon-caption">{message || ""}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
