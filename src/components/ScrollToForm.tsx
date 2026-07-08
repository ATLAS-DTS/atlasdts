"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ScrollToFormProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function ScrollToForm({
  children,
  className,
  onClick,
  ...props
}: ScrollToFormProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" });
    onClick?.(e);
  }

  return (
    <button type="button" onClick={handleClick} className={className} {...props}>
      {children}
    </button>
  );
}
