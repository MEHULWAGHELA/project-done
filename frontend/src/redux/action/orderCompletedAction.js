import axios from "axios"
import { authorise } from "../../components/authorize/authorise"
import { GETORDERCOMPLETED } from "../type/type"
import Swal from "sweetalert2"

export const getOrderCompleted = () => {
    return (dispatch) => {
        axios.get('http://localhost:7000/api/orderCompleted/get', authorise())
            .then((res) => {
                dispatch({ type: GETORDERCOMPLETED, data: [...res.data.data] })
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Api Error",
                })
            })
    }
}

