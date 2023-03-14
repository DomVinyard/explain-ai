// "use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Stub(props: any) {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: props.name }),
      });
      const { success } = await response.json();
      if (!success) {
        console.error("error generating topic");
        return;
      }
      // router.replace(`/${props.slug}/${props.audience}`);
      location.reload();
    })();
  }, [props.slug, props.audience, props, router]);

  return <>{JSON.stringify(props)}</>;
}
