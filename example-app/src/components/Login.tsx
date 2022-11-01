import React, {useState} from 'react';
import usePseudoStore from "../pseudoStore/usePseudoStore";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [role, setRole] = useState<string>();
    const {setUser} = usePseudoStore();
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setUser(true, role ? [role] : undefined);
        navigate(`/`);
    }
    return (
        <form onSubmit={handleSubmit}>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">user</option>
                <option value="admin">admin</option>
            </select>
            <button>Submit</button>
        </form>
    );
};

export default Login;
