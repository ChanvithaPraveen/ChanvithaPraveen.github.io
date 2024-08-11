import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import DownloadIcon from '@mui/icons-material/Download';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

const Navbar = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean | ((prevState: boolean) => boolean)) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
          backdropFilter: 'blur(10px)', // Blur effect
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
          display: { xs: 'none', md: 'flex' } // Hide on mobile
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              color: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <a href="/Resume%20of%20Chanvitha%20Praveen.pdf" download style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0.8 }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
              >
                <IconButton
                  sx={{ color: theme.palette.secondary.main, marginRight: '0.5rem' }}
                >
                  <DownloadIcon />
                </IconButton>
              </motion.div>
              <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                Download Resume
              </Typography>
            </a>
          </Typography>
          <ScrollLink to="about" smooth={true} duration={500}>
            <Button sx={{ color: theme.palette.primary.main }}>About</Button>
          </ScrollLink>
          <ScrollLink to="industry-experience" smooth={true} duration={500}>
            <Button sx={{ color: theme.palette.secondary.main }}>Experience</Button>
          </ScrollLink>
          <ScrollLink to="projects" smooth={true} duration={500}>
            <Button sx={{ color: theme.palette.primary.main }}>Projects</Button>
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500}>
            <Button sx={{ color: theme.palette.secondary.main }}>Contact</Button>
          </ScrollLink>
        </Toolbar>
      </AppBar>
      <IconButton
        sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', top: '1rem', left: '1rem' }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon sx={{ color: theme.palette.primary.main }} />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 250,
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
            backdropFilter: 'blur(10px)', // Blur effect
            height: '100%',
            paddingTop: '2rem',
          }}
        >
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
          >
            <CloseIcon sx={{ color: theme.palette.primary.main }} />
          </IconButton>
          <List>
            <ListItem>
              <a href="/Resume%20of%20Chanvitha%20Praveen.pdf" download style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: theme.palette.primary.main }}>
                <motion.div
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
                >
                  <IconButton
                    sx={{ color: theme.palette.primary.main, marginRight: '0.5rem' }}
                  >
                    <DownloadIcon />
                  </IconButton>
                </motion.div>
                Download Resume
              </a>
            </ListItem>
            <ListItem>
              <ScrollLink to="about" smooth={true} duration={500} onClick={toggleDrawer(false)}>
                <Button sx={{ color: theme.palette.primary.main, width: '100%' }}>About</Button>
              </ScrollLink>
            </ListItem>
            <ListItem>
              <ScrollLink to="industry-experience" smooth={true} duration={500} onClick={toggleDrawer(false)}>
                <Button sx={{ color: theme.palette.secondary.main, width: '100%' }}>Experience</Button>
              </ScrollLink>
            </ListItem>
            <ListItem>
              <ScrollLink to="projects" smooth={true} duration={500} onClick={toggleDrawer(false)}>
                <Button sx={{ color: theme.palette.primary.main, width: '100%' }}>Projects</Button>
              </ScrollLink>
            </ListItem>
            <ListItem>
              <ScrollLink to="contact" smooth={true} duration={500} onClick={toggleDrawer(false)}>
                <Button sx={{ color: theme.palette.secondary.main, width: '100%' }}>Contact</Button>
              </ScrollLink>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
