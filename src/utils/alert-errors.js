import { toast } from 'react-toastify';

export const alertError = ( type ) => {

  switch( type ) {
    case "auth/too-many-requests":
      toast.warning("Haz enviado demasiadas solicitudes de reenvio de email de confirmación en muy poco tiempo");
      break;
    
    case "auth/network-request-failed":
      toast.warning("Error en la conexion a internet!");
      break;
  
    case "auth/user-not-found":
      toast.warning("EL usuario no existe!");  
      break;
  
    case "auth/wrong-password":
      toast.warning("La contraseña es incorrecta!");  
      break;
  
    default:
        toast("Error interno en el servidor. Por favor, inténtelo más tarde");
  }
}