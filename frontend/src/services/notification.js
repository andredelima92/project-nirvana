import Swal from "sweetalert2";

const notification = {
  $s: function (text, title = false, modal = false) {
    if (modal) {
      this.notify(text, title, "success", false, "center");
    } else {
      this.notify(text, title, "success");
    }
  },
  $e: function (message, title = false) {
    if (typeof message == "string") {
      this.notify(message, title, "error");
    }
  },

  notify: function (
    text,
    title,
    icon,
    toast = true,
    position = "bottom-end",
    timer = 5000,
    showConfirmButton = false
  ) {
    return Swal.fire({
      title,
      html: text,
      icon,
      toast,
      timer,
      position,
      showConfirmButton,
    });
  },
};

export default notification;
