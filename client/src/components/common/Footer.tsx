import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.900',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              CraftsConnect
            </Typography>
            <Typography variant="body2" color="grey.300">
              منصة تربطك بأفضل الحرفيين المتخصصين في منطقتك
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              روابط سريعة
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="grey.300" underline="hover">
                {t('common.home')}
              </Link>
              <Link href="/craftsmen" color="grey.300" underline="hover">
                {t('common.craftsmen')}
              </Link>
              <Link href="/request-service" color="grey.300" underline="hover">
                {t('services.requestService')}
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              تواصل معنا
            </Typography>
            <Typography variant="body2" color="grey.300">
              البريد الإلكتروني: info@craftsconnect.com
            </Typography>
            <Typography variant="body2" color="grey.300">
              الهاتف: +966 50 123 4567
            </Typography>
          </Grid>
        </Grid>
        
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'grey.700',
            mt: 4,
            pt: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="grey.400">
            © 2024 CraftsConnect. جميع الحقوق محفوظة.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;