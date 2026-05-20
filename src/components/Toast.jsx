import { useEffect, useState } from "react";
import { subscribeToast } from "../context/AppContext.jsx";

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsub = subscribeToast((toast) => {
      setToasts([toast]); // keep only the latest
      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    });
    return unsub;
  }, []);

  return (
    <>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={"toast-notification toast-" + toast.type + " toast-show"}
        >
          <i
            className={
              "fas " +
              (toast.type === "success" ? "fa-check-circle" : "fa-exclamation-circle")
            }
          ></i>{" "}
          {toast.message}
        </div>
      ))}
    </>
  );
}
