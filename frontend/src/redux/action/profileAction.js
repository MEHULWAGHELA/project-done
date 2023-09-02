import axios from "axios"
import { authorise } from "../../components/authorize/authorise"
import { GETPROFILE } from "../type/type"
import Swal from "sweetalert2"

export const getProfile = () => {
    return (dispatch) => {
        axios.get('http://localhost:7000/api/user/getUser', authorise())
            .then((res) => {
                dispatch({ type: GETPROFILE, data: [res.data.data] })
            }
            )
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Api Error",
                })
            })
    }
}