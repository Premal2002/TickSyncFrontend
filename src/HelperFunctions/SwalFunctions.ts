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
    text: message,
    timer: 2000,
    showConfirmButton: false,
  });
}

export function error(message: string) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    timer: 2500,
    showConfirmButton: false,
  });
}


