import { Box, Typography } from '@mui/material';
import { Component } from 'react';

export class ErrorBoundry extends Component<any, { isError: boolean }> {
  state = {
    isError: false,
  };

  static getDerivedStateFromError(error: any) {
    console.log('error = ', error);
    return { isError: true };
  }

  render() {
    if (this.state?.isError) {
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          background: '#1976d2',
        }}
      >
        <Typography variant="h1" style={{ color: 'white' }}>
          500
        </Typography>
        <Typography variant="h6" style={{ color: 'white' }}>
          Something went wrong!
        </Typography>
      </Box>;
    }
    return this.props?.children;
  }
}

export default ErrorBoundry;
