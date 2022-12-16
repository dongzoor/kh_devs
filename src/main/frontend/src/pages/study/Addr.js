import { useState } from "react";
import { Form } from "react-bootstrap";
import hangjungdong from "./hangjungdong";

const Addr = (props) => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  //변수값 변경을 위해 타겟밸류 설정
  const onChangeValue = (e) => {
    setValue(e.target.value);
  }
  const onChangeValue2 = (e) => {
    setValue2(e.target.value);
  }

  const submitText = () => {
    const addr = `${value} ${value2}`;
    props.propFunction(addr);
  }

  const { sido, sigugun } = hangjungdong;

  return (
    <div style={{ "display": "flex" }}>
      <Form.Select aria-label="memberCount" onChange={onChangeValue}>
        <option value="">선택</option>
        {/* map을 사용하여 행정동에 있는 키값을 받아옴 */}
        {sido.map((el) => (
          <option key={el.sido} value={el.sido}>
            {el.codeNm}
          </option>
        ))}
      </Form.Select>
      <Form.Select onChange={onChangeValue2}>
        <option value="">선택</option>
        {sigugun
          // 필터함수를 사용하여 배열을 필터링하여 군/구를 불러옴
          .filter((el) => el.sido === value)
          .map((el) => (
            <option key={el.sigugun} value={el.sigugun}>
              {el.codeNm}
            </option>
          ))}
      </Form.Select>
      <>
        {value !== "" ? (value !== "" ? submitText() : "") : ""}
      </>
    </div>
  );
}
export default Addr;