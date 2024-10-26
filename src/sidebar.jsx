import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Home,
  ShoppingCart,
  ListAlt,
  People,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

const Sidebar = ({ open, toggleSidebar }) => {
  const [submenuOpen, setSubmenuOpen] = React.useState(false);

  const handleSubMenuClick = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 240,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        <ListItem button onClick={toggleSidebar}>
          <ListItemText primary="Main Menu" />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleSubMenuClick}>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Dashboard" />
          {submenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <List component="div" disablePadding style={{ display: submenuOpen ? 'block' : 'none' }}>
          <ListItem button>
            <ListItemText primary="Sub Item 1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Sub Item 2" />
          </ListItem>
        </List>
        <ListItem button onClick={() => /* setActiveReport('sales') */ {}}>
          <ListItemIcon><ShoppingCart /></ListItemIcon>
          <ListItemText primary="Sales Report" />
        </ListItem>
        <ListItem button onClick={() => /* setActiveReport('inventory') */ {}}>
          <ListItemIcon><ListAlt /></ListItemIcon>
          <ListItemText primary="Inventory Report" />
        </ListItem>
        <ListItem button onClick={() => /* setActiveReport('customers') */ {}}>
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Customer Report" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
