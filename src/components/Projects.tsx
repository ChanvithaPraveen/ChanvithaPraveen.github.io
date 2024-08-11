// import { Typography, Grid, Card, CardContent, CardMedia, Button, Box, Chip, IconButton, useTheme, Dialog, DialogContent } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import OpenInNewIcon from '@mui/icons-material/OpenInNew'; 
// import { useState } from 'react';
// import { motion, useInView  } from 'framer-motion';

// const projects = [
//   { 
//     title: 'AR/VR based simulator for custom made garments', 
//     description: 'A project for garment field that users input basic body measurements & the scratch Deep Learning model gives complex body measurements. Users can wear custom garments designed by super admins in virtual wardrobe before purchasing.', 
//     image: '/clothcraftar.png', 
//     video: '/clothcraftar.mp4',  
//     link: 'https://github.com/Nilupa-Illangarathna/FYP-ClothCraftAR_NodeBackend', 
//     github: 'https://github.com/rusirugunaratne/clothcraft-ar',
//     technologies: ['React', 'Node.js', 'MongoDB', 'fastapi', 'python', 'supabase']
//   },

//   { 
//     title: 'Micro Serviced Online Airline Reservation System', 
//     description: 'Developing separate services for User, Reservations, Flight Information, Frontend. Having Eureka service, load balancers, separate databases to have the microservice architecture. Try to maintain zero downtime with multi-servers (Blue/Green). ', 
//     image: '/airline.png', 
//     video: '/aerospace.mp4', 
//     link: '', 
//     github: 'https://github.com/Binary-Clan/Airline-Reservation-System',
//     technologies: [ 'Java', 'SpringBoot', 'Eureka Server', 'React', 'Docker', 'Microservices Architecture']
//   },

//   { 
//     title: 'Advanced Vision Sudoku Puzzle Detector & Solver ', 
//     description: 'This project is a 9x9 & 16x16 Sudoku Puzzle Solver application. Detect the puzzle via a camera & OCR by Easy OCR. Then pass the puzzle and solve in C++ because fast execution. For 9x9 puzzle it takes ~2.6ms & for 16x16 puzzle it takes only ~16.5ms.', 
//     image: '/sudokuLogo.png', 
//     video: '/VisualSudoku.mp4',  
//     link: '', 
//     github: 'https://github.com/rusirugunaratne/VisualSudoku.git',
//     technologies: [  'C++', 'Python', 'React', 'OpenCV', 'OCR', 'Computer Vision', 'ML', 'Heuristic Backtracking Algorithm' ]
//   },

//   { 
//     title: 'elCare Mobile Application', 
//     description: '\‘Elcare\’ is developed for senior citizens to assist effectively. They will get digital assistance through this application to easily manage their medical routines, sleep deprivation, emergencies, and to reach the family doctor and share their medical info. ', 
//     image: '/elcare.png', 
//     video: '/elcare.mp4',  
//     link: '', 
//     github: 'https://github.com/ChanvithaPraveen/elCare-Mobile-Application.git',
//     technologies: [  'Flutter', 'Dart', 'Firebase', 'SQLite', 'Android', 'Hive' ]
//   },

//   { 
//     title: 'IPL Twitter Hashtags Analysis & Forecaster', 
//     description: 'This project Analyzes Twitter hashtags data to understand user engagement trends over time & across cities for analyzing past macro-data, past micro-data, forecasting future data. Initial dataset had 11 columns, after feature engineering, could be able to have 22 columns. Hope to add real time data stream analysis part also using Kafka as further improvements.', 
//     image: '/iplAnalyzer.png', 
//     video: '/iplAnalyzer.mp4',  
//     link: '', 
//     github: 'https://github.com/ChanvithaPraveen/IPL-Twitter-Hashtags-Analysis.git',
//     technologies: [ 'Python', 'Streamlit', 'CSS', 'FASTAPI', 'TensorFlow', 'Data Mining', 'Deep Learning', 'GEO-API' ]
//   },

//   { 
//     title: 'Realtime Chat Translator', 
//     description: 'A Web Application with translation functionality for improve the ethnic cohesion. Users can send messages in their language, then translated and displayed to the recipient\'s chosen language. All messages show in a common chat lobby.', 
//     image: '/realtimetranslator.png', 
//     video: '/realtimetranslator.mp4',  
//     link: '', 
//     github: 'https://github.com/ChanvithaPraveen/Realtime-Message-Translator.git',
//     technologies: [ 'Python', 'Streamlit', 'MyMemoryTranslation API', 'Realtime Firebase' ]
//   },

