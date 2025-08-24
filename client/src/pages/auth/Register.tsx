import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Divider,
  Alert,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();
  const { showSuccess, showError } = useNotification();

  const [userType, setUserType] = useState<'user' | 'craftsman'>('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: '',
    district: '',
    businessName: '',
    specializations: [],
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newUserType: 'user' | 'craftsman',
  ) => {
    if (newUserType !== null) {
      setUserType(newUserType);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      showError('كلمات المرور غير متطابقة');
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: userType,
      location: {
        city: formData.city,
        district: formData.district,
      },
    };

    if (userType === 'craftsman') {
      Object.assign(userData, {
        businessName: formData.businessName,
        specializations: [{ category: 'electrical' }], // مبسط للنموذج الأولي
        description: formData.description,
      });
    }

    try {
      await register(userData);
      showSuccess('تم إنشاء الحساب بنجاح');
      navigate('/dashboard');
    } catch (error) {
      showError('فشل في إنشاء الحساب');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 4 }}
        >
          {t('auth.registerTitle')}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <ToggleButtonGroup
            value={userType}
            exclusive
            onChange={handleUserTypeChange}
            sx={{ borderRadius: 2 }}
          >
            <ToggleButton value="user" sx={{ px: 4, py: 1 }}>
              {t('auth.registerAsUser')}
            </ToggleButton>
            <ToggleButton value="craftsman" sx={{ px: 4, py: 1 }}>
              {t('auth.registerAsCraftsman')}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="name"
                label={t('auth.name')}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="email"
                label={t('auth.email')}
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="phone"
                label={t('auth.phone')}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="city"
                label={t('auth.city')}
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="district"
                label={t('auth.district')}
                value={formData.district}
                onChange={handleChange}
                required
              />
            </Grid>
            
            {userType === 'craftsman' && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="businessName"
                  label={t('auth.businessName')}
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
              </Grid>
            )}
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="password"
                label={t('auth.password')}
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="confirmPassword"
                label={t('auth.confirmPassword')}
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Grid>
            
            {userType === 'craftsman' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label={t('auth.description')}
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Grid>
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              textTransform: 'none',
              mt: 4,
              mb: 3,
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t('common.register')
            )}
          </Button>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary" textAlign="center">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link component={RouterLink} to="/login" fontWeight={600}>
              {t('common.login')}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;