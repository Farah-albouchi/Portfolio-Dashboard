"use client";

import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ProjectsIcon from "@mui/icons-material/Folder";
import TestimonialsIcon from "@mui/icons-material/Star";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LogoutIcon from '@mui/icons-material/Logout';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link"; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@/components/ui/button";
import NotificationsIcon from '@mui/icons-material/Notifications';
import PreviewIcon from '@mui/icons-material/Preview';
import { userContext } from "@/app/Context/userContext";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import './styles.css';
import { Target } from "lucide-react";

const drawerWidth = 240;

function DrawerMenu(props) {
  const { user } = useContext(userContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
  const router = useRouter();
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.clear();
    router.replace("/login");
    
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };
  const drawer = (
    <div className="mt-16">
      <Divider />
      <List>
        {[
          { text: "Personal Overview", icon: <PersonIcon />, href: "/dashboard/PersonalOverview" },
          { text: "Partners", icon: <WorkIcon />, href: "/dashboard/Partners" },
          { text: "About Me", icon: <InfoIcon />, href: "/dashboard/AboutMe" },
          { text: "Services", icon: <DesignServicesIcon />, href: "/dashboard/services" },
          { text: "My Unique Value", icon: <AutoFixHighIcon />, href: "/dashboard/Achievement" },
          { text: "Projects", icon: <ProjectsIcon />, href: "/dashboard/Project" },
          { text: "Testimonials", icon: <TestimonialsIcon />, href: "/dashboard/Testimonials" },
          { text: "Contact", icon: <ContactMailIcon />, href: "/dashboard/contact" },
          { text: "Messages", icon: <NotificationsIcon />, href: "/notifications" },
          { text: "View Result ", icon: <PreviewIcon />, href:`http://localhost:3002/${user?._id}`, target: "_blank" },
          { text: "Logout", icon: <LogoutIcon  />, onClick: handleLogoutClick , style: { color: '#ef233c' } },

        ].map(({ text, icon, href,target, onClick , style  }) => (
          <ListItem key={text} disablePadding>
            <Link href={href || "#"}  target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} passHref>
              <ListItemButton onClick={onClick}>
                <ListItemIcon sx={{ color: style?.color || 'text.primary' }}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{  color: style?.color ||'text.primary' }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Dialog open={openLogoutDialog} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to log out?</p>
        </DialogContent>
        <DialogActions>
           <Button onClick={handleLogoutCancel}  className="border-neutral-800  bg-white text-neutral-800 hover:bg-white"  >Cancel</Button>
          <Button onClick={handleLogoutConfirm}  className="hover:text-red hover:border-red hover:bg-white text-white bg-red">Logout</Button> 
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
}

DrawerMenu.propTypes = {
  window: PropTypes.func,
};


export default DrawerMenu;
