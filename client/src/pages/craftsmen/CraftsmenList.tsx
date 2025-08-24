import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CraftsmenList: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('craftsmen.findCraftsmen')}
      </Typography>
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          قريباً - صفحة قائمة الحرفيين
        </Typography>
      </Box>
    </Container>
  );
};

export default CraftsmenList;