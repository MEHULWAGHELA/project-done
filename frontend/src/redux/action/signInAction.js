import axios from "axios"
import { SIGNIN } from "../type/type"
import Swal from "sweetalert2"

export const signin = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:7000/api/user/login', data).then((res) => {
            return dispatch({ type: SIGNIN, token: res.data.token })
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Api Error",
            })
        })
    }
}