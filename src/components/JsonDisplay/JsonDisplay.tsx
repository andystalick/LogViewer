import './JsonDisplay.css';

const JsonDisplay = (props: { obj: object }) => {
  return (
    <pre className="json-display">
      <code>{JSON.stringify(props.obj, null, 2)}</code>
    </pre>
  );
};
export default JsonDisplay;
