import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import PropTypes from 'prop-types';

export default function ProtectedRouteLogin({ children = "", to = "/" }) {

    let data = useSelector((state) => state);

    if (data.status === "loading")
        return null;

    if (data.status === "idle" || data.status === "failed")
        return <Navigate to={to} />;

    if (data.status === "succeeded" && data.isConnected)
        return children;
}

ProtectedRouteLogin.propTypes = {
    children: PropTypes.node,
    to: PropTypes.string
};