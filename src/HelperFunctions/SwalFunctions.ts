import Swal from "sweetalert2";

export function responseError(msg: any) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
  });
}

export function successful(msg: any) {
  Swal.fire({
    title: "Success!",
    icon: "success",
    text: msg
  });
}

