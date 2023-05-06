import { useContext } from 'react';
import ToolbarContext from '../contexts/ToolbarContext';

const useToolbar = () => useContext(ToolbarContext);

export default useToolbar;