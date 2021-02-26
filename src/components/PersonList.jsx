import { react, useState, useEffect } from 'react';
import { Card, Avatar, Statistic, Row, Col } from 'antd';
import { MinusCircleOutlined, EditOutlined } from '@ant-design/icons';
import EditPerson from './EditPerson';

const { Meta } = Card;

export default function PersonList({ persons, onRemovePerson }) {
    return (
        <>
            <Row justify="center">
                {persons.map((person, key) => {
                    return (
                        <Card
                            key={key}
                            cover={
                                <Statistic
                                    style={{ marginTop: 24 }}
                                    value={person.cost}
                                    valueStyle={{ textAlign: 'center' }}
                                    precision={2}
                                />
                            }
                            style={{
                                margin: 10,
                            }}
                            actions={[
                                <EditPerson>
                                    <EditOutlined key="edit" />
                                </EditPerson>,
                                <MinusCircleOutlined
                                    key="delete"
                                    onClick={() => onRemovePerson(key)}
                                />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src={person.img} />}
                                title={person.name}
                                description="some text not"
                            />
                        </Card>
                    );
                })}
            </Row>
        </>
    );
}
