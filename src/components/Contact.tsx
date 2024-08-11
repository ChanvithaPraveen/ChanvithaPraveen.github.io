import { Typography, TextField, Button, Box, useTheme, Grid } from '@mui/material';

const Contact = () => {

  const theme = useTheme();

  return (
    <Box id="contact" sx={{
      padding: '3rem 0', textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
      borderRadius: '15px',
      marginTop: '5rem'
    }}>
      <Box
        sx={{
          display: 'inline-block',
          padding: '0.5rem',
          width: '160px',
          borderRadius: '50px',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
          // border: `2px solid ${theme.palette.secondary.main}`,
          marginBottom: '2rem',
        }}
      >
        <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>Contact Me</Typography>
      </Box>
      <Grid>
        <Box component="form" sx={{ maxWidth: '600px', margin: '1rem auto' }}>
          <TextField label="Name" fullWidth margin="normal" required />
          <TextField label="Email" type="email" fullWidth margin="normal" required />
          <TextField label="Message" multiline rows={4} fullWidth margin="normal" required />
          <Button variant="contained" type="submit" sx={{ marginTop: '1rem' }}>Send</Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default Contact;