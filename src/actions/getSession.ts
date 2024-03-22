import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function GetSession() {
    return await getServerSession(authOptions).catch((error) => {
        console.error(
            'Error happened while getting getServerSession(authOptions) at getSession.ts: ',
            error
        )
    })
}