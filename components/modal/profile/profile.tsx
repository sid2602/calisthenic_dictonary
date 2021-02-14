import Button from "@material-ui/core/Button";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { UserT } from "data/userSlice";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    justifyContent: "center",
  },
  content: {
    width: "80%",
    margin: "0 auto",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const UserState = useSelector<UserT, UserT["user"]>((state) => state.user);
  const { user } = UserState;

  return (
    <>
      <header>
        <DialogTitle id="profile-dialog-title">Profile</DialogTitle>
      </header>
      <section>
        <DialogContent className={classes.content}>
          <DialogContentText
            id="username-dialog-description"
            className={classes.info}
          >
            Username: <Box component="span">{user.username}</Box>
          </DialogContentText>
          <DialogContentText
            id="email-dialog-description"
            className={classes.info}
          >
            Email: <Box component="span">{user.email}</Box>
          </DialogContentText>
        </DialogContent>
      </section>
      <footer>
        <DialogActions className={classes.dialogActions}>
          <Button color="secondary" autoFocus>
            export trainings to exel
          </Button>
        </DialogActions>
      </footer>
    </>
  );
};

export default Profile;
