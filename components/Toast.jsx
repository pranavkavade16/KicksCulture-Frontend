import { useEffect } from "react";
import * as bootstrap from "bootstrap";

const Toast = ({ title, toastMessage }) => {
  useEffect(() => {
    if (toastMessage) {
      const toastEl = document.getElementById("liveToast");
      if (toastEl) {
        const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
        toast.show();
      }
    }
  }, [toastMessage]);

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        id="liveToast"
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">{title}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{toastMessage}</div>
      </div>
    </div>
  );
};

export default Toast;
