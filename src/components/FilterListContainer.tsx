import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';
import { IFilter } from '../interfaces/filter';
import axios from 'axios';
import useInput from '../hooks/useInput';
import Header from './Header';
import FilterBox from './FilterBox';
import { CategoryContext } from '../App';
import { useNavigate } from 'react-router-dom';
const Container = styled.section`
  margin: 7vw;
  margin-top: 100px;
  text-align: center;
  article {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }
  select {
    text-align: center;
  }
`;
const whole = '전체';
const FilterListContainer = () => {
  const navigate = useNavigate();
  const { seasons, filterTypes } = useContext(CategoryContext);
  const [filterDatas, setFilterDatas] = useState<IFilter[]>();
  const [season, setSeason] = useInput(whole);
  const [type, setType] = useInput(whole);
  const handleFilterDatas = () => {
    if (season === whole && type === whole) return filterDatas;
    if (season === whole)
      return filterDatas!.filter(data => data.name === type);
    if (type === whole)
      return filterDatas?.filter(data => data.colorNameKor.includes(season));
    return filterDatas?.filter(
      data => data.colorNameKor.includes(season) && data.name === type,
    );
  };

  const fetchFilterDatas = async () => {
    const data: IFilter[] = (
      await axios.get('/api/getAllFilterData', {
        headers: {
          'Cache-Control': 'max-age=0',
        },
      })
    ).data;
    setFilterDatas(data);
  };
  const handleDelete = async (filterID: number) => {
    if (!confirm('정말로 삭제하시겠습니까?')) return;
    try {
      await axios.delete('/api/deleteFilterData', { params: { filterID } });
      setFilterDatas(filterDatas?.filter(i => i.filterID !== filterID));
      alert('성공적으로 삭제되었습니다');
    } catch (error: any) {
      alert('서버에서 에러가 발생했습니다\n' + error.response.data.error);
    }
  };

  const handleUpdate = (filterData: IFilter) => {
    navigate('/form', { state: filterData });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type, season]);
  useEffect(() => {
    fetchFilterDatas();
  }, []);

  return (
    <Container>
      <Header
        setSeason={setSeason}
        setType={setType}
        filterTypes={filterTypes}
        seasons={seasons}
        type={type}
        season={season}
      />
      <article>
        {handleFilterDatas()?.map(data => (
          <FilterBox
            key={data.filterID}
            data={data}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
      </article>
    </Container>
  );
};

export default FilterListContainer;
