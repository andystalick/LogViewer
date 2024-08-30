interface LoaderProps {
  loaded: number;
  total: number;
}

import './Loader.css';

const Loader: React.FC<LoaderProps> = (props) => {
  const { loaded, total } = props;

  return (
    <div className="loader" data-testid="loader">
      {`Loaded ${loaded} of ${total} items`}
      <progress max={total} value={loaded}></progress>
    </div>
  );
};

export default Loader;
