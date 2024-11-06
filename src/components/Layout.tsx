import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';

const Layout: React.FC = () => {
    return (
        <div>
            <AppBar />
            <main className='px-[10px] md:px-[80px] lg:px-[160px] xl:px-[200px] pt-[80px] pb-[20px]'>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout