import { Menu, MenuItem, SubMenu, SidebarContent } from "react-pro-sidebar";
import {
  GiBubbles,
  GiBookPile,
  GiMonkey,
  GiBackboneShell,
  GiBadGnome,
} from "react-icons/gi";
import { HiArrowSmDown } from "react-icons/hi";
import {
  BiSelectMultiple,
  BiRun,
  BiGitMerge,
  BiShuffle,
  BiCode,
} from "react-icons/bi";
import { CgBoy, CgMenuCake } from "react-icons/cg";
import { FaCocktail, FaBicycle } from "react-icons/fa";
import { Link } from "react-router-dom";

const SidebarBody: React.FC = function (): JSX.Element {
  return (
    <SidebarContent>
      <Menu iconShape="square">
        <SubMenu title="O(n²)">
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
          <MenuItem icon={<GiBadGnome />}>
            Gnome Sort
            <Link to="/gnome" />
          </MenuItem>
          <MenuItem icon={<BiCode />}>
            Odd-Even Sort
            <Link to="/odd-even" />
          </MenuItem>
          <MenuItem icon={<CgMenuCake />}>
            Pancake Sort
            <Link to="/pancake" />
          </MenuItem>
          <MenuItem icon={<FaCocktail />}>
            Cocktail Sort
            <Link to="/cocktail" />
          </MenuItem>
          <MenuItem icon={<FaBicycle />}>
            Cycle Sort
            <Link to="/cycle" />
          </MenuItem>
        </SubMenu>
        <SubMenu title="O(nlog(n))">
          <MenuItem icon={<BiRun />}>
            Quick Sort
            <Link to="/quick" />
          </MenuItem>
          <MenuItem icon={<BiGitMerge />}>
            Merge Sort
            <Link to="/merge" />
          </MenuItem>
          <MenuItem icon={<GiBackboneShell />}>
            Shell Sort
            <Link to="/shell" />
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
        <SubMenu title="O(nk)">
          <MenuItem icon={<BiShuffle />}>
            Radix Sort
            <Link to="/radix" />
          </MenuItem>
        </SubMenu>
        <SubMenu title="Bogo">
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
