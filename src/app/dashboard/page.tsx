// import from libs
import { Card, Row, Col } from 'antd';

// import authorized layout
import AuthorizedLayout from '@/presentation/layouts/AuthorizedLayout';

export default function DashboardPage() {
  return (
    <AuthorizedLayout>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Users" variant="borderless">
            124
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Revenue" variant="borderless">
            $4,200
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Sessions" variant="borderless">
            312
          </Card>
        </Col>
      </Row>
    </AuthorizedLayout>
  );
}
