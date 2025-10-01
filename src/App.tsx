import { Route, Routes } from 'react-router-dom';
import { Authorization } from './components/Authorization/authorization';
import { HomePage } from './pages/homePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/authorization" element={<Authorization />} />
      {/* <Route path="/registration" element={<Registration />} />
      <Route path="/account" element={<Account />} /> */}
    </Routes>
  );
}

export default App;
