import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const CraftsmanProfile: React.FC = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        ملف الحرفي #{id}
      </Typography>
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          قريباً - صفحة ملف الحرفي
        </Typography>
      </Box>
    </Container>
  );
};

export default CraftsmanProfile;