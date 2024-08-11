import { Typography, Card, CardContent, CardMedia, Box, Chip, useTheme, useMediaQuery } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import experiences from '../data/experience';


const IndustryExperience = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box id="industry-experience" sx={{ mt: '0rem', padding: '6rem 1rem', textAlign: 'center' }}>
            <Box
                sx={{
                    display: 'inline-block',
                    padding: '0.5rem',
                    width: isSmallScreen ? '100%' : '270px',
                    borderRadius: '50px',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(10px)',
                    marginBottom: '2rem',
                }}
            >
                <Typography variant="h5" sx={{ color: theme.palette.secondary.main }}>Industry Experience</Typography>
            </Box>
            <Timeline position={isSmallScreen ? "right" : "alternate"}>
                {experiences.map((experience, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent
                            sx={{
                                flex: 1,
                                py: 1,
                                px: 2,
                                textAlign: 'right',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                color: theme.palette.text.secondary,
                            }}
                        >
                            <Typography variant="body1">
                                {experience.startDate} - {experience.endDate}
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="secondary" />
                            {index < experiences.length - 1 && <TimelineConnector />}
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Card sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: isSmallScreen ? '100%' : 220, height: isSmallScreen ? 'auto' : 'auto', marginLeft: '1rem', marginRight: '1rem', borderRadius: '8px' }}
                                    image={experience.image}
                                    alt={experience.company}
                                />
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h6" component="div" sx={{ color: theme.palette.primary.main }}>
                                        {experience.title} at {experience.company}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ color: theme.palette.text.secondary }}>
                                        {experience.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                                        {experience.technologies.map((tech, techIndex) => (
                                            <Chip label={tech} key={techIndex} />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Box>
    );
};

export default IndustryExperience;
