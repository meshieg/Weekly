import { Logout, 
         PersonOutline as Person,
        //  NotificationsNone as Notifications,
         LabelOutlined as Tag } from '@mui/icons-material';
import { IProfileAction } from '../../utils/types';

export const navActions: IProfileAction[] = [
    {
        id: 0,
        icon: <Person/>,
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
        icon: <Tag/>,
        text: "My Tags",
        route: "./my-tags"
    }
]

export const logout: IProfileAction = {
    id: 0,
    icon: <Logout/>,
    text: "Logout",
    displayArrow: false
}