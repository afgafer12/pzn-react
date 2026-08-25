import Swal from "sweetalert2";

export const alertSuccess = async (message) => {
  return Swal.fire({
    icon: 'success',
    title: "Success",
    text: message,
  })
}

export const alertError = async (message) => {
  return Swal.fire({
    icon: 'error',
    title: "Ups",
    text: message,
  })
}

export const alertConfirm = async (message) => {
  const result = await Swal.fire({
    icon: 'question',
    title: "Are you sure?",
    text: message,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes'
  })
  return result.isConfirmed;
}

export const alertErrorResp = async (message, response = {}) => {
  if(response.httpCode == 422){
    message += '. ';
    response.errors?.forEach((v, k) => {
      message += `${v}`;
    });
  }

  if(response.httpCode){
    console.log(response);
  };
  const swal = Swal.fire({
    icon: 'error',
    title: "Ups",
    text: message,
  });
  return swal;
}