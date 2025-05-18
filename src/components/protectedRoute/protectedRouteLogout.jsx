import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import PropTypes from 'prop-types';

export default function ProtectedRouteLogout({ children = "", to = "/" }) {

    let data = useSelector((state) => state);

    if (data.status === "succeeded" && data.isConnected)
        return <Navigate to={to} />;
    else
        return children;
}

ProtectedRouteLogout.propTypes = {
    children: PropTypes.node,
    to: PropTypes.string
};