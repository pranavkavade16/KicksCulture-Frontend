import { useEffect } from "react";
import * as bootstrap from "bootstrap";

const Toast = ({ title, toastMessage }) => {
  useEffect(() => {
    if (toastMessage) {
      const toastLiveExample = document.getElementById("liveToast");
      const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastBootstrap.show();
    }
  }, [toastMessage]);

  return (
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        id="liveToast"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <strong class="me-auto">{title}</strong>
          <small></small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">{toastMessage}</div>
      </div>
    </div>
  );
};

export default Toast;
