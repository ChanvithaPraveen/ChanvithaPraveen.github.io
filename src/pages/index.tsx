import Head from 'next/head';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import IndustryExperience from '../components/IndustryExperience';
import Education from '@/components/Education';
import TechStack from '../components/TechStack';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Certifications from '@/components/Certifications';
// import backgroundImage from 'https://png.pngtree.com/thumb_back/fh260/background/20230415/pngtree-website-technology-line-dark-background-image_2344719.jpg'; // Corrected path to the background image

const Home = () => {
  return (
    <Box
      sx={{
        // backgroundImage: `url(https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`, // Apply background image
        backgroundImage: `url(https://images.unsplash.com/photo-1518014179319-21e9e8139b05?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`, // Apply background image
        // backgroundImage: `url(https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`, // Apply background image
        // backgroundImage: `url(https://plus.unsplash.com/premium_photo-1667105168121-0fe3333b5b14?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundSize: 'cover', // Cover the entire page
        backgroundPosition: 'center', // Center the background image
        minHeight: '100vh', // Make sure the box fills the entire viewport height
        padding: '2rem', // Add padding for borders
      }}
    >
      <Container maxWidth="xl">
        <Head>
          <title>Chanvitha Praveen</title>
          <meta name="description" content="My personal portfolio" />
        </Head>
        <Navbar />
        <Box id="about" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <About />
        </Box>
        <Box id="industry-experience" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <IndustryExperience />
        </Box>
        <Box id="projects" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          <Projects />
        </Box>
        <Box id="education" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          <Education />
        </Box>
        <Box id="techstack" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          <TechStack />
        </Box>
        <Box id="certifications" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <Certifications />
        </Box>
        <Box id="gallery" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <Gallery />
        </Box>
        <Box id="contact" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <Contact />
        </Box>
        <Box id="footer" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <Footer />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
