import { LogDataProvider } from './utils/Contexts';
import LogList from './components/LogList/LogList';
import TimeLine from './components/TimeLine/TimeLine';

function App() {
  return (
    <LogDataProvider>
      <>
        <section>
          <TimeLine />
        </section>
        <section>
          <LogList />
        </section>
      </>
    </LogDataProvider>
  );
}

export default App;
