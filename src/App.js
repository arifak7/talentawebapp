import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import { Layout } from 'antd'
import Logo from './resources/TalentaIcon/TalentaIcon'
import Home from './pages/Home'
import RequestForm from './pages/FormRequest/RequestForm'
import OldReq from './pages/RequestForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import MenuList from './components/MenuList/MenuList'
import FormList from './pages/FormList/FormList'
import FormDetail from './pages/FormDetail/FormDetail'

const { Header, Footer, Sider, Content } = Layout;

function App() {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const[formDetail, setFormDetail] = useState([])
    const handleFormDetail = (newFormDetail) => {
        setFormDetail(newFormDetail)
    }

    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible
                    collapsed={collapsed}
                    onCollapse={toggleCollapsed}
                    collapsedWidth={80}  // Adjust this value as needed
                    width={200}  // Adjust this value as needed
                    collapsible={false}  // Set this to false to remove the collapse/expand button
                    style={{
                        position: 'fixed',
                        zIndex: 1,
                        height: '150vh',
                    }}>
                    <Logo onClick={toggleCollapsed} />
                    <MenuList />
                </Sider>
                <Layout className="content-backcolor" style={{
                    marginLeft: collapsed ? 80 : 200,
                    transition: 'margin-left ease 0.3s'
                }}>
                    <Content style={{ margin: '16px' }} >
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/RequestForm' element={<RequestForm />} />
                            <Route path='/FormList' element={<FormList onChange={handleFormDetail} />} />
                            <Route path='/OldReq' element={<OldReq />} />
                            {formDetail.map(item => (
                                <Route path={`/FormDetail/${item.form_id}`} element={<FormDetail propFormDetail={item} />} />
                            ))}
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}

export default App;
