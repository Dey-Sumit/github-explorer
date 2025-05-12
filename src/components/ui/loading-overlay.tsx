import { styled, Box } from '@mui/material';

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  zIndex: 1,
  borderRadius: theme.shape.borderRadius,
}));

export default LoadingOverlay;