//   { 
//     title: 'Cryptanz Blockchain Transaction System', 
//     description: ' The “Cryptanz” platform is developed for transferring digital currencies via the Ethereum chain and the Ropston network. Also can view the latest transactions. As future improvements hope to add sending messages via AES encrypted method and user login via a PGP mail server instead of google sign-in at the moment.', 
//     image: '/cryptanz.png', 
//     video: '/cryptanz.mp4',  
//     link: '', 
//     github: 'https://github.com/ChanvithaPraveen/cryptanz-blockchain-transaction-system.git',
//     technologies: [ 'JavaScript', 'solidity', 'react', 'tailwindcss', 'hardhat', 'vite', 'blockchain' ]
//   },

//   { 
//     title: 'AI vs Real Human Images - Research', 
//     description: 'Classify High Realistic Stable Diffusion AI generated images and Real photographs of Human Faces to protect online privacy. Trained a custom dataset that assembled ~17000 images on ViT (Vision Transformer) model & developed an API to integrate into image uploaders in social media apps, web sites, etc. Currently got 99.97% accuracy & doing more optimizations. ', 
//     image: '/research.png', 
//     video: '/',  
//     link: '', 
//     github: '#',
//     technologies: [ 'Python', 'FastAPI', 'Google Collab', 'ViT(Vision Transformers)', 'Pandas', 'Image Processing' ]
//   },
  
  
// ];

