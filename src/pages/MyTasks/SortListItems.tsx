import { ReactElement } from "react";
import { Direction } from "../../utils/constants";
import { StraightOutlined as ArrowIcon,
         FilterListOutlined as SortIcon } from '@mui/icons-material';

export interface ISortItem {
    key: number;
    title: string;
    direction: Direction;
    icon: ReactElement;
    active: boolean;
};

export const sortItems: ISortItem[] = [
    {
        key: 0,
        title: "due date",
        direction: Direction.ASC,
        icon: <ArrowIcon sx={{marginRight: "0.5rem"}}/>,
        active: false 
    },
    {
        key: 1,
        title: "due date",
        direction: Direction.DESC,
        icon: <ArrowIcon sx={{ transform: "rotate(180deg)",
                               marginRight: "0.5rem"}} />,
        active: false 
    },
    {
        key: 2,
        title: "title",
        direction: Direction.ASC,
        icon: <SortIcon sx={{ transform: "rotate(180deg)",
                              marginRight: "0.5rem"}} />,
        active: false 
    },
    {
        key: 3,
        title: "title",
        direction: Direction.DESC,
        icon: <SortIcon sx={{marginRight: "0.5rem"}} />,
        active: false 
    }
];