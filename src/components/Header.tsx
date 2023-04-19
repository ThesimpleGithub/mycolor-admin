import React, { ChangeEvent } from 'react';
import { changeEvent } from '../hooks/useInput';
import { IFilterType, ISeason } from '../interfaces/filter';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Btn } from '../styles/commonStyles';
interface props {
  setSeason: changeEvent<HTMLSelectElement>;
  setType: changeEvent<HTMLSelectElement>;
  filterTypes: IFilterType[];
  seasons: ISeason[];
  type: string;
  season: string;
}

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100vw;
  box-shadow: rgb(0 0 0 / 34%) 0px 0px 10px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  select {
    margin-right: 10px;
    height: 30px;
    cursor: pointer;
  }
`;

const Header = ({
  setSeason,
  setType,
  seasons,
  type,
  season,
  filterTypes,
}: props) => {
  return (
    <Container>
      <div>
        <select onChange={setSeason} value={season}>
          <option value="전체">전체</option>
          {seasons.map(i => (
            <option value={i.colorNameKor}>{i.colorNameKor}</option>
          ))}
        </select>
        <select onChange={setType} value={type}>
          <option value="전체">전체</option>
          {filterTypes.map(i => (
            <option value={i.name}>{i.name}</option>
          ))}
        </select>
      </div>

      <Link to={'/form'}>
        <Btn>필터 추가</Btn>
      </Link>
    </Container>
  );
};

export default Header;
