import React from 'react'
import { Grid, Paper, Avatar, Typography, Link } from '@mui/material'
import { useSelector } from 'react-redux';
import * as styles from '../../styles/styles.module';
import LogoutIcon from '@mui/icons-material/Logout';
import { selectCurrentUser } from '../../store/features/authSlice'

function Protected() {
  const userDetails = useSelector(selectCurrentUser)

  return (
    <Grid>
      <Paper elevation={0} style={styles.protectedPage.paperStyle}>
        <Grid align="center">
          <Avatar style={styles.avatarStyle}><LogoutIcon /></Avatar>
          <h2>Protected</h2>
          <h3>Welcome {userDetails?.firstName}</h3>
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