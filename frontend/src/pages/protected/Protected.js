import { Grid, Paper, Avatar, Typography, Link, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux';
import * as styles from '../../styles/styles.module';
import LogoutIcon from '@mui/icons-material/Logout';
import { selectCurrentUser } from '../../store/features/authSlice'

import { useTestQuery } from '../../store/features/apiTestSlice';

function Protected() {
  const userDetails = useSelector(selectCurrentUser)
  const {
    data = false,
    isLoading,
    isError,
    error
  } = useTestQuery();

  return (
    <Grid>
      <Paper elevation={0} style={styles.protectedPage.paperStyle}>
        <Grid align="center">
          <Avatar style={styles.avatarStyle}><LogoutIcon /></Avatar>
          <h2>Protected</h2>
          <h3>Welcome {userDetails?.firstName}</h3>

          {isLoading &&
            <Grid item container direction="row" justifyContent="center">
              <CircularProgress sx={{ color: "#117e6a" }} />
            </Grid>
          }
          <Typography hidden={!data}>
            Successfully tested access to protected api endpoint
          </Typography>
          <Typography hidden={!isError} style={styles.authError}>
            Could not access protected api endpoint: {error?.data}
          </Typography>
          <Typography>
            <Link href="/logout" underline="hover" style={styles.linkStyle}>
              Log out
            </Link>
          </Typography>
        </Grid>
      </Paper >
    </Grid >
  )
}

export default Protected