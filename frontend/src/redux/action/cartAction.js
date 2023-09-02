import axios from "axios"
import { authorise } from "../../components/authorize/authorise"
import { GETCART  } from "../type/type"
import Swal from "sweetalert2"

export const getCart = () => {
    return (dispatch) => {
        axios.get('http://localhost:7000/api/addtocart/get', authorise())
            .then((res) => {
                dispatch({ type: GETCART, data: [...res.data.data] })
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
export const setCart = (id) => {
    return (dispatch) => {
        axios.post('http://localhost:7000/api/addtocart/add', { productId: id }, authorise())
            .then((res) => {
                Swal.fire({
                    position: 'center-center',
                    icon: 'success',
                    title: 'Product Added in Cart',
                    showConfirmButton: false,
                    timer: 1500
                })
                dispatch(getCart())
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
export const deleteCart = (id) => {
    return (dispatch) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:7000/api/addtocart/remove?productId=' + id, authorise())
                    .then((res) => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        dispatch(getCart())
                    }).catch((err) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "Api Error",
                        })
                    })

            }
        })
    }
}