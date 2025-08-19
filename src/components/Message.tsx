import type { ReactNode } from "react";

export default function Message(props: { children: ReactNode }) {
  return (
    <div>{ props.children }</div>
  );
}
