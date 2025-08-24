import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  ElectricalServices,
  Plumbing,
  Carpenter,
  FormatPaint,
  AcUnit,
  BuildCircle,
  Star,
  CheckCircle,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  // Sample data - in real app, this would come from API
  const services = [
    { key: 'electrical', icon: <ElectricalServices />, color: '#ff6b35' },
    { key: 'plumbing', icon: <Plumbing />, color: '#4dabf7' },
    { key: 'carpentry', icon: <Carpenter />, color: '#8b5a3c' },
    { key: 'painting', icon: <FormatPaint />, color: '#f59f00' },
    { key: 'airconditioning', icon: <AcUnit />, color: '#339af0' },
    { key: 'appliance_repair', icon: <BuildCircle />, color: '#51cf66' },
  ];

  const featuredCraftsmen = [
    {
      id: 1,
      name: 'أحمد محمد',
      avatar: '/images/craftsman1.jpg',
      rating: 4.8,
      reviews: 124,
      specialization: 'كهرباء',
      location: 'الرياض',
    },
    {
      id: 2,
      name: 'علي العتيبي',
      avatar: '/images/craftsman2.jpg',
      rating: 4.9,
      reviews: 89,
      specialization: 'سباكة',
      location: 'جدة',
    },
    {
      id: 3,
      name: 'محمد الغامدي',
      avatar: '/images/craftsman3.jpg',
      rating: 4.7,
      reviews: 156,
      specialization: 'نجارة',
      location: 'الدمام',
    },
  ];

  const stats = [
    { number: '500+', label: t('home.stats.craftsmen') },
    { number: '2,000+', label: t('home.stats.completedJobs') },
    { number: '1,800+', label: t('home.stats.customers') },
    { number: '15+', label: t('home.stats.cities') },
  ];

  const steps = [
    {
      title: t('home.step1Title'),
      description: t('home.step1Description'),
      icon: '1',
    },
    {
      title: t('home.step2Title'),
      description: t('home.step2Description'),
      icon: '2',
    },
    {
      title: t('home.step3Title'),
      description: t('home.step3Description'),
      icon: '3',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)}, ${alpha(theme.palette.secondary.main, 0.8)})`,
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/images/hero-pattern.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' },
                  lineHeight: 1.2,
                }}
              >
                {t('home.title')}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                }}
              >
                {t('home.subtitle')}
              </Typography>
              
              {/* Search Bar */}
              <Paper
                elevation={3}
                sx={{
                  p: 1,
                  borderRadius: 3,
                  backgroundColor: 'white',
                  mb: 4,
                }}
              >
                <TextField
                  fullWidth
                  placeholder={t('home.searchPlaceholder')}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          textTransform: 'none',
                        }}
                      >
                        {t('common.search')}
                      </Button>
                    ),
                    sx: {
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      '& .MuiInputBase-input': {
                        py: 2,
                        fontSize: '1.1rem',
                      },
                    },
                  }}
                />
              </Paper>

              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/request-service')}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  borderRadius: 3,
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: alpha('white', 0.9),
                  },
                }}
              >
                {t('services.requestService')}
              </Button>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: 'center',
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 2,
                  },
                }}
              >
                <img
                  src="/images/hero-illustration.svg"
                  alt="Craftsmen illustration"
                  style={{ maxHeight: '400px' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          الخدمات المتاحة
        </Typography>
        
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={6} sm={4} md={2} key={service.key}>
              <Card
                sx={{
                  textAlign: 'center',
                  py: 3,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  },
                }}
                onClick={() => navigate(`/craftsmen?category=${service.key}`)}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: alpha(service.color, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: service.color,
                    fontSize: '2rem',
                  }}
                >
                  {service.icon}
                </Box>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  sx={{ fontSize: '0.9rem' }}
                >
                  {t(`categories.${service.key}`)}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ backgroundColor: theme.palette.grey[50], py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 6, fontWeight: 600 }}
          >
            {t('home.howItWorks')}
          </Typography>
          
          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      fontSize: '2rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: '1.1rem' }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Craftsmen */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          {t('home.featuredCraftsmen')}
        </Typography>
        
        <Grid container spacing={3}>
          {featuredCraftsmen.map((craftsman) => (
            <Grid item xs={12} sm={6} md={4} key={craftsman.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  },
                }}
                onClick={() => navigate(`/craftsman/${craftsman.id}`)}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Avatar
                    src={craftsman.avatar}
                    alt={craftsman.name}
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      border: `3px solid ${theme.palette.primary.main}`,
                    }}
                  />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {craftsman.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {craftsman.specialization} • {craftsman.location}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <Rating value={craftsman.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {craftsman.rating} ({craftsman.reviews})
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/craftsmen')}
            sx={{
              textTransform: 'none',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            {t('craftsmen.findCraftsmen')}
          </Button>
        </Box>
      </Container>

      {/* Stats Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;