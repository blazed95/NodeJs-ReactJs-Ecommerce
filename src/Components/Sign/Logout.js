import React, { useState } from 'react'
import { Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../Contexts/AuthContext'

const Logout = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    const { logout } = useAuth(); // { logout } means select a specific function from useAuth import 




    const handleLogout = async (e) => {
        try {
            setError("")
            setLoading(true);
            await logout();
        } catch (e) {
            setError("Failed to Log Out")
        }
        setLoading(false);
        window.location.reload(false); // Reload page after log out
    }
    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button className="w-100" disabled={loading} type="submit" onClick={handleLogout}> Logout </Button>
        </>
    )
}

export default Logout;