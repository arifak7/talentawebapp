import './MenuList.css'
import { Menu } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { FaListCheck } from "react-icons/fa6";
import { Navigate } from 'react-router-dom'
import { MdAddBox } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { BsFileSpreadsheetFill } from "react-icons/bs";
import { FaSuitcase } from "react-icons/fa6";
import MenuItem from '../MenuItem/MenuItem'

import { IoDocumentTextOutline } from "react-icons/io5";
import { Link } from '../../../node_modules/react-router-dom/dist/index';


function MenuList() {

    const navButtons = [['Home', '/'], ['Request Form', '/RequestForm'], ['End', '/End']]

    const navigateTo = (route) => () => {
        Navigate(route);// Close the sidebar after navigation
    };
    return (
        <Menu theme='dark' className='menu-bar'>

            {MenuItem('1', <HomeOutlined />, '/', 'Home')}
            <Menu.SubMenu key='form' icon={<IoDocumentTextOutline />} title='Forms' >
                {MenuItem('form-request', <MdAddBox />, '/RequestForm', 'Request')}
                {MenuItem('form-list', <HiOutlineClipboardDocumentCheck />, '/FormList', 'List')}
            </Menu.SubMenu>

            {MenuItem('form-overtime', <FaRegClock />, '/OldReq', 'Overtime')}
            {MenuItem('attendance', <BsFileSpreadsheetFill />, '/Attendance', 'Attendance')}
            {MenuItem('manager', <FaSuitcase />, '/Manager', 'Manager')}
        </Menu>    
    
    
    );
}

export default MenuList;