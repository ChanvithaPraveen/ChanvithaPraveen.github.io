import React from 'react';
import { Typography, Box, Avatar, useTheme, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import ImageSearchIcon from '@mui/icons-material/ImageSearch'; 
// import MediumIcon from '@mui/icons-material/Medium';

const About = () => {
  const theme = useTheme();

  return (
    <Box
      id="about"
      sx={{
        mt: '2rem',
        padding: '3rem 0',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
        borderRadius: '15px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Avatar
          alt="My Photo"
          src="/my-photo.png"
          sx={{
            width: 200,
            height: 200,
            margin: '0 auto 1rem',
            boxShadow: `0 0 10px 4px ${theme.palette.primary.main}`, // Glowing border
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>
          Chanvitha Praveen
        </Typography>
        <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
          chanvithapraween@gmail.com
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '0.2rem' }}>
          <IconButton
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/chanvithapraveen/"
            target="_blank"
            sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.2)' } }}
          >
            <LinkedInIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton
            aria-label="GitHub"
            href="https://github.com/ChanvithaPraveen"
            target="_blank"
            sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.2)' } }}
          >
            <GitHubIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton
            aria-label="Facebook"
            href="https://facebook.com/chanvitha.edirisinghedewayalage"
            target="_blank"
            sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.2)' } }}
          >
            <FacebookIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton
            aria-label="Twitter"
            href="https://x.com/ChanvithaP"
            target="_blank"
            sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.2)' } }}
          >
            <TwitterIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton
            aria-label="Shutterstock"
            href="https://www.shutterstock.com/g/chanvitha+praveen"
            target="_blank"
            sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.2)' } }}
          >
            <ImageSearchIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Typography variant="body1" sx={{ maxWidth: '1000px', margin: '1rem auto', color: "text.secondary" }}>
          As a Final Year Computer Engineering undergraduate (Graduate within a month), passionate in Full Stack Web
          Developing, Machine Learning & exploring new technologies. I possess a burning desire to solve real world problems. I’m
          a hardworking, responsible team player and eager to contribute and learn within a dynamic environment.
        </Typography>
      </motion.div>
    </Box>
  );
};

export default About;
