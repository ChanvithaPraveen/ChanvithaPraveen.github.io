import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';  // Import Framer Motion
import techSkills from '../data/techStack';


const TechStack = () => {
  const theme = useTheme();

  return (
    <Box id="techstack" sx={{ mt: '4rem', textAlign: 'center' }}>
      <Box
        sx={{
          display: 'inline-block',
          padding: '0.5rem',
          width: '150px',
          borderRadius: '50px',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
          marginBottom: '4rem',
        }}
      >
        <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>Tech Stack</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
        }}
      >
        {techSkills.map((skill, index) => (
          <motion.div
            key={index}
            className="bubble"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: skill.color,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.1 }}  // Scale up on hover
            whileTap={{ scale: 0.9 }}    // Scale down on click
            transition={{ duration: 0.3 }} // Animation duration
          >
            <img src={skill.logo} alt={skill.label} style={{ width: '60%', height: '60%', borderRadius: '5%' }} />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default TechStack;
