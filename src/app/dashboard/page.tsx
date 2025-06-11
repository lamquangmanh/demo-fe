'use client';

// import from libs
import { Card, Row, Col } from 'antd';

export default function DashboardPage() {
  return (
    <>
      <div>Dashboard Page</div>
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
    </>
  );
}
