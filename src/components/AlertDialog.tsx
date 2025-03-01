"use client";

import React from "react";
import Button from "./Button";
import Image from "next/image";

interface AlertDialogProps {
  children: React.ReactNode;
  isOpened?: boolean;
  cancelButtonText?: string;
  acceptButtonText?: string;
  acceptButtonAction?: () => void;
  title?: string;
  onClose: () => void;
  description?: string;
  imgSrc?: string;
}

export function AlertDialog({
  children,
  isOpened,
  cancelButtonText = "Cancel",
  acceptButtonText = "Accept",
  acceptButtonAction,
  title,
  onClose,
  description,
  imgSrc,
}: AlertDialogProps) {
  return (
    isOpened && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white/65 backdrop-blur-lg rounded-lg shadow-lg p-6 w-96 max-w-full text-center">
          <div className="mb-4">
            {imgSrc && <Image src={imgSrc} alt={""} width={100} height={100} className="mx-auto block" />}
            <h1 className="text-black text-lg font-semibold">{title}</h1>
            <p className="text-gray-500">{description}</p>
            <p className="text-black">{children}</p>
          </div>
          <div className="flex justify-center">
            <Button onClick={acceptButtonAction} className="text-white mx-2">
              {acceptButtonText}
            </Button>
            <Button onClick={onClose} className="bg-gray-300 text-gray-500 mx-2 hover:bg-gray-400">
              {cancelButtonText}
            </Button>
          </div>
        </div>
      </div>
    )
  );
}