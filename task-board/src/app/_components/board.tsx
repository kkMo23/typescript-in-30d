"use client";
import { Card, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '@/trpc/react';
import { type User, type Task, TaskStatus } from '@prisma/client';
import {
  StatusColumn,
  StyledButton,
  StyledDropDown,
  TaskCard,
  HeaderRow,
  PageContainer,
  Title
} from './board.style';

export const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [chosenUser, setChosenUser] = useState<User | null | "ALL">(null);
  const [users, setUsers] = useState<User[]>([]);
  const [mappedUsers, setMappedUsers] = useState<{ key: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const statusOptions = Object.keys(TaskStatus) as TaskStatus[];

  const { data: userData } = api.user.getAll.useQuery();

  const { data: allTasksData } = api.task.getAll.useQuery(undefined, {
    enabled: chosenUser === null || chosenUser === "ALL",
  });

  const { data: userTasksData} = api.task.getByUser.useQuery(
    { userId: chosenUser && chosenUser !== "ALL" ? chosenUser.id : "" },
    { enabled: !!chosenUser && chosenUser !== "ALL" }
  );

  const userTaskCounts: Record<string, number> = {};
  if (allTasksData) {
    allTasksData.forEach((task) => {
      if (task.assignedToId) {
        userTaskCounts[task.assignedToId] = (userTaskCounts[task.assignedToId] ?? 0) + 1;
      }
    });
  }

  useEffect(() => {
    if (userData) {
      setUsers(userData);
      const menuItems = [
        { key: "ALL", label: "Show All Tasks" },
        ...userData.map((u) => ({
          key: u.id,
          label: `${u.firstName} ${u.lastName} (${userTaskCounts[u.id] ?? 0})`,
        })),
      ];
      setMappedUsers(menuItems);
    }
  }, [userData, userTaskCounts]);

  useEffect(() => {
    setLoading(true);
    if (chosenUser === "ALL" || chosenUser === null) {
      if (allTasksData) {
        setTasks(allTasksData);
        setLoading(false);
      }
    } else if (userTasksData) {
      setTasks(userTasksData);
      setLoading(false);
    }
  }, [allTasksData, userTasksData, chosenUser]);

  return (
    <PageContainer>
      <HeaderRow>
        <Title level={2}>
          {chosenUser === "ALL" || chosenUser === null
            ? "All Tasks"
            : `Task Board for ${chosenUser.firstName} ${chosenUser.lastName}`}
        </Title>

        <StyledDropDown
          arrow
          menu={{
            items: mappedUsers,
            onClick: (e) => {
              const selectedUser =
                e.key === "ALL" ? "ALL" : users.find((u) => u.id === e.key) ?? null;
              setChosenUser(selectedUser);
            },
          }}
        >
          <StyledButton type="default">
            {chosenUser === null || chosenUser === "ALL"
              ? "Select a User"
              : `Viewing: ${chosenUser.firstName} ${chosenUser.lastName}`}
          </StyledButton>
        </StyledDropDown>
      </HeaderRow>

      {loading && <Spin tip="Loading" size="large" />}

      {!loading && (
        <Row gutter={[24, 24]}>
          {statusOptions.map((status) => (
            <StatusColumn key={status} span={8} status={status}>
              <Card title={status.replace('_', ' ')} bordered={false}>
                {tasks.filter((t) => t.status === status).map((task) => (
                    <TaskCard key={task.id} title={task.title}>
                      <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
                      {(chosenUser === "ALL" || chosenUser === null) && task.assignedToId && (
                        <p>
                          Assigned To:{" "}
                          {
                            userData?.find((u) => u.id === task.assignedToId)?.firstName
                          }{" "}
                          {
                            userData?.find((u) => u.id === task.assignedToId)?.lastName
                          }
                        </p>
                      )}
                    </TaskCard>
                  ))}
              </Card>
            </StatusColumn>
          ))}
        </Row>
      )}
    </PageContainer>
  );
};
