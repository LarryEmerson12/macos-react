"use client";

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
        <span onClick={changeCursorType} className="bg-blue-600 rounded-lg p-1 text-sm m-2">Change cursor</span>
      </div>
      {cursorType && <MacCursor size={32} />}
      {!cursorType && <IpadCursor />}
    </div>
  );
}
