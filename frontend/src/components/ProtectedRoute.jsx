import { useAuthStore } from "../store/authStore"
import { Navigate } from "react-router";

function ProtectedRoute({ children, allowedRoles }) {
    //get user login status from store
    const { loading, currentUser, isAuthenticated } = useAuthStore();
    if (loading) {
        return <p>Loading....</p>
    }
    //if user not loggedin
    if (!isAuthenticated) {
        //redirect to login
        return <Navigate to="/login" replace />
    }
    //check roles
    if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
        return <Navigate to="/unauthorized" replace state={{ redirectTo:"/"}} />
    }
    return children
}

export default ProtectedRoute