import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import BEMHelper from "../utils/bem";
import "./sideMenu.less";

const SideMenu: React.FunctionComponent = () => {
  const cls = BEMHelper("sidemenu");
  return (
    <div className={cls.className}>
      <Paper sx={{ width: 320, maxWidth: "100%" }}>
        <MenuList>
          <div className={cls.element("menulist")}>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Kurs</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Deltakere</ListItemText>
            </MenuItem>
          </div>
        </MenuList>
      </Paper>
    </div>
  );
};
export default SideMenu;
