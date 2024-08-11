import { Box, Typography, IconButton, useTheme, Link } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import ImageSearchIcon from '@mui/icons-material/ImageSearch'; // Shutterstock icon

const Footer = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                mt: '2rem',
                padding: '2rem 1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
                backdropFilter: 'blur(10px)',
                color: 'white',
                textAlign: 'center',
                borderTop: `1px solid ${theme.palette.divider}`,
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <Typography variant="h6">Connect with Me</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <IconButton
                        aria-label="LinkedIn"
                        href="https://www.linkedin.com/in/chanvithapraveen/"
                        target="_blank"
                        sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.2)' } }}
                    >
                        <LinkedInIcon sx={{ fontSize: 25 }} />
                    </IconButton>
                    <IconButton
                        aria-label="GitHub"
                        href="https://github.com/ChanvithaPraveen"
                        target="_blank"
                        sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.2)' } }}
                    >
                        <GitHubIcon sx={{ fontSize: 25 }} />
                    </IconButton>
                    <IconButton
                        aria-label="Facebook"
                        href="https://facebook.com/chanvitha.edirisinghedewayalage"
                        target="_blank"
                        sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.2)' } }}
                    >
                        <FacebookIcon sx={{ fontSize: 25 }} />
                    </IconButton>
                    <IconButton
                        aria-label="Twitter"
                        href="https://x.com/ChanvithaP"
                        target="_blank"
                        sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.2)' } }}
                    >
                        <TwitterIcon sx={{ fontSize: 25 }} />
                    </IconButton>
                    <IconButton
                        aria-label="Shutterstock"
                        href="https://www.shutterstock.com/g/chanvitha+praveen"
                        target="_blank"
                        sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.2)' } }}
                    >
                        <ImageSearchIcon sx={{ fontSize: 25 }} />
                    </IconButton>
                </Box>
            </motion.div>
            <Box sx={{ marginTop: '1rem' }}>
                <Typography variant="body1">
                    Design with Figma & Developed with NEXT.js and Material UI
                </Typography>
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} Chanvitha Praveen. All rights reserved.
                </Typography>
                <Typography variant="body2" sx={{ mt: '0.5rem' }}>
                    <Link href="#privacy-policy" color="inherit" underline="hover">
                        Privacy Policy
                    </Link>
                    {' | '}
                    <Link href="#terms-of-service" color="inherit" underline="hover">
                        Terms of Service
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
