import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <FooterBlock>
        <div className="footer">
      <Link to="/PrivacyPolicy"  style={{ textDecoration: "none", color: "inherit" }} >개인정보 처리방침&nbsp;&nbsp;</Link>
      <span>서비스 약관</span>
      <span> ©2022 Devs, Inc. All Rights Reserved.</span>
      {/* <span className="span_devs">DEVS</span> */}
      </div>
    </FooterBlock>
  );
};
const FooterBlock = styled.div`
background: linear-gradient(90deg, #ffe7e8, #8da4d0);
  
  font-family: "Gowun Dodum", sans-serif;
 
  margin: 0 auto;
  width: 100%;
  height: 5%;
  padding: 10px 30px;
  font-size: 0.8em;

  & > span {
    margin: 10px;
    color: white;
  }
  .span_devs {
    font-size: 2em;
    position: relative;
    left: 360px;
    color: #9691db;
  }
`;

export default Footer;