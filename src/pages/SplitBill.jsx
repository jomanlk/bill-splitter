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
    const removePersonHandler = ({ key }) => {
        const deletedIndex = persons.findIndex((p) => p.key === key);
        persons.splice(deletedIndex, 1);
        setPersons((persons) => [...splitTheBill(total, persons)]);
        setPeopleCount(peopleCount - 1);
    };
    const updatePersonHandler = (person) => {
        const updatedIndex = persons.findIndex((p) => p.key === person.key);
        persons[updatedIndex] = person;
        setPersons((persons) => [...splitTheBill(total, persons)]);
    };

    return (
        <>
            <Row style={{ margin: '30px 0' }}>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <TotalCostInput onCalculate={calculateHandler} />
                </Col>
            </Row>

            <PersonList
                persons={persons}
                total={total}
                onRemovePerson={removePersonHandler}
                onUpdatePerson={updatePersonHandler}
            />
        </>
    );
}

const splitTheBill = (total, people) => {
    const peopleCount = people.length;
    let baseCost = Math.round(total / peopleCount);
    let remainingTotal = total;

    // Get the people who pay more than base cost to the front
    people.sort((a, b) => b.overpay - a.overpay);

    //run through the entire set and get people who are overpaying
    let overpaidTotal = 0;
    let overpayerCount = 0;
    people
        .filter((person) => people.overpay)
        .forEach(({ maxpay, overpay }) => {
            overpaidTotal += Math.min(overpay, maxpay);
            overpayerCount++;
        });
    //if we have overpayers, then adjust the base cost
    if (overpayerCount) {
        baseCost = Math.round(
            (total - overpaidTotal) / (peopleCount / overpayerCount)
        );
    }

    // Get the people who have a max limit
    const maxPayingPeople = people
        .filter((person) => person.maxpay)
        .map((person) => {
            person.maxpay = Math.min(
                Math.max(baseCost, person.overpay),
                person.maxpay
            );
            person.cost = person.maxpay;
            remainingTotal -= person.maxpay;
            return person;
        });

    const remPeopleCount = peopleCount - maxPayingPeople.length;
    let adjustedBaseCost = Math.round(remainingTotal / remPeopleCount);
    const nonMaxPayingPeople = people
        .filter((person) => person.maxpay === 0)
        .map((person, key) => {
            person.cost = Math.max(adjustedBaseCost, person.overpay);
            remainingTotal -= person.cost;
            adjustedBaseCost = Math.round(
                remainingTotal / (remPeopleCount - key - 1)
            );
            return person;
        });
    return [...nonMaxPayingPeople, ...maxPayingPeople];
};

const getPeople = (peopleCount) => {
    const persons = [];
    for (let i = 0; i < peopleCount; i++) {
        persons.push({
            key: `${Date.now() + i * 1000}`,
            img: `https://www.gravatar.com/avatar/${Math.round(
                Math.random() * 999999
            )}?d=robohash&s=400`,
            name: `Anon #${i + 1}`,
            cost: 0,
            prepay: 0,
            maxpay: 0,
            overpay: 0,
        });
    }
    return persons;
};
