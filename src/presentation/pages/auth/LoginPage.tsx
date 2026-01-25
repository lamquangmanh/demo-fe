'use client';

// React Imports
import { z } from 'zod';
import { useState } from 'react';

// Next Imports
import Link from 'next/link';

// MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';

// Type Imports
import type { Mode } from '@ui/core/types';

// Component Imports
import Logo from '@ui/components/layout/shared/Logo';
import Illustrations from '@ui/components/Illustrations';

// Config Imports
import themeConfig from '@ui/configs/themeConfig';

// Hook Imports
import { useImageVariant } from '@ui/core/hooks/useImageVariant';

// import from domain
import { AUTH_FORGOT_PASSWORD_PATH } from '@/common/constants';

// import from presentation/hooks
import { useLogin, useComponentMounted } from '@/presentation/hooks';
// import from presentation/components
import { PageLoading } from '@/presentation/components/atoms';

export const LoginPage = ({ mode }: { mode: Mode }) => {
  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png';
  const lightImg = '/images/pages/auth-v1-mask-light.png';

  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const authBackground = useImageVariant(mode, lightImg, darkImg);
  const { handleLogin, loading } = useLogin();

  // Prevent hydration mismatch
  const isMounted = useComponentMounted();
  if (!isMounted) return <PageLoading />;

  const handleClickShowPassword = () => setIsPasswordShown((show) => !show);

  // Define the validation schema for login
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    // Extract form data
    const formData = new FormData(e.currentTarget);
    const values = {
      email: (formData.get('email') as string)?.trim() || '',
      password: (formData.get('password') as string) || '',
    };

    const parsed = loginSchema.safeParse(values);

    // If validation fails, show errors
    if (!parsed.success) {
      const newErrors: { email?: string; password?: string } = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0] === 'email' || err.path[0] === 'password') {
          newErrors[err.path[0]] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    // Valid - parsed.data is now properly typed
    handleLogin(parsed.data);
  };

  return (
    <div className="flex flex-col justify-center items-center min-bs-[100dvh] relative p-6">
      <Card className="flex flex-col sm:is-[450px]">
        <CardContent className="p-6 sm:!p-12">
          <Link href="/" className="flex justify-center items-center mbe-6">
            <Logo />
          </Link>
          <div className="flex flex-col gap-5">
            <div>
              <Typography variant="h4">{`Welcome to ${themeConfig.templateName}!👋🏻`}</Typography>
              <Typography className="mbs-1">
                Please sign-in to your account and start the adventure
              </Typography>
            </div>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <TextField
                autoFocus
                fullWidth
                label="Email"
                name="email"
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                id="outlined-adornment-password"
                type={isPasswordShown ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <i
                            className={
                              isPasswordShown
                                ? 'ri-eye-off-line'
                                : 'ri-eye-line'
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <div className="flex justify-between items-center gap-x-3 gap-y-1 flex-wrap">
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Typography
                  className="text-end"
                  color="primary"
                  component={Link}
                  href={AUTH_FORGOT_PASSWORD_PATH}
                >
                  Forgot password?
                </Typography>
              </div>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                loading={loading}
              >
                Log In
              </Button>
              <div className="flex justify-center items-center flex-wrap gap-2">
                <Typography>New on our platform?</Typography>
                {/* <Typography component={Link} href="/register" color="primary">
                  Create an account
                </Typography> */}
              </div>
              <Divider className="gap-3">or</Divider>
              <div className="flex justify-center items-center gap-2">
                <IconButton
                  size="small"
                  className="text-facebook"
                  style={{ color: '#497ce2' }}
                >
                  <i className="ri-facebook-fill" />
                </IconButton>
                <IconButton
                  size="small"
                  className="text-twitter"
                  style={{ color: '#1da1f2' }}
                >
                  <i className="ri-twitter-fill" />
                </IconButton>
                <IconButton
                  size="small"
                  className="text-github"
                  style={{ color: '#272727' }}
                >
                  <i className="ri-github-fill" />
                </IconButton>
                <IconButton
                  size="small"
                  className="text-googlePlus"
                  style={{ color: '#db4437' }}
                >
                  <i className="ri-google-fill" />
                </IconButton>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  );
};
