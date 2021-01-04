import AutorenewIcon from "@material-ui/icons/Autorenew";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { logOutUser } from "services/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 0 0 2rem",
  },
  title: {
    textAlign: "center",
  },
}));

const DrawerIcon = styled.img`
  width: 30px;
`;

const Links = [
  {
    name: "CalisthenicDictonary",
    link: "/",
  },
  {
    name: "Profile",
    link: "/Profile",
    icon: <AccountCircleIcon style={{ fontSize: "35px" }} />,
  },
  {
    name: "Training",
    link: "/training",
    icon: <DrawerIcon src="img/training.png" alt="training" />,
  },
  {
    name: "Exercises",
    link: "/exercises",
    icon: <DrawerIcon src="img/exercises.png" alt="exercises" />,
  },
  {
    name: "Routine",
    link: "/statistic",
    icon: <AutorenewIcon style={{ fontSize: "40px" }} />,
  },
  {
    name: "Statistic",
    link: "/statistic",
    icon: <EqualizerIcon style={{ fontSize: "40px" }} />,
  },
  {
    name: "log out",
    link: "/login",
    icon: <ExitToAppIcon style={{ fontSize: "40px" }} />,
    onClick: logOutUser,
  },
];

const ListComponent = () => {
  const classes = useStyles();

  return (
    <>
      {Links.map((item) => (
        <Link key={item.name} href={item.link}>
          <ListItem button onClick={item.onClick && item.onClick}>
            {item.icon && (
              <ListItemIcon className={classes.root}>{item.icon}</ListItemIcon>
            )}
            <ListItemText className={!item.icon ? classes.title : ""}>
              {item.name}
            </ListItemText>
          </ListItem>
        </Link>
      ))}
    </>
  );
};

export default ListComponent;
