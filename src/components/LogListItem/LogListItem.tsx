const LogListItem = (props) => {
  const { item } = props;

  const formatttedTime = new Date(item._time).toISOString();

  return (
    <details>
      <summary>
        <span>{formatttedTime}</span>
        <span>raw text</span>
      </summary>
      <div>item details</div>
    </details>
  );
};

export default LogListItem;
