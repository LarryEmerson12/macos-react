"use client"

import Button from "./Button";
import MacCursor from "./MacCursor";
import IpadCursor from "./IpadCursor";
import { useState } from "react";

export default function CursorHandler() {
  const [cursorType, setCursorType] = useState(true);
  function changeCursorType() {
    setCursorType(!cursorType);
  }
  return (
    <div>
      <div>
        <Button onClick={changeCursorType}>Change cursor</Button>
      </div>
      {cursorType && <MacCursor size={32} />}
      {!cursorType && <IpadCursor />}
    </div>
  );
}
