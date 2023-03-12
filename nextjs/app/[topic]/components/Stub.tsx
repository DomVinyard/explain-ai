// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

export default function Stub({ data }: any) {
  // const router = useRouter();
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(`api/revalidate?slug=${data.slug}`);
  //     // const json = await response.json();
  //     console.log({ response });
  //     // await fetch(`api/generate`, { body: { name, slug } });
  //     // revalidate
  //     // router.replace(`/${slug}`);
  //   })();
  // }, [data.slug]);

  return <>{JSON.stringify(data)}</>;
}
