import './JsonDisplay.css';

const JsonDisplay = (props: { str: string }) => {
  const obj = JSON.parse(props.str);
  return (
    <pre className="json-display">
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  );
};
export default JsonDisplay;
