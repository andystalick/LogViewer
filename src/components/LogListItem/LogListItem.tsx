const LogListItem = (props) => {
  const { itemData } = props;

  const formatttedTime = new Date(itemData.time).toISOString();

  return (
    <details>
      <summary>
        <span>{itemData.time}</span>
        <span>{itemData.rawRow}</span>
      </summary>
      <div>item details</div>
    </details>
  );
};

export default LogListItem;
