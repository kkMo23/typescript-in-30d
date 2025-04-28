import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
    const { data: session } = useSession();
    const [currentUser, setCurrentUser] = useState<string>("");
    
    useEffect(() => {
        if (session) {
        setCurrentUser(session.user.id);
        }
    }, [session]);
    
    return currentUser;
}