import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logOut, selectCurrentToken } from '../../../store/features/authSlice';
import { useEffect } from 'react';

const Logout = () => {
  const token = useSelector(selectCurrentToken)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());
  }, [dispatch])

  return (
    token
      ? <h2>Logging out...</h2>
      : <Navigate to="/login" />
  )
}
export default Logout