import axios from "axios"
import { USERGET, USERSET } from "../type/type"
import Swal from "sweetalert2"

export const getUserData = () => {
    return (dispatch) => {
        axios.get('http://localhost:7000/api/user/getUser').then((res) => {
            dispatch({ type: USERGET, data: res })
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Api Error",
            })
        })
    }
}
export const setUserData = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:7000/api/user/register', data).then((res) => {
            dispatch({ type: USERSET, data: res.data.message })
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Api Error",
            })
        })
    }
}