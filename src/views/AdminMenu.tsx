import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as adminActions } from '../modules/admin';
import { bindActionCreators } from 'redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    root: {
      flexGrow: 1,
    },
    logout: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1, // 가운데로 옮기고 싶음
    },
  }),
);

interface AdminMenuProps {
  nowMenu: string;
  menuDrawerIsOpen: boolean;
  AdminActions: typeof adminActions;
}

function AdminMenu({ nowMenu, AdminActions, menuDrawerIsOpen }: AdminMenuProps) {
  const classes = useStyles();

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    AdminActions.ChangeMenuDrawer(open);
  };

  const clickHandleMenuName = (menuName: string) => (event: React.MouseEvent) => {
    AdminActions.ChangeNowMenu(menuName);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['이벤트 관리', '쿠폰 등록', 'Q&A 관리'].map((text, index) => (
          <ListItem button key={text} onClick={clickHandleMenuName(text)}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Drawer open={menuDrawerIsOpen} onClose={toggleDrawer(false)}>
            {sideList()}
          </Drawer>

          <Typography variant="h6" className={classes.title}>
            {nowMenu}
          </Typography>
          <Button color="inherit" className={classes.logout}>
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connect(
  ({ admin }: StoreState) => ({
    menuDrawerIsOpen: admin.menuDrawerIsOpen,
    nowMenu: admin.nowMenu,
  }),
  dispatch => ({
    AdminActions: bindActionCreators(adminActions, dispatch),
  }),
)(AdminMenu);
