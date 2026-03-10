import React, { useEffect, useRef } from "react";

export default function VueMicrofrontend() {
  const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  let unmount;

  import("vuemf-app/App").then((mod: any) => {
    const mount = mod.default.mount;

    unmount = mount(ref.current);
  });

  return () => unmount?.();
}, []);

  return <div ref={ref} />;
}