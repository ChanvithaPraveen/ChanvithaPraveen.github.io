import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import IndustryExperience from '../components/IndustryExperience';
import Projects from '../components/Projects';
import TechStack from '../components/TechStack';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Publications from '../components/Publications';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import MatrixRain from '../components/ui/MatrixRain';

const Home = () => {
  return (
    <>
      <Head>
        <title>chanvitha.praveen :: ./terminal</title>
        <meta
          name="description"
          content="Chanvitha Praveen — Computer Engineer · Full-Stack & ML/AI Developer. Cyber-themed portfolio."
        />
        <meta name="theme-color" content="#00ff41" />
        <link rel="icon" type="image/png" href="/my-photo-new.png" />
      </Head>

      <MatrixRain opacity={0.18} />

      <div className="relative z-10 min-h-screen">
        <Navbar />
        <main className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 grid-bg">
          <div id="hero">
            <Hero />
          </div>
          <About />
          <IndustryExperience />
          <Projects />
          <TechStack />
          <Education />
          <Certifications />
          <Publications />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
