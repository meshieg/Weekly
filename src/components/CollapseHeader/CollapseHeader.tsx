import "./CollapseHeader.css";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useState } from "react";

interface ICollapseHeaderProps {
    headerText?: string;
    showArrow?: boolean;
    children: React.ReactNode;
}

const CollapseHeader: React.FC<ICollapseHeaderProps> = ({
  headerText = "",
  showArrow = true,
  children
}) => {
    const [collapseOpen, setCollapseOpen] = useState<boolean>(true);

    return (
      <>
        <div className="collapse-header" onClick={() => setCollapseOpen(!collapseOpen)}>
          {showArrow && (collapseOpen ? <ExpandLess /> : <ExpandMore />)} 
          {headerText}
        </div>
        <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </>
    );
 };

export default CollapseHeader;