import { FC } from 'react';
import NavBar from './components/navbar/nav-bar';
import './App.scss';

const App: FC = () => {
  return (
    <div className='app'>
      <NavBar />
    </div>
  );
};

export default App;
