import { toast } from 'react-toastify';


export const alertError = ( type ) => {

    switch (type) {
        case 'auth/wrong-password':
            toast.warning("La contraseña introducida es incorrecta");
            break;
    
        default:
            toast.warning("Error del servidor. Intentar más tarde");
            break;
    }

}