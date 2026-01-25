// ui/components/Page.tsx
import { Box, Typography } from '@mui/material';

export function Page({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Typography variant="h4" mb={2}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
