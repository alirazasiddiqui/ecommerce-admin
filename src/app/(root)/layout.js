import { prismaDb } from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({ children }) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const store = await prismaDb.store.findFirst({
    where: {
      userId,
    },
  });
  if (store) {
    redirect(`/${store.id}`);
  }

  return (
    <>
  { children }
  </>

  )
  
  
}
