import { Route, Routes } from 'react-router-dom';

import IndexPage from '@/pages/index';
import DocsPage from '@/pages/docs';
import PricingPage from '@/pages/pricing';
import BlogPage from '@/pages/blog';
import AboutPage from '@/pages/about';
import { Authorization } from './components/Authorization/authorization';
import { HomePage } from './pages/homePage';

function App() {
  return (
    // <Routes>
    //   <Route element={<IndexPage />} path="/" />
    //   <Route element={<DocsPage />} path="/docs" />
    //   <Route element={<PricingPage />} path="/pricing" />
    //   <Route element={<BlogPage />} path="/blog" />
    //   <Route element={<AboutPage />} path="/about" />
    // </Routes>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/authorization" element={<Authorization />} />
      {/* <Route path="/registration" element={<Registration />} />
      <Route path="/account" element={<Account />} /> */}
    </Routes>
  );
}

export default App;
