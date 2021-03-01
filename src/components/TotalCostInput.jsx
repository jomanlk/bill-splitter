import { react } from 'react';
import { Form, InputNumber, Button } from 'antd';
import { DollarOutlined, UserAddOutlined } from '@ant-design/icons';

export default function AddPerson({ onCalculate }) {
    return (
        <Form
            onFinish={onCalculate}
            initialValues={{ total: 1000, peopleCount: 4 }}
        >
            <Form.Item
                required
                style={{ marginBottom: 15 }}
                name="total"
                rules={[
                    { required: true, message: "What's the full amount due?" },
                    {
                        pattern: new RegExp(/^\d+(?:\.\d{1,2})?$/),
                        message: 'Are you sure that number is correct?',
                    },
                ]}
            >
                <InputNumber
                    style={{ width: '100%', maxWidth: 400 }}
                    size="large"
                    placeholder="What's the damage?"
                    prefix={<DollarOutlined />}
                />
            </Form.Item>

            <Form.Item
                required
                style={{ marginBottom: 15 }}
                name="peopleCount"
                rules={[
                    {
                        required: true,
                        message: 'How many people are splitting the bill?',
                    },
                    {
                        pattern: new RegExp(/^\d+$/),
                        message: 'What happened to the rest of the person?',
                    },
                ]}
            >
                <InputNumber
                    style={{ width: '100%', maxWidth: 200 }}
                    size="large"
                    placeholder="How many people?"
                    prefix={<UserAddOutlined />}
                />
            </Form.Item>

            <Button size="large" type="primary" htmlType="submit">
                Go Dutch!
            </Button>
        </Form>
    );
}
