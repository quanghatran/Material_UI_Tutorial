import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import { useLocation, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { format } from "date-fns";
import Avatar from "@material-ui/core/Avatar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	return {
		page: {
			backgroundColor: "#f9f9f9",
			width: "100%",
			padding: theme.spacing(3),
		},

		drawer: {
			width: drawerWidth,
		},

		drawerPaper: {
			width: drawerWidth,
		},

		root: {
			display: "flex",
		},

		active: {
			background: "#f4f4f4",
		},
		title: {
			padding: theme.spacing(2),
		},
		appbar: {
			width: `calc(100% - ${drawerWidth}px)`,
		},

		toolbar: theme.mixins.toolbar,

		date: {
			flexGrow: 1,
		},

		avatar: {
			marginLeft: theme.spacing(2),
		},
	};
});

const Layout = ({ children }) => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();

	const menuItems = [
		{
			text: "My Note",
			icon: <SubjectOutlined color='secondary' />,
			path: "/",
		},
		{
			text: "Create Note",
			icon: <AddCircleOutlineOutlined color='secondary' />,
			path: "/create",
		},
	];
	return (
		<div className={classes.root}>
			{/* app bar */}
			<AppBar className={classes.appbar} elevation={1}>
				<Toolbar>
					<Typography className={classes.date}>
						Today is the {format(new Date(), "do MMMM Y")}
					</Typography>
					<Typography>Ha Quangg</Typography>
					<Avatar
						src='/FD1A9F62-3DC1-43E1-AA34-DFA8C09E17A3.JPG'
						className={classes.avatar}
					/>
				</Toolbar>
			</AppBar>

			{/* side drawer */}
			<Drawer
				className={classes.drawer}
				variant='permanent'
				anchor='left'
				classes={{ paper: classes.drawerPaper }}
			>
				<div>
					<Typography variant='h5' className={classes.title}>
						Admin
					</Typography>
				</div>

				<List>
					{menuItems.map((item) => (
						<ListItem
							button
							key={item.text}
							onClick={() => history.push(item.path)}
							className={location.pathname == item.path ? classes.active : null}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
			</Drawer>

			<div className={classes.page}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
		</div>
	);
};

export default Layout;
