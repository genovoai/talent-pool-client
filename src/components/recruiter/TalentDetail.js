import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  Chip,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const TalentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [talent, setTalent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shortlisted, setShortlisted] = useState(false);

  // Mock data for a talent profile
  const mockTalent = {
    id: '1',
    name: 'John Smith',
    title: 'Full Stack Developer',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/johnsmith',
    github: 'https://github.com/johnsmith',
    website: 'https://johnsmith.dev',
    yearsOfExperience: 5,
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'GraphQL', 'AWS'],
    bio: 'Passionate full stack developer with 5+ years of experience building scalable web applications. Strong expertise in JavaScript ecosystem and cloud technologies.',
    availability: 'Immediately',
    education: [
      {
        id: 'edu1',
        school: 'Stanford University',
        degree: 'B.S.',
        fieldOfStudy: 'Computer Science',
        from: '2013-09-01',
        to: '2017-06-01',
        description: 'Graduated with honors. Focused on software engineering and artificial intelligence.'
      }
    ],
    experience: [
      {
        id: 'exp1',
        company: 'Tech Innovations',
        title: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        from: '2020-03-01',
        to: null,
        current: true,
        description: 'Lead developer for the company\'s main SaaS product. Implemented new features, improved performance, and mentored junior developers.'
      },
      {
        id: 'exp2',
        company: 'WebSolutions Inc.',
        title: 'Software Engineer',
        location: 'San Jose, CA',
        from: '2017-07-01',
        to: '2020-02-28',
        current: false,
        description: 'Developed and maintained various client projects using React, Node.js, and AWS. Collaborated with designers and product managers to deliver high-quality software.'
      }
    ],
    resumeUrl: '/uploads/resumes/john_smith_resume.pdf'
  };

  useEffect(() => {
    // Simulate API call to fetch talent data
    setLoading(true);
    setTimeout(() => {
      setTalent(mockTalent);
      setLoading(false);
    }, 1000);
  }, [id]);

  const toggleShortlist = () => {
    setShortlisted(!shortlisted);
    // Here you would typically dispatch an action to update the shortlist
    alert(shortlisted 
      ? `Removed ${talent.name} from shortlist`
      : `Added ${talent.name} to shortlist`
    );
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5">Loading profile...</Typography>
      </Container>
    );
  }

  if (!talent) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5">Talent not found</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={() => navigate('/recruiter/search')}
        >
          Back to Search
        </Button>
      </Container>
    );
  }

  // Format date function
  const formatDate = dateString => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        variant="outlined" 
        onClick={() => navigate('/recruiter/search')}
        sx={{ mb: 3 }}
      >
        Back to Search
      </Button>
      
      <Grid container spacing={3}>
        {/* Profile Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mx: 'auto', 
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem'
                }}
              >
                {talent.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" component="h1" gutterBottom>
                {talent.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {talent.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                {talent.location}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Available: {talent.availability}
              </Typography>
              
              <Button
                variant={shortlisted ? "contained" : "outlined"}
                color="secondary"
                startIcon={shortlisted ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                onClick={toggleShortlist}
                sx={{ mt: 2 }}
              >
                {shortlisted ? 'Shortlisted' : 'Add to Shortlist'}
              </Button>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <List dense>
              <ListItem>
                <ListItemIcon><EmailIcon /></ListItemIcon>
                <ListItemText primary={talent.email} />
              </ListItem>
              
              {talent.phone && (
                <ListItem>
                  <ListItemIcon><PhoneIcon /></ListItemIcon>
                  <ListItemText primary={talent.phone} />
                </ListItem>
              )}
              
              {talent.linkedin && (
                <ListItem>
                  <ListItemIcon><LinkedInIcon /></ListItemIcon>
                  <ListItemText 
                    primary="LinkedIn"
                    secondary={
                      <a href={talent.linkedin} target="_blank" rel="noopener noreferrer">
                        View Profile
                      </a>
                    } 
                  />
                </ListItem>
              )}
              
              {talent.github && (
                <ListItem>
                  <ListItemIcon><GitHubIcon /></ListItemIcon>
                  <ListItemText 
                    primary="GitHub"
                    secondary={
                      <a href={talent.github} target="_blank" rel="noopener noreferrer">
                        View Projects
                      </a>
                    } 
                  />
                </ListItem>
              )}
              
              {talent.website && (
                <ListItem>
                  <ListItemIcon><LanguageIcon /></ListItemIcon>
                  <ListItemText 
                    primary="Website"
                    secondary={
                      <a href={talent.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    } 
                  />
                </ListItem>
              )}
              
              {talent.resumeUrl && (
                <ListItem>
                  <ListItemIcon><DescriptionIcon /></ListItemIcon>
                  <ListItemText 
                    primary="Resume"
                    secondary={
                      <a href={talent.resumeUrl} target="_blank" rel="noopener noreferrer">
                        Download Resume
                      </a>
                    } 
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
        
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* About Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Typography variant="body1" paragraph>
              {talent.bio}
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Skills
            </Typography>
            <Box>
              {talent.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
            </Box>
          </Paper>
          
          {/* Experience Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <WorkIcon sx={{ mr: 1 }} />
              Work Experience
            </Typography>
            
            {talent.experience.map((exp) => (
              <Card key={exp.id} variant="outlined" sx={{ mb: 2, p: 1 }}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {exp.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {exp.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {exp.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {formatDate(exp.from)} - {formatDate(exp.to)}
                  </Typography>
                  <Typography variant="body2">
                    {exp.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
          
          {/* Education Section */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <SchoolIcon sx={{ mr: 1 }} />
              Education
            </Typography>
            
            {talent.education.map((edu) => (
              <Card key={edu.id} variant="outlined" sx={{ mb: 2, p: 1 }}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {edu.school}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {edu.degree} in {edu.fieldOfStudy}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {formatDate(edu.from)} - {formatDate(edu.to)}
                  </Typography>
                  <Typography variant="body2">
                    {edu.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TalentDetail; 