import Swal from "sweetalert2";

export function responseError(msg: any) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
  });
}

export function successful(message: string) {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message
  });
}



