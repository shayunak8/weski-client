import { FC } from 'react';
import NavBar from './components/navBar/navBar';
import './App.scss';

const App: FC = () => {
  return (
    <div className='app'>
      <NavBar />
    </div>
  );
};

export default App;
