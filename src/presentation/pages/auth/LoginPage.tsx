'use client';
import { z } from 'zod';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, Card } from 'antd';

// import from domain
import { AUTH_FORGOT_PASSWORD_PATH } from '@/common/constants';

// import from presentation/hooks
import { useLogin, useComponentMounted } from '@/presentation/hooks';
// import from presentation/components
import { PageLoading } from '@/presentation/components/atoms';

export const LoginPage = () => {
  const [form] = Form.useForm();
  const { handleLogin, loading } = useLogin();

  // Prevent hydration mismatch
  const isMounted = useComponentMounted();
  if (!isMounted) return <PageLoading />;

  // Define the validation schema for login
  const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string(),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    const parsed = loginSchema.safeParse(values);

    // If validation fails, set form errors
    if (!parsed.success) {
      const fieldErrors = parsed.error.format();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.entries(fieldErrors).forEach(([field, error]: any) => {
        if (error?._errors?.[0]) {
          form.setFields([{ name: field, errors: [error._errors[0]] }]);
        }
      });
      return;
    }

    // Valid
    handleLogin(parsed.data);
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card title="Login" style={{ width: 300 }}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href={AUTH_FORGOT_PASSWORD_PATH}>Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button loading={loading} block type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
