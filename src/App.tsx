// import './App.css';

import { LogDataProvider } from './utils/Contexts';
import LogList from './components/LogList/LogList';

function App() {
  return (
    <LogDataProvider>
      <section>
        <LogList />
      </section>
    </LogDataProvider>
  );
}

export default App;
