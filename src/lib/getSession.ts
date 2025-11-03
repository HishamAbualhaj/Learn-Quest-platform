import { cookies } from "next/headers";

const getSession = async (): Promise<{
  loggedIn: boolean | undefined;
  userDataServer: any[];
}> => {
  const cookieStore = await cookies();
  const userSession = cookieStore.get("user-session")?.value;
  const userData = userSession ? JSON.parse(userSession) : null;

  const { loggedIn, userData: userDataServer } = userData || {
    loggedIn: undefined,
    userData: [],
  };

  return { loggedIn, userDataServer };
};
export default getSession;
