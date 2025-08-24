import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('dashboard.welcome')} {user?.name}
      </Typography>
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          قريباً - لوحة تحكم {user?.role === 'craftsman' ? 'الحرفي' : 'المستخدم'}
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;