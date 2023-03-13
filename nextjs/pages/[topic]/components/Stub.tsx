// "use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Stub(props: any) {
  const router = useRouter();
  useEffect(() => {
    console.log("slug loaded", props);
    (async () => {
      const response = await fetch(`api/revalidate?slug=${props.slug}`);
      // const json = await response.json();
      console.log({ response });
      // await fetch(`api/generate`, { body: { name, slug } });
      // revalidate
      // router.replace(`/${slug}`);
    })();
  }, [props.slug]);

  return <>{JSON.stringify(props)}</>;
}
