import TextField from '@mui/material/TextField';
import useInput, { changeEvent } from '../hooks/useInput';
import styled from '@emotion/styled';
import { Btn } from '../styles/commonStyles';
const Container = styled.section`
  max-width: 400px;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Box = styled.form`
  width: 100%;
  height: 300px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 34%) 0px 5px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    margin-bottom: 10px;
  }
  button {
    font-size: 20px;
    padding: 10px 25px;
  }
`;

const Login = () => {
  const [id, setID] = useInput('');
  const [pw, setPW] = useInput('');
  return (
    <Container>
      <Box>
        <TextField
          label="아이디"
          value={id}
          onChange={setID as changeEvent<HTMLInputElement>}
          required
        />
        <TextField
          label="패스워드"
          value={pw}
          onChange={setPW as changeEvent<HTMLInputElement>}
          required
        />
        <Btn
          type="submit"
          onClick={e => {
            e.preventDefault();
            if (id === 'thesimple' && pw === 'thesimple123!') {
              document.cookie = 'isLogin=true; max-age=14400';
              window.location.reload();
            } else alert('잘못된 비밀번호 또는 아이디입니다.');
          }}
        >
          로그인
        </Btn>
      </Box>
    </Container>
  );
};

export default Login;
