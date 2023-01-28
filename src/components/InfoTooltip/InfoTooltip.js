import "./InfoTooltip.css";

import { useCallback, useEffect } from "react";

import errorIcon from "../../images/popup-error.svg";
import successIcon from "../../images/popup-success.svg";

function InfoTooltip({ isOpen, onClose, error }) {
  const successMessage = "Запрос выполнен успешно!";

  const icon = error ? errorIcon : successIcon;
  const message = error || successMessage;

  const handleEscClose = useCallback(
    (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [handleEscClose]);

  return (
    <div
      className={`tooltip ${isOpen && "tooltip_opened"}`}
      onClick={() => {
        onClose();
      }}
    >
      <div
        className="tooltip__container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={onClose}
          className="tooltip__close"
          type="button"
          aria-label="Закрыть окно"
        />
        <img className="tooltip__icon" src={icon} alt={message} />
        <p className="tooltip__icon-caption">{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
