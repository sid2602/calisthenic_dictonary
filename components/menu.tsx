import { useState } from "react";
import { Menu, Fade, MenuItem, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setActiveRoutine, openModal, ModalTypeTypes } from "data/modalSlice";
import { openDialog, DialogType } from "data/dialogSlice";
import useUpdateRoutines from "helpers/modalHooks/useUpdateRoutines";
import MoreVertIcon from "@material-ui/icons/MoreVert";

type Props = {
  editButtonClick: () => void;
  removeButtonClick: () => void;
};

const MenuComponent = ({ editButtonClick, removeButtonClick }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditButtonClick = () => {
    editButtonClick();
    handleClose();
  };

  const handleRemoveButtonClick = () => {
    removeButtonClick();
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-controls="fade-menu"
        aria-label="settings"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleEditButtonClick}>Edit</MenuItem>
        <MenuItem onClick={handleRemoveButtonClick}>Remove</MenuItem>
      </Menu>
    </>
  );
};
export default MenuComponent;
