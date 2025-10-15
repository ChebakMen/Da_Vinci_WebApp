import { Route, Routes } from 'react-router-dom';
import { Authorisation } from './components/Authorisation/authorisation';
import { HomePage } from './pages/homePage';
import { Registration } from './components/Registration/registration';
import { Account } from './components/Account/account';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/authorisation" element={<Authorisation />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;
