import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Avatar, IconButton, makeStyles } from "@material-ui/core/";
import { DeleteOutlined } from "@material-ui/icons";
import { yellow, green, pink, blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
	avatar: {
		background: (note) => {
			if (note.category == "work") {
				return yellow[700];
			}
			if (note.category == "reminders") {
				return green[700];
			}
			if (note.category == "todos") {
				return pink[700];
			}
			return blue[700];
		},
	},
});

const NoteCard = ({ note, handleDelete }) => {
	const classes = useStyles(note);
	return (
		<div>
			<Card elevation={2} className={classes.test}>
				<CardHeader
					avatar={
						<Avatar className={classes.avatar}>
							{note.category[0].toUpperCase()}
						</Avatar>
					}
					action={
						<IconButton onClick={() => handleDelete(note.id)}>
							<DeleteOutlined />
						</IconButton>
					}
					title={note.title}
					subheader={note.category}
				/>
				<CardContent>
					<Typography variant='body2' color='textSecondary'>
						{note.detail}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default NoteCard;
