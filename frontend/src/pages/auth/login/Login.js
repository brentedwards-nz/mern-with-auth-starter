import { Grid, Paper, Avatar, TextField, Typography, Button, Link, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux'

import { validateLoginForm } from '../../../utils/validators';
import useAuth from '../../../hooks/useUserDetails';
import * as styles from '../../../styles/styles.module';

import { useLoginMutation } from '../../../store/features/authApiSlice';
import { setCredentials } from '../../../store/features/authSlice';

const Login = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState({ isHidden: true, errorMessage: "" })

  const navigate = useNavigate();
  const [userDetails,] = useAuth()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (userDetails?.isLoggedIn) {
      navigate("/protected")
    }
  }, [userDetails, navigate])

  useEffect(() => {
    setCanSubmit(
      validateLoginForm({ mail, password })
    );
  }, [mail, password, setCanSubmit])

  const handleEmailChange = (event) => {
    setMail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email: mail, password }).unwrap()
      dispatch(setCredentials({ ...userData }))
      navigate("/protected")
    } catch (err) {
      if (!err?.originalStatus) {
        setLoginError({ isHidden: false, errorMessage: 'No Server Response' })
      } else if (err.originalStatus === 400) {
        setLoginError({ isHidden: false, errorMessage: 'Missing Username or Password' })
      } else if (err.originalStatus === 401) {
        setLoginError({ isHidden: false, errorMessage: 'Unauthorized' })
      } else {
        setLoginError({ isHidden: false, errorMessage: 'Login failed' })
      }
    }
  }

  return (
    <Grid>
      <Paper elevation={0} style={styles.loginPage.paperStyle}>
        <Grid align="center">
          <Avatar style={styles.avatarStyle}><LockOutlinedIcon /></Avatar>
          <h2>Log In</h2>
        </Grid>
        <TextField
          variant="standard"
          label='Email'
          placeholder='Enter email'
          style={styles.textFieldStyle}
          fullWidth
          required
          InputLabelProps={{
            style: {
              color: "#117e6a",
            }
          }}
          onChange={handleEmailChange}
        />
        <TextField
          variant="standard"
          label='Password'
          placeholder='Enter password'
          style={styles.textFieldStyle}
          type='password'
          fullWidth
          required
          InputLabelProps={{
            style: {
              color: "#117e6a",
            }
          }}
          onChange={handlePasswordChange}
        />
        <Button
          type='submit'
          sx={{ color: '#117e6a' }}
          fullWidth
          onClick={handleLogin}
          disabled={!canSubmit}
        >
          Log In
        </Button>
        {isLoading &&
          <Grid item container direction="row" justifyContent="center">
            <CircularProgress sx={{ color: "#117e6a" }} />
          </Grid>
        }
        <Typography>
          <Link href="/reset" underline="hover" style={styles.linkStyle}>
            Forgot password?
          </Link>
        </Typography>
        <Typography>
          <Link href="/register" underline="hover" style={styles.linkStyle}>
            Register?
          </Link>
        </Typography>
        <Typography hidden={loginError.isHidden} style={styles.authError}>
          Error: {loginError.errorMessage}
        </Typography>
      </Paper >
    </Grid >
  )
};

export default Login;