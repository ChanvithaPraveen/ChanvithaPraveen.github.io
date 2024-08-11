import React from 'react';
import { Box, Typography, Card, CardContent, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import educationData from '../data/education';

const Education = () => {
  const theme = useTheme();

  return (
    <Box id="education" sx={{ mt: '-1rem', mb: '2rem', textAlign: 'center', px: 2 }}>
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
        <Typography variant="h5" sx={{ color: theme.palette.secondary.main }}>
          Education
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {educationData.map((edu, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            key={index}
            style={{ width: '100%', maxWidth: '600px' }}
          >
            <Card sx={{ position: 'relative', overflow: 'visible' }}>
              <Box
                sx={{
                  height: '20px',
                  backgroundColor: theme.palette.primary.main,
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                }}
              />
              <CardContent
                sx={{
                  position: 'relative',
                  padding: '2rem',
                  '&:hover .details': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ mb: '0.5rem' }}>
                  {edu.degree}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: '0.5rem', color: 'text.secondary' }}>
                  {edu.institution}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: '0.5rem', color: 'text.secondary' }}>
                  {edu.duration}
                </Typography>
                <Box
                  className="details"
                  sx={{
                    opacity: 0,
                    transform: 'translateY(-10px)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Typography variant="body2" sx={{ mt: '1rem', color: 'text.secondary' }}>
                    {edu.description}
                  </Typography>
                </Box>
                <Box sx={{ mt: '1rem' }}>
                  <LinearProgress variant="determinate" value={edu.progress} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Education;
