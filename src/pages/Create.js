import { FormControlLabel, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles({
	filed: {
		marginTop: 20,
		marginBottom: 20,
		display: "block",
	},
});

export default function Create() {
	const classes = useStyles();

	const [title, setTitle] = useState("");
	const [detail, setDetail] = useState("");

	const [titleError, setTitleError] = useState(false);
	const [detailError, setDetailError] = useState(false);

	const [category, setCategory] = useState("money");

	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();

		setTitleError(false);
		setDetailError(false);

		if (title == "") {
			setTitleError(true);
		}

		if (detail == "") {
			setDetailError(true);
		}

		if (title && detail) {
			fetch("http://localhost:8000/notes", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ title, detail, category }),
			}).then(() => history.push("/"));
		}
	};
	return (
		<Container>
			<Typography
				variant='h6'
				component='h2'
				gutterBottom
				color='textSecondary'
			>
				Create a New Note
			</Typography>

			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<TextField
					className={classes.filed}
					color='secondary'
					label='Note title'
					variant='outlined'
					fullWidth
					required
					onChange={(e) => setTitle(e.target.value)}
					error={titleError}
				/>
				<TextField
					className={classes.filed}
					color='secondary'
					label='Detail'
					variant='outlined'
					multiline
					rows={4}
					fullWidth
					required
					onChange={(e) => setDetail(e.target.value)}
					error={detailError}
				/>

				<FormControl className={classes.filed}>
					<FormLabel>Note Category</FormLabel>
					<RadioGroup
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<FormControlLabel value='money' control={<Radio />} label='Money' />
						<FormControlLabel value='todos' control={<Radio />} label='Todos' />
						<FormControlLabel
							value='reminders'
							control={<Radio />}
							label='Reminders'
						/>
						<FormControlLabel value='work' control={<Radio />} label='Works' />
					</RadioGroup>
				</FormControl>

				<Button
					type='submit'
					variant='contained'
					color='secondary'
					startIcon={<SendIcon />}
				>
					Submit
				</Button>
			</form>
		</Container>
	);
}
