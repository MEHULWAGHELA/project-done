import axios from "axios"
import { authorise } from "../../components/authorize/authorise"
import {  GETPRODUCT } from "../type/type"
import Swal from "sweetalert2"

export const getProduct = () => {
    return (dispatch) => {
        axios.get('http://localhost:7000/api/product/get', authorise())
            .then((res) => {
                dispatch({ type: GETPRODUCT, data: [...res.data.data] })
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
export const setProduct = (obj) => {
    return (dispatch) => {
        axios.post('http://localhost:7000/api/product/add', obj, authorise())
            .then((res) => {
                Swal.fire({
                    position: 'center-ceter',
                    icon: 'success',
                    title: 'Your Product Add Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                dispatch(getProduct())
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
export const deleteProduct = (id) => {
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
                axios.delete('http://localhost:7000/api/product/delete?id=' + id, authorise())
                    .then((res) => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        dispatch(getProduct())
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

export const updateProduct = (obj, id) => {
    return (dispatch) => {
        axios.patch('http://localhost:7000/api/product/update?id=' + id, obj, authorise())
            .then((res) => {
                Swal.fire({
                    position: 'center-ceter',
                    icon: 'success',
                    title: 'Your Product updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                dispatch(getProduct())
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