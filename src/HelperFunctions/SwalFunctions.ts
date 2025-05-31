import Swal from "sweetalert2";

export function responseError(msg: any) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
  });
}
export function infoMsg(msg: any) {
  Swal.fire({
    icon: "info",
    title: "Check",
    text: msg,
  });
}

export function responseErrorReload(msg: any) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result: any) => {
    if (result.isConfirmed) {
      window.location.reload();
    }
  });
}

export function successful(message: string) {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
  });
}
