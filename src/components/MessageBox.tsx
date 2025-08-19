import { useRef, useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function MessageBox(props: { onSend?: (msg: string) => void, onFocus?: () => void }) {
  const [msg, setMsg] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleSend(event: FormEvent) {
    event.preventDefault();
    if (props.onSend) props.onSend(msg);
    setMsg("");
    inputRef.current?.focus();
  }

  return (
    <form className="flex gap-2" onSubmit={handleSend}>
      <Input placeholder="Type something..." value={msg} onChange={e => setMsg(e.target.value)} ref={inputRef} autoComplete="off" onFocus={props?.onFocus} />
      <Button type="submit">Send</Button>
    </form>
  );
}
