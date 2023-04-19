import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Pretendard Variable';
  font-weight: 45 920;
  font-style: normal;
  font-display: swap;
  src: local('Pretendard Variable'),
    url('https://cdn.jsdelivr.net/gh/thesimplegithub/mycolor-hosting/font/PretendardVariable-subset.woff2')
      format('woff2-variations');
}

body {
  margin: 0;
  padding : 0;
  font-weight: 500;
  padding-right : 0px !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x : hidden;
}
html{
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  overflow : auto; 
}
button{
  cursor: pointer;
}
button, span,p ,a{
  transition:  background-color .3s, color .3s;
}
html,body{ 
  text-size-adjust : none;
  -webkit-text-size-adjust: none;
	-moz-text-size-adjust: none;
	-ms-text-size-adjust: none;
  -o-text-size-adjust: none;
}
  p{
    margin : 0;
  }
  *{
    font-family: 'Pretendard Variable';
    box-sizing: border-box;
    outline : 0;
    border : 0;
    min-height: 0;
    min-width: 0;
  }

`;

export default GlobalStyle;
