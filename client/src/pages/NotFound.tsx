import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: '8rem',
            fontWeight: 700,
            color: 'primary.main',
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          الصفحة غير موجودة
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          عذراً، الصفحة التي تبحث عنها غير متاحة
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/')}
          sx={{ textTransform: 'none' }}
        >
          {t('common.home')}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;