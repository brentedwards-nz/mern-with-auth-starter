import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logOut, selectCurrentToken } from '../../../store/features/authSlice';

const Logout = () => {
  const token = useSelector(selectCurrentToken)
  const dispatch = useDispatch();
  dispatch(logOut());

  return (
    token
      ? <h2>Logging out...</h2>
      : <Navigate to="/login" />
  )
}
export default Logout