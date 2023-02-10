import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { resetUserDetailsRedux } from '../../../store/features/userDetailsSlice'

const Logout = () => {
  const isLoggedIn = useSelector(state => state.userdetails.isLoggedIn)
  const dispatch = useDispatch();
  dispatch(resetUserDetailsRedux());

  return (
    isLoggedIn
      ? <h2>Logging out...</h2>
      : <Navigate to="/login" />
  )
}
export default Logout