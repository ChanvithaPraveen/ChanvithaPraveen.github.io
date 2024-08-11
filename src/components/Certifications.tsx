import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid } from '@mui/material';
import theme from '@/theme';

// Define the type for certification items
interface CertificationItem {
  logo: string;
  courseName: string;
  description: string;
  link: string;
}

// Example certifications
const certifications: CertificationItem[] = [
  {
    logo: '/coursera.png',
    courseName: 'Python Data Structures University of MICHIGAN ',
    description: '',
    link: 'https://www.coursera.org/account/accomplishments/verify/XNZC76Q72C3R',
  },
  {
    logo: '/kaggle.png',
    courseName: 'Introduction To Machine Learning',
    description: '',
    link: 'https://www.kaggle.com/learn/certification/chanvithapraveen/intro-to-machine-learning',
  },
  {
    logo: '/coursera.png',
    courseName: 'React Basics - Meta ',
    description: '',
    link: 'https://www.coursera.org/account/accomplishments/verify/6K8KHLAPUYH5',
  },
  {
    logo: '/awss.png',
    courseName: 'AWS Educate Introduction to Cloud',
    description: '',
    link: 'https://www.credly.com/badges/210bb767-b183-4f4a-84ee-e16f331aff77/linked_in_profile',
  },
  {
    logo: '/coursera.png',
    courseName: 'SQL For Data Science - UCDavis ',
    description: '',
    link: 'https://www.coursera.org/account/accomplishments/certificate/6F8ABW67RB2S',
  },
  {
    logo: '/cisco.jpg',
    courseName: 'Introduction To Cybersecurity - Cisco',
    description: '',
    link: 'https://www.credly.com/badges/6cba6cba-ac08-4715-9a89-920c307ebe89?source=linked_in_profile',
  },
];

const Certifications: React.FC = () => {
  return (
    <Box sx={{ padding: '2rem' }}>
        <Box
        sx={{
          display: 'inline-block',
          textAlign: 'center',
          padding: '0.5rem',
          width: '160px',
          borderRadius: '50px',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
          // border: `2px solid ${theme.palette.secondary.main}`,
          marginBottom: '2rem',
        }}
      >
        <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>Certifications</Typography>
      </Box>
      
      <Grid container spacing={2}>
        {certifications.map((cert, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card sx={{ display: 'flex', mb: '-2rem', flexDirection: 'column', alignItems: 'center' }}>
              <CardMedia
                component="img"
                sx={{ width: '100%', height: '100px', margin: '1rem' }}
                image={cert.logo}
                alt={cert.courseName}
              />
              <CardContent>
                <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                  {cert.courseName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
                  {cert.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ width: '100%' }}
                >
                  View Credential
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Certifications;
