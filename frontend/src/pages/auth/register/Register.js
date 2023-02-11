import { Grid, Paper, Avatar, TextField, Typography, Button, Link, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useDispatch, useSelector } from 'react-redux'

import { validateRegisterForm } from '../../../utils/validators';
import * as styles from '../../../styles/styles.module';

import { useRegisterMutation } from '../../../store/features/apiAuthSlice';
import { setCredentials, selectCurrentToken } from '../../../store/features/authSlice';

const Register = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [registerError, setRegisterError] = useState({ isHidden: true, errorMessage: "" })

  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation()

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/protected")
    }
  }, [token, navigate])

  useEffect(() => {
    setCanSubmit(
      validateRegisterForm({ mail, password, confirmPassword, firstName, secondName })
    );
  }, [mail, password, confirmPassword, firstName, secondName, setCanSubmit])

  const handleEmailChange = (event) => {
    setMail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = await register({ email: mail, password: password, firstName: firstName, secondName: secondName }).unwrap()
      dispatch(setCredentials({ ...userData }))
      navigate("/protected")
    } catch (err) {
      if (!err?.originalStatus) {
        setRegisterError({ isHidden: false, errorMessage: 'No Server Response' })
      } else if (err.originalStatus === 400) {
        setRegisterError({ isHidden: false, errorMessage: 'Username or Password Incorrect' })
      } else if (err.originalStatus === 401) {
        setRegisterError({ isHidden: false, errorMessage: 'Unauthorized' })
      } else {
        setRegisterError({ isHidden: false, errorMessage: 'Login failed' })
      }
    }
  }

  return (
    <Grid>
      <Paper elevation={0} style={styles.registerPage.paperStyle}>
        <Grid align="center">
          <Avatar style={styles.avatarStyle}><HowToRegIcon /></Avatar>
          <h2>Register</h2>
        </Grid>
        <TextField
          variant="standard"
          label='First Name'
          placeholder='Enter first name'
          style={styles.textFieldStyle}
          fullWidth
          required
          InputLabelProps={{
            style: {
              color: "#117e6a",
            }
          }}
          onChange={e => setFirstName(e.target.value)}
        />
        <TextField
          variant="standard"
          label='Second Name'
          placeholder='Enter second name'
          style={styles.textFieldStyle}
          fullWidth
          required
          InputLabelProps={{
            style: {
              color: "#117e6a",
            }
          }}
          onChange={e => setSecondName(e.target.value)}
        />
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
        <TextField
          variant="standard"
          label='Confirm Password'
          placeholder='Confirm password'
          style={styles.textFieldStyle}
          type='password'
          fullWidth
          required
          InputLabelProps={{
            style: {
              color: "#117e6a",
            }
          }}
          onChange={handleConfirmPasswordChange}
        />
        <Button
          type='submit'
          sx={{ color: '#117e6a' }}
          fullWidth
          onClick={handleRegister}
          disabled={!canSubmit}
        >
          Register
        </Button>
        {isLoading &&
          <Grid item container direction="row" justifyContent="center">
            <CircularProgress sx={{ color: "#117e6a" }} />
          </Grid>
        }
        <Typography>
          <Link href="/login" underline="hover" style={styles.linkStyle}>
            Already Registered?
          </Link>
        </Typography>
        <Typography hidden={registerError.isHidden} style={styles.authError}>
          Error: {registerError.errorMessage}
        </Typography>
      </Paper >
    </Grid >
  )
};

export default Register;