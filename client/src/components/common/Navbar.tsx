import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
  Avatar, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  useTheme,
  useMediaQuery,
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Build as BuildIcon,
  Add as AddIcon,
  Dashboard as DashboardIcon,
  AccountCircle as AccountIcon,
  ExitToApp as LogoutIcon,
  Language as LanguageIcon,
  Notifications as NotificationsIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ language, onLanguageChange }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { user, isAuthenticated, logout } = useAuth();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);

  // Handle mobile drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle user menu
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  // Handle language menu
  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };

  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/');
  };

  // Handle language change
  const handleLanguageChange = (newLanguage: string) => {
    onLanguageChange(newLanguage);
    handleLanguageMenuClose();
  };

  // Navigation items
  const navigationItems = [
    { label: t('common.home'), path: '/', icon: <HomeIcon /> },
    { label: t('common.craftsmen'), path: '/craftsmen', icon: <BuildIcon /> },
    { label: t('services.requestService'), path: '/request-service', icon: <AddIcon /> },
  ];

  // Mobile drawer content
  const drawerContent = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {navigationItems.map((item) => (
          <ListItem 
            button 
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main + '20',
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
                '& .MuiListItemText-primary': {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        
        {!isAuthenticated && (
          <>
            <ListItem button onClick={() => handleNavigation('/login')}>
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary={t('common.login')} />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/register')}>
              <ListItemIcon><RegisterIcon /></ListItemIcon>
              <ListItemText primary={t('common.register')} />
            </ListItem>
          </>
        )}
        
        {isAuthenticated && (
          <>
            <ListItem button onClick={() => handleNavigation('/dashboard')}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary={t('common.dashboard')} />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary={t('common.logout')} />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Typography
            variant="h5"
            component="div"
            onClick={() => handleNavigation('/')}
            sx={{
              flexGrow: isMobile ? 1 : 0,
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer',
              mr: 4,
            }}
          >
            CraftsConnect
          </Typography>

          {/* Desktop navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    color: location.pathname === item.path 
                      ? theme.palette.primary.main 
                      : theme.palette.text.primary,
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    textTransform: 'none',
                    fontSize: '1rem',
                    px: 2,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main + '10',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Language selector */}
            <IconButton
              onClick={handleLanguageMenuOpen}
              sx={{ color: theme.palette.text.primary }}
            >
              <LanguageIcon />
            </IconButton>

            {/* Notifications for authenticated users */}
            {isAuthenticated && (
              <IconButton sx={{ color: theme.palette.text.primary }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}

            {/* User menu or auth buttons */}
            {isAuthenticated ? (
              <IconButton onClick={handleUserMenuOpen}>
                <Avatar
                  src={user?.avatar}
                  alt={user?.name}
                  sx={{ 
                    width: 36, 
                    height: 36,
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            ) : (
              !isMobile && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleNavigation('/login')}
                    sx={{ textTransform: 'none' }}
                  >
                    {t('common.login')}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleNavigation('/register')}
                    sx={{ textTransform: 'none' }}
                  >
                    {t('common.register')}
                  </Button>
                </Box>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor={language === 'ar' ? 'right' : 'left'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* User menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          },
        }}
      >
        <MenuItem onClick={() => { handleNavigation('/dashboard'); handleUserMenuClose(); }}>
          <ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t('common.dashboard')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { handleNavigation('/profile'); handleUserMenuClose(); }}>
          <ListItemIcon><AccountIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t('common.profile')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t('common.logout')}</ListItemText>
        </MenuItem>
      </Menu>

      {/* Language menu */}
      <Menu
        anchorEl={languageMenuAnchor}
        open={Boolean(languageMenuAnchor)}
        onClose={handleLanguageMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 150,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          },
        }}
      >
        <MenuItem 
          onClick={() => handleLanguageChange('ar')}
          selected={language === 'ar'}
        >
          <ListItemText>{t('common.arabic')}</ListItemText>
        </MenuItem>
        <MenuItem 
          onClick={() => handleLanguageChange('en')}
          selected={language === 'en'}
        >
          <ListItemText>{t('common.english')}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;