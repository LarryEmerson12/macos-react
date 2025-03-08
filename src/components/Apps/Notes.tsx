"use client";

import Image from "next/image";
import Button from "../Button";
import styled from "styled-components";

const StyledImage = styled(Image)`
  filter: brightness(0) saturate(100%) invert(74%) sepia(91%) saturate(1393%)
    hue-rotate(5deg) brightness(97%) contrast(101%);
`;

const Notes = () => {
  return (
    <div>
      <aside className="hidden w-[250px] flex-col md:flex p-4">
        <Button variant="tab" className="flex items-center justify-between">
          <div className="flex items-center">
            <StyledImage
              src="/icons/quick-notes.svg"
              width={16}
              height={9}
              alt=""
              className="me-2"
            />
            Quick Notes
          </div>
          <span className="text-gray-500 ml-auto">1</span>
        </Button>
      </aside>
    </div>
  );
};

export default Notes;
