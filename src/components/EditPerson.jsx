import { react, useState } from 'react';
import { Popover } from 'antd';

export default function EditPerson(props) {
    const [isVisible, setVisible] = useState(false);

    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };

    return (
        <Popover
            content={<a onClick={() => setVisible(false)}>Close</a>}
            title="Title"
            trigger="click"
            visible={isVisible}
            onVisibleChange={handleVisibleChange}
        >
            {props.children}
        </Popover>
    );
}
