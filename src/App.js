import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  function CharacterCount({ text, componentName }) {
    const characterLength = text.length ? text.length : "No";
    return (
      <>
        <h3>{`Count character length from "${componentName}":`}</h3>
        <h4>
          {" "}
          {`This line of text "${text}"`} has <i>{characterLength}</i>{" "}
          characters!{" "}
        </h4>
        <h5>
          {`Alternatively, print how many characters!!! "${text}" has `}
          {characterLength ? <i>{characterLength}</i> : "No"}
          {` characters`}
        </h5>
      </>
    );
  }

  function Box({ className = "", style, size, ...rest }) {
    const boxSize = size ? `box--${size}` : "";
    return (
      <section
        className={`box ${className} ${boxSize}`}
        style={{ fontStyle: "italic", ...style }}
        {...rest}
      />
    );
  }

  function CustomBox({ className = "", style, size, ...rest }) {
    const boxCustomSize = size ? `box--${size}` : "";
    const props = {
      className: `box ${className} ${boxCustomSize}`.trim(),
      style: { fontStyle: "normal", ...style },
      ...rest
    };
    return <div {...props} />;
  }

  // custom state hooks
  function useCustomLocalStorageHooks(key, defaultValue = "") {
    const [state, setState] = useState(
      () => window.localStorage.getItem(key) || defaultValue
    );

    useEffect(() => {
      window.localStorage.setItem(key, state);
    }, [key, state]);

    return [state, setState];
  }

  function GreetingForm() {
    const [userName, setName] = useCustomLocalStorageHooks("userName");

    const handleOnChange = (event) => {
      setName(event.target.value);
    };
    return (
      <>
        <form>
          <h2>
            {userName ? (
              <strong>Hello, {userName}</strong>
            ) : (
              "Please enter your name"
            )}
          </h2>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={userName}
            onChange={handleOnChange}
          />
        </form>
      </>
    );
  }

  function LiveClock() {
    const [clockState, setClockState] = useState();

    useEffect(() => {
      setInterval(() => {
        // const localDate = new Date().toLocaleDateString();
        // const localTime = new Date().toLocaleTimeString();
        const localTime = new Date();
        setClockState(localTime.toLocaleTimeString());
      }, 1000);
    }, []);

    return (
      <>
        {/* <span> {localDate} - </span> <span> {localTime} </span> */}
        <span> {clockState} </span>
      </>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>React Components</h1>
      </header>
      <main>
        <h2>1 - Count length of the character</h2>
        <CharacterCount text="Hello World!" componentName="First Component" />
        <CharacterCount text="" componentName="Second Component" />

        <h2>2 - Greeting Form</h2>
        <GreetingForm />

        <h2>3 - Boxes</h2>
        <Box size="small" style={{ backgroundColor: "lightBlue" }}>
          Small box
        </Box>
        <Box size="medium" style={{ backgroundColor: "pink" }}>
          Medium box
        </Box>
        <Box size="large" style={{ backgroundColor: "orange" }}>
          Large box
        </Box>
        <CustomBox size="large" style={{ backgroundColor: "brown" }}>
          Custom box with Props object
        </CustomBox>
      </main>
      <footer>
        <LiveClock />
      </footer>
    </div>
  );
}
