import React, { useRef, useState } from 'react';
import { Box, IconButton, Typography, Card, CardMedia, CardContent, Modal } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { motion } from 'framer-motion';
import galleryItems from '@/data/gallery';
import theme from '@/theme';


const Gallery: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300; // Adjust this value to control the scroll distance
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const handleOpen = (index: number) => {
        setCurrentIndex(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleModalScroll = (direction: 'left' | 'right') => {
        setCurrentIndex((prevIndex) => {
            let newIndex = prevIndex + (direction === 'left' ? -1 : 1);
            if (newIndex < 0) newIndex = galleryItems.length - 1;
            if (newIndex >= galleryItems.length) newIndex = 0;
            return newIndex;
        });
    };

    return (
        <>
            <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden', marginTop: '4rem' }}>
            <Box id="education" sx={{ mt: '2rem', mb: '2rem', textAlign: 'center', px: 2 }}>
                <Box
                    sx={{
                        display: 'inline-block',
                        padding: '0.5rem',
                        width: '350px',
                        borderRadius: '50px',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(10px)',
                        marginBottom: '1rem',
                    }}
                >
                    <Typography variant="h5" sx={{ color: theme.palette.secondary.main }}>
                        Extra Curricular Activities
                    </Typography>
                </Box>
                </Box>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        zIndex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                    }}
                    onClick={() => handleScroll('left')}
                >
                    <ArrowBackIosIcon sx={{ color: 'white' }} />
                </IconButton>
                <Box
                    ref={scrollContainerRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        width: '100%',
                        padding: '1rem',
                        gap: '1rem',
                        '&::-webkit-scrollbar': {
                            display: 'none', // Hide scrollbar for a cleaner look
                        },
                    }}
                >
                    {galleryItems.map((item, index) => (
                        <Card
                            key={index}
                            sx={{
                                minWidth: '400px',
                                maxWidth: '300px',
                                flexShrink: 0,
                                cursor: 'pointer', // Show pointer cursor over the whole card
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            onClick={() => handleOpen(index)}
                        >
                            <CardMedia
                                component="img"
                                sx={{ width: '100%', height: '320px' }}
                                image={item.image}
                                alt={item.title}
                            />
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        zIndex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                    }}
                    onClick={() => handleScroll('right')}
                >
                    <ArrowForwardIosIcon sx={{ color: 'white' }} />
                </IconButton>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '80%',
                        height: '80%',
                        maxWidth: '800px',
                        maxHeight: '600px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: '1rem',
                    }}
                >
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            zIndex: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            },
                        }}
                        onClick={() => handleModalScroll('left')}
                    >
                        <ArrowBackIosIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Card sx={{ maxWidth: '100%', height: 'auto', borderRadius: 0 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: '100%', height: 'auto' }}
                                image={galleryItems[currentIndex].image}
                                alt={galleryItems[currentIndex].title}
                            />
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6">{galleryItems[currentIndex].title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {galleryItems[currentIndex].description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            zIndex: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            },
                        }}
                        onClick={() => handleModalScroll('right')}
                    >
                        <ArrowForwardIosIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Box>
            </Modal>
        </>
    );
};

export default Gallery;
