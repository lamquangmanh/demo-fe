import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);
  return <></>;
}
// Page.getLayout = function getLayout(page: ReactElement) {
//   return <ProtectedLayout>{page}</ProtectedLayout>;
// };
