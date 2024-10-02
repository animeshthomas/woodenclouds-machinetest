import './App.css';
import Index from './Components/Index/Index';
import SideBar from './Components/SideBar/SideBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import AddCategory from './Components/Products/AddCategory';
import AddProducts from './Components/Products/AddProducts';
import NotFound from './Components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <SideBar />
        <div className="body-wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/addCategory" element={<AddCategory />} />
            <Route path="/addProducts" element={<AddProducts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
