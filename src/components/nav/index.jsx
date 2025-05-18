import { Link, useNavigate } from "react-router"
import argentBankLogo from "../../img/argentBankLogo.png"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../store/slice/userSlice";

export default function Nav() {

    let { isConnected, firstName } = useSelector((state) => state);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const disconnectUser = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
        localStorage.clear('token'); // Clear for remember me
        navigate('/')
    }

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to={"/"}>
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>

                {isConnected === false ?
                    <Link className="main-nav-item" to="sign-in">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                    :
                    <>

                        <Link className="main-nav-item" to="user">
                            <i className="fa fa-user-circle"></i>
                            {firstName}
                        </Link>
                        <a className="main-nav-item" to={"/"} onClick={disconnectUser}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </a>
                    </>
                }

            </div>
        </nav>
    )
}
