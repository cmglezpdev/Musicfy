import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { alertError } from "../utils/alert-errors";
import { reauthentication } from "../utils/Api";



// TODO: Sacar todos los toasts, reload app y viewModals(todo lo que no sea la logica) de aqui

export const updatePasswordUser = ( oldPassword, newPassword ) => {
    return async (dispatch, getData) => {
        try {
            const { currentUser:user } = getData().auth;
            await reauthentication( oldPassword );
            await updatePassword(user, newPassword);
            toast.success("Successfully password updated")

        } catch (error) {
            alertError(error?.code)
        }
    }
}