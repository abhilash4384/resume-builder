import AdbIcon from '@mui/icons-material/Adb';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const nav = useNavigate();
  return (
    <div>
      <AppBar position="fixed" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              role="button"
              onClick={() => nav('/')}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Resume Builder
            </Typography>

            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="body1"
              noWrap
              component="a"
              onClick={() => nav('/')}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                // letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Resume Builder
            </Typography>
            <Box sx={{ flexGrow: 0 }} id="portal-root" />
          </Toolbar>
        </Container>
      </AppBar>
      <div className="mt-12">
        <Outlet />
      </div>
    </div>
  );
}
export default Layout;
