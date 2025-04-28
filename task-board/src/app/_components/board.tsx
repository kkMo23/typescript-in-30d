"use client";
import { Card, Col, Row, Dropdown, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
import { type User, type Task } from '@prisma/client';
// import { useCurrentUser } from '~/hooks/useCurrentUser';

export const TaskBoard = () => {

    //state variables
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [chosenUser, setChosenUser] = useState("");
    const [users, setUsers] = useState<User[]>([]); 
    const [renderedTasks, setRenderedTasks] = useState<boolean>(false);
    // for when users can log in
    // const currentUser  = useCurrentUser();

    // functions
    const filteredByUserAndStatus = (userId: string) => {
        const [data] = api.task.getByUser.useSuspenseQuery({
        userId: userId,
        });
        if (data) {
            setTasks(data);
        }
        setLoading(false);
    };

    const getUsers = () => {
        const { data } = api.user.getAll.useQuery();
        if (data) {
            setUsers(data);
        }
    };
    // hooks
    useEffect(() => {
        if (chosenUser) {
            setLoading(true);
            filteredByUserAndStatus(chosenUser)
            setRenderedTasks(true);
        }
    }, [chosenUser]);

    useEffect(() => {
        getUsers();
        setRenderedTasks(false);
        setLoading(false);
    }, []) 

    // component

    return (
        <>
            <Col
                title='Please select a user'
            >
                <Dropdown
                    menu={{
                        items: users.map((user) => ({
                            key: user.id,
                            label: user.fullName,
                        })),
                        onClick: (e) => {
                            setChosenUser(e.key);
                        },
                    }}
                />
                {loading && (
                    <>
                          <Spin tip="Loading" size="small" />
                    </>
                )}
                {renderedTasks && (
                    tasks.map((task) => (
                        <Col title={task.status} key={task.id}>
                            <Row>
                                <Card
                                    title={task.title}
                                    style={{ width: 300, margin: '10px' }}
                                >
                                    <p>Status: {task.status}</p>
                                </Card>
                            </Row>
                        </Col>
                    ))
                )}
            </ Col>
        </>
    )

}