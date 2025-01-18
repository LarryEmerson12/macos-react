import { useOnClickOutside } from "@/utils/useOnClickOutside";
import { FC, useRef, RefObject } from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  closeContextMenu: () => void;
}

const ContextMenu: FC<ContextMenuProps> = ({ x, y, closeContextMenu }) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(contextMenuRef as RefObject<HTMLElement>, closeContextMenu);

  return (
    <div
      ref={contextMenuRef}
      onClick={() => closeContextMenu()}
      className="absolute z-20"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      ContextMenu
    </div>
  );
};

export default ContextMenu;
