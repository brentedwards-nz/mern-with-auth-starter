import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { useSelector } from 'react-redux'

import { selectCurrentToken } from '../store/features/authSlice'

const drawerWidth = 240;
const navItems = [
  { label: 'Home', to: "/home" },
  { label: 'Protected', to: "/protected" },
];

const NavBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawer, setDrawer] = useState('<></>');
  const isLoggedIn = useSelector(selectCurrentToken);

  const handleDrawerToggle = useCallback(
    () => {
      setMobileOpen(!mobileOpen);
    }, [mobileOpen]
  );

  useEffect(() => {
    const drawerHTML = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={item?.to}>
                <ListItemText primary={item?.label} />
              </ListItemButton>
            </ListItem>
          ))}
          {
            isLoggedIn &&
            <ListItem key="Logout" disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} component={Link} to="/logout">
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          }
        </List>
      </Box>
    );
    setDrawer(drawerHTML)
  }, [isLoggedIn, handleDrawerToggle])

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
          >
            <FitnessCenterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}>
            {navItems.map((item) => (
              <Button key={item?.label} sx={{ color: '#fff' }} component={Link} to={item?.to}>
                {item.label}
              </Button>
            ))}
          </Box>
          {
            isLoggedIn &&
            <Button
              color="inherit"
              component={Link}
              to="/logout"
              sx={{ display: { xs: 'none', sm: 'block' } }}>
              Logout
            </Button>
          }
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavBar;
