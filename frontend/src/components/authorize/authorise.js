
export const authorise = () => {
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
}