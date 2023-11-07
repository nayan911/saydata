import React, { useState } from "react";
import "../styles/LayoutStyles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge, message } from "antd";
import Chartgrapg from "../Pages/Chartgrapg";
import DonutChart from "../Pages/DonutChart";
import Poppup from "./Poppup";
import Sidebar from "./Sidebar";
import * as AiIcons from 'react-icons/ai';
import {data} from './Data.js'
import * as FaIconss from 'react-icons/fa';

const Layout = () => {

  const navigate = useNavigate();
//   const {user} = useSelector(state=>state.user)
  const location = useLocation();
  // homepage ko layout se wrap karo

  const handleLogout=()=>{
    localStorage.clear();
    message.success("logout success");
    navigate('/');
  }

  const SidebarMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "fa-solid fa-gauge-simple",
    },
    {
      name: "All Files",
      path: "/appointments",
      icon: "fa-solid fa-coins",
    },
    {
      name: "Saved",
      path: `/doctor/profile/`,
      icon: "fa-regular fa-calendar",
    },
    {
      name: "Integrations",
      path: `/user/profile`,
      icon: "fa-solid fa-user",
    },
    {
      name: "Trash",
      path: `/user/settings`,
      icon: "fa-solid fa-gear",
    },
  ];

  const [openpopup,setopenpopup] = useState(false);

  const [savedNotes, setSavedNotes] = useState([])

  const handleDelete = (index) => {
    // Create a copy of the savedNotes array
    const updatedNotes = [...savedNotes];
  
    // Remove the note at the specified index
    updatedNotes.splice(index, 1);
  
    // Update the state with the modified array
    setSavedNotes(updatedNotes);
  };

  const downloadNoteAsText = (note) => {
    const blob = new Blob([note], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'note.txt'; // Set the filename for the download
  
    // Trigger the download
    document.body.appendChild(a);
    a.click();
  
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6 style={{color: '#0048AD'}}>abc firm</h6>
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path} style={{color: '#344054'}}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/" style={{color: '#344054'}}>Help & support</Link>
              </div>
            </div>
            <div className="upgrade">
                <div className="upgrade-icon">
                    <i className="fa-solid fa-rocket" style={{fontSize: 30,color: '#0048AD'}}></i>
                </div>
                <div className="upgrade-account">
                    <b>Upgrade Account</b>
                </div>
                <div className="upgrade-access">
                    Access to unlimited Transaction
                </div>
                <div className="upgrade-button">
                    <button className="btn" style={{backgroundColor: '#0048AD', color: 'white'}} onClick={()=>{window.location.href = 'https://velvety-otter-b40823.netlify.app';}}><b style={{fontSize: '20px'}}>Upgrade File</b></button>
                </div>
            </div>
          </div>
          <div className="content">
                <div className="searchbar">
                    <div className="searchbar-content">
                      <div className="searchbar-content-content">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="search" style={{ width: '400px' }} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                      </div>
                      <div className="profile-icon">
                        <div className="bell-icon"><i class="fa-regular fa-bell"></i></div>
                        <div className="profile-icon-icon"><i class="fa-regular fa-user"></i></div>
                      </div>
                    </div>
                </div>
                <div className="search-name">
                    <div className="app-names">
                        <div className="app-name1">
                            <b style={{fontSize: '20px'}}>Welcome Shakirat</b><br></br>
                            Upload your audio or video to convert to text
                        </div>
                        <div className="transcribfile">
                            <button className="btn btn-primary" onClick={() => setopenpopup(true)}> Transacrib file</button>
                        </div>
                    </div>
                </div>
                <div className="header">
                    <div className="headerbox1 headerbox">
                        <div>
                            <i className="fa-solid fa-money-bill" style={{fontSize: 30,color: 'green'}}></i><br></br>
                            <span>Total Revenues</span>
                        </div>
                        <div className="revenuePercent">
                            <span style={{fontSize: 30}}><b>$2,129,430</b></span>
                            <span className="revenueStyle">+2.5%</span>
                        </div>
                    </div>
                    <div className="headerbox2 headerbox">
                        <div>
                            <i className="fa-solid fa-coins" style={{fontSize: 30,color: '#DEBF85'}}></i><br></br>
                            <span>Total Transactions</span>
                        </div>
                        <div className="revenuePercent">
                            <span style={{fontSize: 30}}><b>1,520</b></span>
                            <span className="revenueStyle">+1.7%</span>
                        </div>
                    </div>
                    <div className="headerbox3 headerbox">
                        <div>
                            <i className="fa-solid fa-thumbs-up" style={{fontSize: 30,color: '#EE8484'}}></i><br></br>
                            <span>Total Likes</span>
                        </div>
                        <div className="revenuePercent">
                            <span style={{fontSize: 30}}><b>9,721</b></span>
                            <span className="revenueStyle">+1.4%</span>
                        </div>
                    </div>
                </div>
                <div className="audioheader">
                    <div style={{padding: '10px'}}><b style={{fontSize: '20px'}}>Recent Files</b></div>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Language</th>
                        <th>Time</th>
                        <th>File Type</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {savedNotes.map((note, index) => (
                        <tr key={index}>
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td>English</td> {/* Replace with actual language */}
                        <td>{new Date().toLocaleString()}</td> {/* Replace with actual timestamp */}
                        <td>Audio</td> {/* Replace with actual file type */}
                        <td>
                          <div className="delete-download">
                            <div className="download-note"><button className="btn btn-primary" onClick={() => downloadNoteAsText(note)}>Download Note</button></div>
                            <div className="delete-note"><button style={{width: '120px'}} className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button></div>
                          </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>

            </div>
            
        </div>
      </div>
      <Poppup openpopup={openpopup} setopenpopup={setopenpopup} savedNotes={savedNotes} setSavedNotes={setSavedNotes}>
      </Poppup>
      {/* <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/> */}
    </>
  );
};

export default Layout;