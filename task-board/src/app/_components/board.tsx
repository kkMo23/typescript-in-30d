"use client";
import { Card, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
import { type User, type Task, TaskStatus } from '@prisma/client';
import { StatusColumn, StyledButton, StyledDropDown, TaskCard, HeaderRow, PageContainer, Title } from './board.style';

export const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [chosenUser, setChosenUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [renderTasks, setRenderTasks] = useState<boolean>(false);
  const [mappedUsers, setMappedUsers] = useState<{ key: string; label: string | null }[]>([]);
  const statusOptions = Object.keys(TaskStatus) as TaskStatus[];

  const { data: userData } = api.user.getAll.useQuery();

  const { data: taskData } = api.task.getByUser.useQuery(
    { userId: chosenUser?.id ?? '' },
    { enabled: !!chosenUser }
  );

  useEffect(() => {
    if (userData) {
      setUsers(userData);
      setMappedUsers(userData.map((u) => ({
        key: u.id,
        label: `${u.firstName} ${u.lastName}`,
      })));
    }
  }, [userData]);

  useEffect(() => {
    if (taskData) {
      setTasks(taskData);
    }
  }, [taskData]);

  return (
    <PageContainer>
      <HeaderRow>
        <Title level={2}>
          {renderTasks && chosenUser
            ? `Task Board for ${chosenUser.firstName} ${chosenUser.lastName}`
            : 'Task Board'}
        </Title>
        <StyledDropDown
          arrow
          menu={{
            items: mappedUsers,
            onClick: (e) => {
              setRenderTasks(true);
              const selectedUser = users.find((u) => u.id === e.key);
              setChosenUser(selectedUser ?? null);
            },
          }}
        >
          <StyledButton type="default">Please select a user</StyledButton>
        </StyledDropDown>
      </HeaderRow>

      {loading && <Spin tip="Loading" size="large" />}

      {renderTasks && (
        <Row gutter={[24, 24]}>
          {statusOptions.map((status) => (
            <StatusColumn key={status} span={8} status={status}>
              <Card title={status.replace('_', ' ')} bordered={false}>
                {tasks.filter((t) => t.status === status).map((task) => (
                  <TaskCard key={task.id} title={task.title}>
                    <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
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
