import styled from 'styled-components';
import { Button, Card, Col, Dropdown, Row, Typography } from 'antd';
import type { TaskStatus } from '@prisma/client';


export const StyledDropDown = styled(Dropdown)`
    .ant-dropdown-menu {
        background-color: #15162c;
        color: brown;
    }
    
    .ant-dropdown-menu-item {
        color: brown;
    }
    
    .ant-dropdown-menu-item:hover {
        background-color: #2e026d;
    }
    .ant-dropdown-menu-item-selected {
        background-color: #2e026d;
    }
`;


export const StyledButton = styled(Button)`
    color: black;
    padding: 10px 20px;
    border-radius: 5px;
    border-width: 2px;
    font-size: 16px;
`;

export const TaskCard = styled(Card)`
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const StatusColumn = styled(Col)<{ status: TaskStatus }>`
  padding: 0 8px;
  
  .ant-card {
    background-color: ${({ status }) =>
      status === "TO_DO" ? "#e6f7ff" :
      status === "IN_PROGRESS" ? "#fff7e6" :
      status === "DONE" ? "#f6ffed" : "#ffffff"};
    border-radius: 8px;
  }
`;

export const HeaderRow = styled(Row)`
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: center;
`;

export const PageContainer = styled.div`
  padding: 2rem;
`;

export const { Title } = Typography;
