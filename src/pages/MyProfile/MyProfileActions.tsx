import { Logout as LogoutIcon, 
         PersonOutline as PersonIcon,
        //  NotificationsNone as Notifications,
         LabelOutlined as TagIcon } from '@mui/icons-material';
import { IProfileAction } from '../../utils/types';

export const navActions: IProfileAction[] = [
    {
        id: 0,
        icon: <PersonIcon/>,
        text: "Personal Information",
        route: "./personal-data"
    },
    // {
    //     id: ?,
    //     icon: <Notifications/>,
    //     text: "Notifications",
    //     route: "./notifications"
    // },
    {
        id: 1,
        icon: <TagIcon/>,
        text: "My Tags",
        route: "./my-tags"
    }
]

export const logout: IProfileAction = {
    id: 0,
    icon: <LogoutIcon/>,
    text: "Logout",
    displayArrow: false
}