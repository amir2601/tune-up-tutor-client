import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Provider/AuthProvider"

const useCheckUser = () => {
    const { user } = useContext(AuthContext)
    const [checkUserRole, setCheckUserRole] = useState(null)

    useEffect(() => {
        if (!user?.email) {
            setCheckUserRole(null)
            return
        }

        let active = true
        fetch(`${import.meta.env.VITE_API_URL}users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                if (!active || !data?.role) return
                setCheckUserRole(data.role)
                localStorage.setItem('user-role', data.role)
            })
            .catch(() => {})

        return () => { active = false }
    }, [user?.email])

    return [checkUserRole];
}

export default useCheckUser;
