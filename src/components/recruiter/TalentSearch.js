import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  CardActions,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';

const TalentSearch = () => {
  const [searchParams, setSearchParams] = useState({
    keywords: '',
    location: '',
    experience: '',
    skills: ''
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for talents
  const mockTalents = [
    {
      id: '1',
      name: 'John Smith',
      title: 'Full Stack Developer',
      location: 'San Francisco, CA',
      yearsOfExperience: 5,
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      education: 'B.S. Computer Science, Stanford University',
      availability: 'Immediately'
    },
    {
      id: '2',
      name: 'Jane Doe',
      title: 'UX/UI Designer',
      location: 'New York, NY',
      yearsOfExperience: 3,
      skills: ['Figma', 'Adobe XD', 'CSS', 'User Research'],
      education: 'M.A. Design, Parsons School of Design',
      availability: '2 weeks'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      title: 'DevOps Engineer',
      location: 'Austin, TX',
      yearsOfExperience: 7,
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
      education: 'B.S. Computer Engineering, MIT',
      availability: '1 month'
    }
  ];

  const { keywords, location, experience, skills } = searchParams;

  const onChange = e => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const filtered = mockTalents.filter(talent => {
        // Search by keywords in name or title
        const keywordMatch = !keywords || 
          talent.name.toLowerCase().includes(keywords.toLowerCase()) || 
          talent.title.toLowerCase().includes(keywords.toLowerCase());
          
        // Filter by location
        const locationMatch = !location || 
          talent.location.toLowerCase().includes(location.toLowerCase());
          
        // Filter by experience
        const experienceMatch = !experience || 
          (experience === 'less-than-3' && talent.yearsOfExperience < 3) ||
          (experience === '3-5' && talent.yearsOfExperience >= 3 && talent.yearsOfExperience <= 5) ||
          (experience === 'more-than-5' && talent.yearsOfExperience > 5);
          
        // Filter by skills
        const skillsMatch = !skills || 
          talent.skills.some(skill => 
            skill.toLowerCase().includes(skills.toLowerCase())
          );
          
        return keywordMatch && locationMatch && experienceMatch && skillsMatch;
      });
      
      setResults(filtered);
      setLoading(false);
    }, 1000);
  };

  // Initial load
  useEffect(() => {
    setResults(mockTalents);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Search Talent
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box component="form" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Keywords"
                name="keywords"
                value={keywords}
                onChange={onChange}
                placeholder="Job title, skills, or name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={location}
                onChange={onChange}
                placeholder="City, state, or remote"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Experience</InputLabel>
                <Select
                  name="experience"
                  value={experience}
                  label="Experience"
                  onChange={onChange}
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="less-than-3">Less than 3 years</MenuItem>
                  <MenuItem value="3-5">3-5 years</MenuItem>
                  <MenuItem value="more-than-5">More than 5 years</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Skills"
                name="skills"
                value={skills}
                onChange={onChange}
                placeholder="e.g., React, AWS"
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ height: '100%', width: '100%' }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      <Typography variant="h6" gutterBottom>
        {results.length} Candidates Found
      </Typography>
      
      <Grid container spacing={3}>
        {results.map(talent => (
          <Grid item xs={12} md={6} lg={4} key={talent.id}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {talent.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {talent.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {talent.location}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <WorkIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {talent.yearsOfExperience} years of experience
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {talent.education}
                  </Typography>
                </Box>
                
                <Typography variant="body2" gutterBottom>
                  Available: {talent.availability}
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  {talent.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`/recruiter/talent/${talent.id}`}
                  size="small"
                  color="primary"
                >
                  View Profile
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TalentSearch; 