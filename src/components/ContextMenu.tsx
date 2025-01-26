import { useOnClickOutside } from "@/utils/useOnClickOutside";
import { FC, useRef, RefObject } from "react";
import Menu from "./Menu";

interface ContextMenuProps {
  x: number;
  y: number;
  closeContextMenu: () => void;
}

const ContextMenu: FC<ContextMenuProps> = ({ x, y, closeContextMenu }) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(contextMenuRef as RefObject<HTMLElement>, closeContextMenu);
  const contextMenuContent = ["New Folder", "Get Info", "Change Desktop Background", "Use Stacks", "Sort By", "Clean Up", "Clean Up By", "Show View Options"]

  return (
    <div
      ref={contextMenuRef}
      onClick={() => closeContextMenu()}
      className="absolute z-20"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <Menu content={contextMenuContent} />
    </div>
  );
};

export default ContextMenu;
