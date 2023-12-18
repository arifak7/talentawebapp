
import { Menu } from 'antd'
import { Link } from '../../../node_modules/react-router-dom/dist/index';
function MenuItem(itemKey, itemIcon, itemLink, itemLabel) {
    return (
        <Menu.Item key={itemKey} icon={itemIcon}>
            <Link to={itemLink} style={{ textDecoration: 'none' }}>{itemLabel}</Link>
        </Menu.Item>
    
    );

}

export default MenuItem;