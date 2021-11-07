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
const SidebarBody = function (): JSX.Element {
  return (
    <SidebarContent>
      <Menu iconShape="square">
        <SubMenu title="Quadratic">
          <MenuItem icon={<GiBubbles />}>Bubble Sort</MenuItem>
          <MenuItem icon={<HiArrowSmDown />}>Insertion Sort</MenuItem>
          <MenuItem icon={<BiSelectMultiple />}>Selection Sort</MenuItem>
          <MenuItem icon={<GiEmptyMetalBucketHandle />}>Bucket Sort</MenuItem>
        </SubMenu>
        <SubMenu title="Logarithmic">
          <MenuItem icon={<BiRun />}>Quick Sort</MenuItem>
          <MenuItem icon={<BiGitMerge />}>Merge Sort</MenuItem>
          <MenuItem icon={<GiBookPile />}>Heap Sort</MenuItem>
          <MenuItem icon={<CgBoy />}>Tim Sort</MenuItem>
        </SubMenu>
        <SubMenu title="Bruh">
          <MenuItem icon={<GiMonkey />}>Bogo Sort</MenuItem>
        </SubMenu>
      </Menu>
    </SidebarContent>
  );
};
export default SidebarBody;
