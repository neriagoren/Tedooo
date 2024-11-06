import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import avatar from '../assets/images/avatar.png';
import Avatar from './Avatar';
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts';
import Search from '../generics/Search';
import { useRef, useState } from 'react';
import { LINKS } from '../constants';

const AppBar: React.FC = () => {

    const location = useLocation();
    const pathname = location.pathname;

    const matches = useMediaQuery('(min-width: 920px)');

    const [showMenu, setShowMenu] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(menuRef, () => setShowMenu(false));

    return (
        <div className='bg-white flex items-center justify-between fixed top-0 right-0 left-0 w-full h-[58px] px-[10px] md:px-[80px] lg:px-[160px] xl:px-[200px]'>
            <div className='flex items-center gap-3'>
                <img src={logo} alt='logo' width={40} />
                <Search value='' onChange={() => { }} />
            </div>
            <div className='flex items-center h-full'>
                {
                    matches &&
                    <div className='gap-4 h-full flex'>
                        {
                            LINKS.map(({ name, to, icon: Icon }) => {
                                return (
                                    <Link to={to} key={name} className={`appbar-link ${pathname === to ? 'active' : ''}`}>
                                        <Icon />
                                        {name}
                                    </Link>
                                )
                            })
                        }
                    </div>
                }
                <div ref={menuRef} className='relative'>
                    <button type="button" onClick={() => setShowMenu(prev => !prev)} className="p-0 rounded-full" id="menu-button">
                        <Avatar src={avatar} />
                    </button>
                    {
                        showMenu &&
                        <div className="absolute right-0 top-[40px] z-10 mt-2 w-fit divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
                            {
                                !matches && LINKS.map(({ name, to, icon: Icon }) => {
                                    return (
                                        <Link to={to} key={name} className={`flex items-center gap-2 py-2 px-4 text-sm text-grey65`}>
                                            <Icon />
                                            {name}
                                        </Link>
                                    )
                                })
                            }
                            <Link to={'#'} className={`flex items-center gap-2 py-2 px-4 text-sm text-red-500`}>
                                Logout
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AppBar;