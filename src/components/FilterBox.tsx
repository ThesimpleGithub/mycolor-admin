import { IFilter } from '../interfaces/filter';
import styled from '@emotion/styled';
import { Btn } from '../styles/commonStyles';
import { useEffect } from 'react';

const Container = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  height: 300px;
  margin-right: 20px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 34%) 0px 2.5px 10px;
  margin-bottom: 40px;
  padding: 10px;
  border-radius: 5px;
  img {
    width: 80px;
  }
  div:first-of-type {
    display: flex;
    align-items: center;
  }
  div:last-of-type {
    display: flex;
    align-items: center;
    width: 70%;
    justify-content: space-evenly;
  }
  span:last-child {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #${props => props.color};
    border-radius: 100%;
    margin-left: 5px;
  }
`;
interface props {
  data: IFilter;
  handleDelete: (filterID: number) => void;
  handleUpdate: (filterData: IFilter) => void;
}
const FilterBox = ({ data, handleDelete, handleUpdate }: props) => {
  useEffect(() => {
    console.log('render');
  }, []);
  return (
    <Container color={data.rgb}>
      <img src={data.productImg} />
      <p>종류 - {data.name}</p>
      <p>브랜드 - {data.company}</p>
      <p>이름 - {data.type}</p>
      <p>색상명 - {data.colorName}</p>
      <div>
        <span>색상코드 - #{data.rgb}</span>
        <span></span>
      </div>
      <a href={`https://link.coupang.com/a/${data.href}`} target="_blank">
        링크 - {data.href}
      </a>
      <div>
        <Btn onClick={() => handleUpdate(data)}>수정</Btn>
        <Btn onClick={() => handleDelete(data.filterID)}>삭제</Btn>
      </div>
    </Container>
  );
};

export default FilterBox;
