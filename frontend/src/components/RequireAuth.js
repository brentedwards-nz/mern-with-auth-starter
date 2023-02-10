import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../store/features/authSlice'

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken)
  return (
    token
      ? <Outlet />
      : <Navigate to="/unauthorised" />
  )
}
export default RequireAuth