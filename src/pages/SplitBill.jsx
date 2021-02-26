import { react, useEffect, useState } from 'react';
import PersonList from './../components/PersonList';
import TotalCostInput from './../components/TotalCostInput';
import { Row, Col } from 'antd';

export default function SplitBill(props) {
    const [total, setTotal] = useState(0);
    const [peopleCount, setPeopleCount] = useState(0);
    const [persons, setPersons] = useState([]);

    const calculateHandler = (values) => {
        let tempPersons = getPeople(values.peopleCount);
        tempPersons = splitTheBill(values.total, tempPersons);

        setTotal(values.total);
        setPeopleCount(values.peopleCount);
        setPersons((persons) => [...tempPersons]);
    };
    const removePersonHandler = (key) => {
        persons.splice(key, 1);
        setPersons((persons) => [...persons]);
        setPeopleCount(peopleCount - 1);
    };

    return (
        <>
            <Row style={{ marginTop: 30, marginBottom: 15 }}>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <TotalCostInput onCalculate={calculateHandler} />
                </Col>
            </Row>

            <PersonList
                persons={persons}
                onRemovePerson={removePersonHandler}
            />
        </>
    );
}

const splitTheBill = (total, people) => {
    const peopleCount = people.length;
    const baseCost = Math.round(total / peopleCount);
    people = people.map((person) => {
        person.cost = baseCost;
        return person;
    });
    return people;
};

const getPeople = (peopleCount) => {
    const persons = [];
    for (let i = 0; i < peopleCount; i++) {
        persons.push({
            img: `https://www.gravatar.com/avatar/${Math.round(
                i * 999999
            )}?d=robohash&s=400`,
            name: 'Anonymous',
            cost: 0,
            prepay: 0,
            maxpay: false,
        });
    }
    return persons;
};
