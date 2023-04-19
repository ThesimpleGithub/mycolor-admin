import styled from '@emotion/styled';
import useInput, { changeEvent } from '../hooks/useInput';
import { memo, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CategoryContext } from '../App';
import TextField from '@mui/material/TextField';
import { FormEvent } from 'react';
import axios from 'axios';
import { IFilter } from '../interfaces/filter';
import { Btn } from '../styles/commonStyles';
const Container = styled.section`
  max-width: 500px;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  p {
    margin-bottom: 10px;
  }
`;
const Box = styled.form`
  padding: 20px;
  width: 100%;
  height: 500px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 34%) 0px 5px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SeasonBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-bottom: 30px;
`;
const SeasonSpan = styled.span<{ isSelected: boolean }>`
  cursor: pointer;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: white;
  border: 1.5px solid gray;
  color: black;
  border-radius: 100px;
  display: flex;
  align-items: center;
  ${props =>
    props.isSelected &&
    `color : white; background-color : #f74e4e; border : 1.5px solid #f74e4e;`}
  :hover {
    background-color: #f74e4e8f;
    color: white;
  }
`;
const SelectBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  select {
    margin-left: 10px;
    height: 30px;
    font-size: 15px;
    color: #f74e4e;
    font-weight: 600;
  }
`;
const InputBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  div {
    margin-bottom: 10px;
  }
`;
const BtnBox = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-evenly;
`;
const mockData: IFilter = {
  colorName: '',
  colorNameKor: [],
  company: '',
  filterID: 0,
  filterImg: '',
  href: '',
  name: '',
  productImg: '',
  rgb: '',
  type: '',
};

const FilterForm = () => {
  const navigate = useNavigate();
  const { state }: { state: IFilter } = useLocation();
  const filterData: IFilter = state || mockData;
  const { filterTypes, seasons } = useContext(CategoryContext);
  const [company, setCompany] = useInput(filterData.company);
  const [colorName, setColorName] = useInput(filterData.colorName);
  const [type, setType] = useInput(filterData.type);
  const [productImg, setProductImg] = useInput(filterData.productImg);
  const [filterTypeID, setFilterType] = useState('');
  const [rgb, setRgb] = useInput(filterData.rgb);
  const [href, setHref] = useInput(filterData.href);
  const [seasonSelected, setSeasonSelected] = useState<boolean[]>([]);
  console.log(seasonSelected);
  useEffect(() => {
    if (!seasons[0].colorNameKor) return;
    console.log(123);
    setFilterType(
      String(filterTypes.find(i => i.name === filterData.name)?.filterTypeID),
    );
    const arr = seasons
      .map(
        (season, idx) =>
          filterData.colorNameKor.includes(season.colorNameKor) && idx,
      )
      .filter(i => i !== false);
    seasons.forEach(_ => seasonSelected.push(false));
    arr.forEach(i => (seasonSelected[i as number] = true));
    setSeasonSelected([...seasonSelected]);
  }, [filterTypes]);

  const handleSelect = (idx: number) => {
    seasonSelected[idx] = !seasonSelected[idx];
    setSeasonSelected([...seasonSelected]);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!confirm('정말로 저장하시겠습니까?')) return;

    const body = {
      filterData: {
        company,
        colorName,
        type,
        productImg,
        filterTypeID,
        rgb,
        href,
      },
      selectedSeason: seasonSelected
        .map((i, idx) => i && seasons[idx].colorID)
        .filter(i => i),
    };
    try {
      if (state)
        await axios.put('/api/updateFilter', {
          ...body,
          filterID: state.filterID,
        });
      else await axios.post('/api/insertFilter', body);
      alert('데이터가 성공적으로 저장되었습니다.');
      navigate('/');
    } catch (error: any) {
      alert('서버에서 에러가 발생했습니다\n' + error.response.data.error);
    }
  };

  return (
    <Container>
      <Box onSubmit={handleSubmit}>
        <p>제품이 해당되는 퍼스널컬러를 선택해주세요 (여러개 가능)</p>
        <SeasonBox>
          {seasons.map((i, idx) => (
            <SeasonSpan
              isSelected={seasonSelected[idx]}
              onClick={() => handleSelect(idx)}
            >
              {i.colorNameKor}
            </SeasonSpan>
          ))}
        </SeasonBox>
        <SelectBox>
          <span>상품의 타입을 선택해주세요</span>
          <select
            value={filterTypeID}
            onChange={e => setFilterType(e.target.value)}
            required
          >
            <option value="" hidden>
              상품 타입
            </option>
            {filterTypes.map(i => (
              <option value={i.filterTypeID}>{i.name}</option>
            ))}
          </select>
        </SelectBox>
        <InputBox>
          <TextField
            label="브랜드명"
            value={company}
            onChange={setCompany as changeEvent<HTMLInputElement>}
            required
          />
          <TextField
            label="색상 이름"
            value={colorName}
            onChange={setColorName as changeEvent<HTMLInputElement>}
            required
          />
          <TextField
            label="제품 이름"
            value={type}
            onChange={setType as changeEvent<HTMLInputElement>}
            required
          />
          <TextField
            label="상품 이미지 주소"
            value={productImg}
            onChange={setProductImg as changeEvent<HTMLInputElement>}
            required
          />
          <TextField
            label="상품 주소"
            value={href}
            onChange={setHref as changeEvent<HTMLInputElement>}
            required
          />
          <TextField
            label="색상 코드"
            value={rgb}
            onChange={setRgb as changeEvent<HTMLInputElement>}
            required
          />
        </InputBox>
        <BtnBox>
          <Btn type="submit">저장</Btn>
          <Btn onClick={() => navigate('/')}>취소</Btn>
        </BtnBox>
      </Box>
    </Container>
  );
};

export default memo(FilterForm);
