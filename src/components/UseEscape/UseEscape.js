import React, { useEffect } from "react";

export function UseEscape(closeModal) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);
  return <div>Press ESC to close modal</div>;
}
