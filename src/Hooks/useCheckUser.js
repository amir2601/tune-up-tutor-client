import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Provider/AuthProvider"

const useCheckUser = () => {
    const {user} = useContext(AuthContext)
    const [checkUserRole, setCheckUserRole] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.role);
                setCheckUserRole(data.role)
                localStorage.setItem('user-role', data.role)
            })
    }, [])

    return [checkUserRole];
}

export default useCheckUser;