import React, { FunctionComponent, useRef } from "react";
import { useOutsideAlerter } from "../../hooks/outsideClick.hook";
import { Button } from "../Button/Button";

interface IModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose?: (...params: any) => void;
  onConfirm?: (...params: any) => void;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  closeButtonText?: string;
  title?: string;
  children?: any;
  isSubmitting?: boolean;
}

export const Modal: FunctionComponent<IModalProps> = (props) => {
  let {
    isOpen,
    setIsOpen,
    onClose,
    onConfirm,
    showCloseButton = true,
    showConfirmButton = true,
    confirmButtonText = "Confirm",
    closeButtonText = "Close",
    isSubmitting = false,
    title,
    children,
  } = props;

  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => setIsOpen(false));

  return isOpen ? (
    <div className="fixed top-0 left-0 right-0 w-100 h-full bg-transparent backdrop-blur-sm z-20 grid place-items-center">
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-4 shadow-xl lg:max-w-[50%]"
      >
        {title && <h1 className="font-bold mb-3">{title}</h1>}
        <div className="mb-4">{children}</div>
        <div className="flex items-center justify-end">
          {showCloseButton && (
            <Button
              color="danger"
              disabled={isSubmitting}
              accessKey="c"
              onClick={() => {
                setIsOpen(false);
                if (onClose) {
                  onClose();
                }
              }}
            >
              {closeButtonText}
            </Button>
          )}
          {showConfirmButton && (
            <div className="ml-2">
              <Button
                disabled={isSubmitting}
                accessKey="s"
                onClick={() => {
                  setIsOpen(false);
                  if (onConfirm) {
                    onConfirm();
                  }
                }}
              >
                {confirmButtonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};
