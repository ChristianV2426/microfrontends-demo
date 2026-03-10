import { useEffect, useRef } from "react";

export default function VueMicrofrontend() {
  const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  let unmount: (() => void) | undefined;

  import("vuemf-app/App").then((mod: any) => {
    const mount = mod.default.mount;

    unmount = mount(ref.current) as (() => void) | undefined;
  });

  return () => unmount?.();
}, []);

  return <div ref={ref} />;
}