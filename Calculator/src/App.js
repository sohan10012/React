import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { Container, Content, Row } from "./styles/styles";

function App() {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [equation, setEquation] = useState("");
  const [isResult, setIsResult] = useState(false);

  const handleOnClear = () => {
    setCurrentNumber("0");
    setEquation("");
    setIsResult(false);
  };

  const handleAddNumber = (num) => {
    if (isResult) {
      setCurrentNumber(num);
      setEquation(num);
      setIsResult(false);
    } else {
      setCurrentNumber((prev) => `${prev === "0" ? "" : prev}${num}`);
      setEquation((prev) => `${prev}${num}`);
    }
  };

  const handleOperation = (op) => {
    if (isResult) {
      setEquation(currentNumber + " " + op + " ");
      setIsResult(false);
    } else {
      setEquation((prev) => `${prev} ${op} `);
    }
    setCurrentNumber("0");
  };

  const handleEquals = () => {
    try {
      const result = eval(equation.replace(/ /g, ""));
      setCurrentNumber(String(result));
      setEquation("");
      setIsResult(true);
    } catch (error) {
      setCurrentNumber("Error");
      setEquation("");
      setIsResult(false);
    }
  };

  return (
    <Container>
      <Content>
        <Input value={equation || currentNumber} />
        <Row>
          <Button label="x" onClick={() => handleOperation("*")} />
          <Button label="/" onClick={() => handleOperation("/")} />
          <Button label="0" onClick={() => handleAddNumber("0")} />
          <Button label={<MdDelete />} onClick={handleOnClear} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber("7")} />
          <Button label="8" onClick={() => handleAddNumber("8")} />
          <Button label="9" onClick={() => handleAddNumber("9")} />
          <Button label="-" onClick={() => handleOperation("-")} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber("4")} />
          <Button label="5" onClick={() => handleAddNumber("5")} />
          <Button label="6" onClick={() => handleAddNumber("6")} />
          <Button label="+" onClick={() => handleOperation("+")} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber("1")} />
          <Button label="2" onClick={() => handleAddNumber("2")} />
          <Button label="3" onClick={() => handleAddNumber("3")} />
          <Button label="=" onClick={handleEquals} />
        </Row>
      </Content>
    </Container>
  );
}

export default App;
