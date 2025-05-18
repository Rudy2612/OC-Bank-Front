import { useState } from "react"
import { signInUser } from "../service/api";
import { useDispatch } from "react-redux";
import { fetchUserInformation } from "../store/slice/userSlice";
import { useNavigate } from "react-router";


export default function Sign_in() {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [rememberMe, setRememberMe] = useState('');
    let [error, setError] = useState('');

    let dispatch = useDispatch();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = await signInUser(email, password);
        if (data.success) {
            await dispatch(fetchUserInformation(data.token))
            if (rememberMe)
                localStorage.setItem('token', data.token);
            navigate('/user')
        }
        else
            setError(data.message)
    }


    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <p className="text-error">{error}</p>
                <div className="input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" onChange={e => setRememberMe(e.target.checked)} />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <input className="sign-in-button" type="submit" value={"Sign In"} />
            </form>
        </section>
    )
}
