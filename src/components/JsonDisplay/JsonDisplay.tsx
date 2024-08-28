import './JsonDisplay.css';

const JsonDisplay = ({ obj }) => {
  return (
    <pre className="json-display">
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  );
};
export default JsonDisplay;
