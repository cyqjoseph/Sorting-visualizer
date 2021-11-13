import { Menu, MenuItem, SubMenu, SidebarContent } from "react-pro-sidebar";
import {
  GiBubbles,
  GiEmptyMetalBucketHandle,
  GiBookPile,
  GiMonkey,
} from "react-icons/gi";
import { HiArrowSmDown } from "react-icons/hi";
import { BiSelectMultiple, BiRun, BiGitMerge } from "react-icons/bi";
import { CgBoy } from "react-icons/cg";
import { Link } from "react-router-dom";
const SidebarBody: React.FC = function (): JSX.Element {
  return (
    <SidebarContent>
      <Menu iconShape="square">
        <SubMenu title="Quadratic">
          <MenuItem icon={<GiBubbles />}>
            Bubble Sort
            <Link to="/bubble" />
          </MenuItem>
          <MenuItem icon={<HiArrowSmDown />}>
            Insertion Sort
            <Link to="/insertion" />
          </MenuItem>
          <MenuItem icon={<BiSelectMultiple />}>
            Selection Sort
            <Link to="/selection" />
          </MenuItem>
          <MenuItem icon={<GiEmptyMetalBucketHandle />}>
            Bucket Sort
            <Link to="/bucket" />
          </MenuItem>
        </SubMenu>
        <SubMenu title="Logarithmic">
          <MenuItem icon={<BiRun />}>
            Quick Sort
            <Link to="/quick" />
          </MenuItem>
          <MenuItem icon={<BiGitMerge />}>
            Merge Sort
            <Link to="/merge" />
          </MenuItem>
          <MenuItem icon={<GiBookPile />}>
            Heap Sort
            <Link to="/heap" />
          </MenuItem>
          <MenuItem icon={<CgBoy />}>
            Tim Sort
            <Link to="/tim" />
          </MenuItem>
        </SubMenu>
        <SubMenu title="Bruh">
          <MenuItem icon={<GiMonkey />}>
            Bogo Sort
            <Link to="/bogo" />
          </MenuItem>
        </SubMenu>
      </Menu>
    </SidebarContent>
  );
};
export default SidebarBody;
