import { react, useState, useEffect } from 'react';
import { Card, Avatar, Statistic, Row, Col, Space, Divider } from 'antd';
import { MinusCircleOutlined, EditOutlined } from '@ant-design/icons';
import EditPerson from './EditPerson';

const { Meta } = Card;

export default function PersonList({
    persons,
    total,
    onRemovePerson,
    onUpdatePerson,
}) {
    //sort the persons by key so we always get the same result
    persons.sort((a, b) => a.key - b.key);

    const [editablePerson, setEditablePerson] = useState(false);
    const showEditModal = (person) => {
        setEditablePerson(person);
    };
    const onHideEditModal = () => {
        setEditablePerson(false);
    };

    return (
        <>
            {editablePerson ? (
                <EditPerson
                    total={total}
                    person={editablePerson}
                    onHide={onHideEditModal}
                    onUpdatePerson={onUpdatePerson}
                />
            ) : (
                ''
            )}

            <Row justify="center" gutter={15}>
                {persons.map((person) => {
                    const {
                        key,
                        name,
                        cost,
                        img,
                        maxpay,
                        prepay,
                        overpay,
                    } = person;
                    const owed = prepay - cost;

                    return (
                        <Col
                            xs={{ span: 24 }}
                            sm={{ span: 8 }}
                            lg={{ span: 6 }}
                            xxl={{ span: 4 }}
                            key={key}
                        >
                            <Card
                                style={{ marginBottom: 15 }}
                                cover={
                                    <Statistic
                                        style={{ marginTop: 24 }}
                                        value={owed}
                                        valueStyle={{
                                            textAlign: 'center',
                                            color:
                                                owed < 0
                                                    ? '#cf1322'
                                                    : '#3f8600',
                                        }}
                                        prefix={
                                            <Avatar
                                                style={{
                                                    border: '1px solid #ddd',
                                                    verticalAlign: 'sub',
                                                }}
                                                src={img}
                                            />
                                        }
                                        precision={2}
                                    />
                                }
                                actions={[
                                    <EditOutlined
                                        onClick={() => {
                                            showEditModal(person);
                                        }}
                                        key="edit"
                                    />,
                                    <MinusCircleOutlined
                                        key="delete"
                                        onClick={() => onRemovePerson(person)}
                                    />,
                                ]}
                            >
                                <Meta
                                    title={name}
                                    description={
                                        <Space
                                            split={<Divider type="vertical" />}
                                        >
                                            <span>Max : {maxpay}</span>
                                            <span>Flat : {overpay}</span>
                                            <span>Prepay : {prepay}</span>
                                        </Space>
                                    }
                                />
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </>
    );
}
