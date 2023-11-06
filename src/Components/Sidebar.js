import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as FcIcons from 'react-icons/fc';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

const Sidebar = () => {

    const SidebarData = [
        {
          title: 'Dashboard',
          path: '/home',
          icon: <AiIcons.AiFillHome />,
          cName: 'nav-text'
        },
        {
          title: "Transactions",
          path: '/reports',
          icon: <IoIcons.IoIosPaper />,
          cName: 'nav-text'
        },
        {
          title: "Schedules",
          path: '/products',
          icon: <FaIcons.FaCartPlus />,
          cName: 'nav-text'
        },
        {
          title: "Users",
          path: '/team',
          icon: <IoIcons.IoMdPeople />,
          cName: 'nav-text'
        },
        {
          title: "Settings",
          path: '/messages',
          icon: <FaIcons.FaEnvelopeOpenText />,
          cName: 'nav-text'
        },
      ];

    const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        {/* <div className='navbar'> */}
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} style={{color: "black"}} />
          </Link>
        {/* </div> */}
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar
