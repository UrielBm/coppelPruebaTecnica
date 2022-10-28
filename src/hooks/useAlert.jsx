import Swal from "sweetalert2";
const useAlert = () => {
  const rightAlert = (mensage) => {
    Swal.fire({
      icon: "success",
      title: "operación realizada correctamente",
      text: mensage,
      showConfirmButton: false,
      timer: 3500,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };
  const errorAlert = () => {
    Swal.fire({
      icon: "success",
      title: "operación realizada correctamente",
      text: "Ocurrio un error en el servidor, intente más tarde.",
      showConfirmButton: false,
      timer: 3500,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };
  return { rightAlert, errorAlert };
};

export default useAlert;
