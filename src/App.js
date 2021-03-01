import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import SplitBill from './pages/SplitBill';
const { Header, Content, Footer } = Layout;

function App() {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
            </Header>
            <Content style={{ padding: '0 30px' }}>
                <div className="site-layout-content">
                    <SplitBill />
                </div>
            </Content>
        </Layout>
    );
}

export default App;
