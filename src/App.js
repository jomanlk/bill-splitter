import './App.less';
import { Layout } from 'antd';
import SplitBill from './pages/SplitBill';
const { Header, Content } = Layout;

function App() {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo">
                    <img
                        src="/images/logo_transparent.png"
                        alt="Logo of the app"
                    />
                </div>
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
