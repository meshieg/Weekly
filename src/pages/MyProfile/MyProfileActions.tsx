import { Logout, 
         PersonOutline as Person,
        //  NotificationsNone as Notifications,
         LabelOutlined as Tag } from '@mui/icons-material';
import { IProfileAction } from '../../utils/types';

export const actions: IProfileAction[] = [
    {
        icon: <Person/>,
        text: "Personal Information",
    },
    // {
    //     icon: <Notifications/>,
    //     text: "Notifications",
    // },
    {
        icon: <Tag/>,
        text: "My Tags",
    }
]

export const logout: IProfileAction = {
    icon: <Logout/>,
    text: "Logout",
    displayArrow: false
}