import { useEffect } from "react";
import * as bootstrap from "bootstrap";

const Toast = ({ title, toastMessage }) => {
  useEffect(() => {
    if (toastMessage) {
      const toast = bootstrap.Toast.getOrCreateInstance(
        document.getElementById("liveToast")
      );
      toast.show();

      setTimeout(() => setToastMessage(""), 2000);
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
        data-bs-delay="2000"
        data-bs-autohide="true"
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
        <div className="toast-body">{toastMessage?.message}</div>
      </div>
    </div>
  );
};

export default Toast;
