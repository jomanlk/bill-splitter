import { react, useState } from 'react';
import { Modal, Form, InputNumber, Input, Col, Row, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default function EditPerson({
    person,
    person: { name, maxpay, prepay, overpay, cost },
    total,
    onUpdatePerson,
    onHide,
}) {
    const [form] = Form.useForm();
    const [isVisible, setVisible] = useState(true);

    const handleCancel = () => {
        setVisible(false);
        onHide();
    };

    const onFormSubmit = (values) => {
        onUpdatePerson(Object.assign(person, values));
        setVisible(false);
        onHide();
    };

    const ruleNotHigherThanTotal = ({ getFieldValue }) => ({
        validator(_, value) {
            if (value === 0 || value <= total) {
                return Promise.resolve();
            }
            return Promise.reject(
                new Error("This can't be higher than the entire bill")
            );
        },
    });
    const ruleHigherThanBaseCost = ({ getFieldValue }) => ({
        validator(_, value) {
            console.log(value);
            if (value === 0 || value >= cost) {
                return Promise.resolve();
            }
            return Promise.reject(
                new Error(
                    "This can't be lower than shared cost. Use the 'Max amount' to set a ceiling value."
                )
            );
        },
    });
    const ruleEitherFlatOrPrepaid = ({ getFieldValue }) => ({
        validator(_, value) {
            console.log(getFieldValue('prepaid'));
            if (value > 0 && getFieldValue('prepaid') > 0) {
                return Promise.reject(
                    new Error(
                        "Use one of either 'Flat amount' or 'Prepaid amount'"
                    )
                );
            }
            return Promise.resolve();
        },
    });

    return (
        <Modal
            title={`Edit : ${name}`}
            visible={isVisible}
            onCancel={handleCancel}
            onOk={form.submit}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFormSubmit}
                initialValues={{
                    name: name,
                    maxpay: maxpay,
                    prepay: prepay,
                    overpay: overpay,
                }}
            >
                <Row gutter={10}>
                    <Col span={24}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Person's name?" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 12 }} sm={{ span: 12 }}>
                        <Form.Item label="Cost">
                            <InputNumber
                                style={{ width: '100%' }}
                                value={cost}
                                disabled
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 12 }} sm={{ span: 12 }}>
                        <Form.Item
                            label={
                                <span>
                                    Max amount{' '}
                                    <Tooltip title="The maximum amount this person wants to pay">
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                </span>
                            }
                            name="maxpay"
                            rules={[ruleNotHigherThanTotal]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="Max able to pay?"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 12 }} sm={{ span: 12 }}>
                        <Form.Item
                            label={
                                <span>
                                    Flat amount{' '}
                                    <Tooltip title="Use when the user wants to contribute more than their fair share and doesn't expect anything back">
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                </span>
                            }
                            name="overpay"
                            rules={[
                                ruleNotHigherThanTotal,
                                ruleHigherThanBaseCost,
                            ]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="Overpaid by?"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 12 }} sm={{ span: 12 }}>
                        <Form.Item
                            name="prepay"
                            label={
                                <span>
                                    Prepaid amount{' '}
                                    <Tooltip title="Use when this person has paid extra but is looking to be made whole when the bill is settled.">
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                </span>
                            }
                            rules={[
                                ruleNotHigherThanTotal,
                                ruleEitherFlatOrPrepaid,
                            ]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="Amount this person prepaid"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