// const Projects = () => {
//   const theme = useTheme();
//   const [liked, setLiked] = useState(Array(projects.length).fill(false));
//   const [openVideo, setOpenVideo] = useState<string | null>(null);
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   const handleLike = (index: number) => {
//     const newLiked = [...liked];
//     newLiked[index] = !newLiked[index];
//     setLiked(newLiked);
//   };

//   const handleOpenVideo = (videoUrl: string) => {
//     setOpenVideo(videoUrl);
//   };

//   const handleCloseVideo = () => {
//     setOpenVideo(null);
//   };

//   const handleCardClick = (index: number, videoUrl: string, e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevents event from bubbling up
//     handleOpenVideo(videoUrl);
//   };

//   const handleButtonClick = (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevents event from bubbling up
//   };

//   return (
//     <Box id="projects" sx={{ mt: '-8rem', padding: '6rem 1rem', textAlign: 'center', alignItems: 'center' }}>
//       <Box
//         sx={{
//           display: 'inline-block',
//           padding: '0.5rem',
//           width: '150px',
//           borderRadius: '50px',
//           backgroundColor: 'rgba(0, 0, 0, 0.4)',
//           backdropFilter: 'blur(10px)',
//           marginBottom: '4rem',
//         }}
//       >
//         <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>Projects</Typography>
//       </Box>
//       <Grid container spacing={4}>
//         {projects.map((project, index) => (
//           <Grid item xs={12} md={4} key={index}>
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//             >
//               <Card
//                 sx={{
//                   backgroundColor: 'rgba(0, 0, 0, 0.4)',
//                   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
//                   borderRadius: '15px',
//                   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                   overflow: 'hidden',
//                   position: 'relative',
//                   '&:hover': {
//                     transform: 'scale(1.05)',
//                     boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)',
//                   }
//                 }}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//                 onClick={(e) => handleCardClick(index, project.video, e)}
//               >
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={project.image}
//                   alt={project.title}
//                   sx={{
//                     transition: 'opacity 0.3s ease',
//                     opacity: hoveredIndex === index ? 0 : 1,
//                   }}
//                 />
//                 <video
//                   src={project.video}
//                   autoPlay
//                   muted
//                   loop
//                   style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                     opacity: hoveredIndex === index ? 1 : 0,
//                     transition: 'opacity 0.3s ease',
//                   }}
//                 />
//                 {hoveredIndex === index && (
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       top: '50%',
//                       left: '50%',
//                       transform: 'translate(-50%, -50%)',
//                       color: 'white',
//                       backgroundColor: 'rgba(0, 0, 0, 0.6)',
//                       padding: '0.5rem 1rem',
//                       borderRadius: '5px',
//                       fontSize: '1rem',
//                       textAlign: 'center',
//                       cursor: 'pointer',
//                       zIndex: 10,
//                     }}
//                   >
//                     Click to View in Full Screen
//                   </Box>
//                 )}
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">{project.title}</Typography>
//                   <Typography variant="body2" color="text.secondary">{project.description}</Typography>
//                   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
//                     {project.technologies.map((tech, techIndex) => (
//                       <Chip label={tech} key={techIndex} />
//                     ))}
//                   </Box>
//                   <Box sx={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Button
//                       size="small"
//                       href={project.github}
//                       target="_blank"
//                       onClick={handleButtonClick} // Prevent card click when clicking the button
//                     >
//                       GitHub Repo <OpenInNewIcon sx={{marginLeft: '0.5rem'}} />
//                     </Button>
//                     <IconButton
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevent card click when clicking the heart icon
//                         handleLike(index);
//                       }}
//                       color={liked[index] ? 'error' : 'default'}
//                     >
//                       <FavoriteIcon />
//                     </IconButton>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//       <Dialog open={!!openVideo} onClose={handleCloseVideo} maxWidth="md" fullWidth>
//         <DialogContent>
//           <video
//             src={openVideo || ''}
//             controls
//             autoPlay
//             style={{ width: '100%', height: 'auto' }}
//           />
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default Projects;



import { Typography, Grid, Card, CardContent, CardMedia, Button, Box, Chip, IconButton, useTheme, Dialog, DialogContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OpenInNewIcon from '@mui/icons-material/OpenInNew'; 
import { useState } from 'react';
import { motion } from 'framer-motion';
import projects from '../data/projects';

  const Projects = () => {
    const theme = useTheme();
    const [liked, setLiked] = useState(Array(projects.length).fill(false));
    const [openVideo, setOpenVideo] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
    const handleLike = (index: number) => {
      const newLiked = [...liked];
      newLiked[index] = !newLiked[index];
      setLiked(newLiked);
    };
  
    const handleOpenVideo = (videoUrl: string) => {
      setOpenVideo(videoUrl);
    };
  
    const handleCloseVideo = () => {
      setOpenVideo(null);
    };
  
    const handleCardClick = (index: number, videoUrl: string, e: React.MouseEvent) => {
      e.stopPropagation(); // Prevents event from bubbling up
      handleOpenVideo(videoUrl);
    };
  
    const handleButtonClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevents event from bubbling up
    };
  
    return (
      <Box id="projects" sx={{ mt: '-8rem', padding: '6rem 1rem', textAlign: 'center', alignItems: 'center' }}>
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
          <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>Projects</Typography>
        </Box>
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    borderRadius: '15px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)',
                    }
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={(e) => handleCardClick(index, project.video, e)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={project.image}
                    alt={project.title}
                    sx={{
                      transition: 'opacity 0.3s ease',
                      opacity: hoveredIndex === index ? 0 : 1,
                    }}
                  />
                  {project.video.includes('youtube.com') && hoveredIndex === index ? (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'black',
                        zIndex: 1,
                      }}
                    >
                      <iframe
                        width="100%"
                        height="100%"
                        src={`${project.video}?autoplay=1`}
                        title={project.title}
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        style={{ pointerEvents: 'none' }}
                      />
                    </Box>
                  ) : (
                    <video
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: hoveredIndex === index ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    />
                  )}
                  {hoveredIndex === index && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        fontSize: '1rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                      }}
                    >
                      Click to View in Full Screen
                    </Box>
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{project.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{project.description}</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                      {project.technologies.map((tech, techIndex) => (
                        <Chip label={tech} key={techIndex} />
                      ))}
                    </Box>
                    <Box sx={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Button
                        size="small"
                        href={project.github}
                        target="_blank"
                        onClick={handleButtonClick} // Prevent card click when clicking the button
                      >
                        GitHub Repo <OpenInNewIcon sx={{marginLeft: '0.5rem'}} />
                      </Button>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click when clicking the heart icon
                          handleLike(index);
                        }}
                        color={liked[index] ? 'error' : 'default'}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        <Dialog open={!!openVideo} onClose={handleCloseVideo} maxWidth="md" fullWidth>
          <DialogContent>
            {openVideo && openVideo.includes('youtube.com') ? (
              <iframe
                width="100%"
                height="auto"
                src={`${openVideo}?autoplay=1`}
                title="Project Video"
                frameBorder="0"
                allow="autoplay; fullscreen"
                style={{ width: '100%', height: '500px' }}
              />
            ) : (
              <video
                src={openVideo || ''}
                controls
                autoPlay
                style={{ width: '100%', height: 'auto' }}
              />
            )}
          </DialogContent>
        </Dialog>
      </Box>
    );
  };
  
  export default Projects;
