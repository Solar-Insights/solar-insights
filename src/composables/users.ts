import { auth0 } from "@/plugins/auth";
import { useUserSessionStore } from "@/stores/userSessionStore";

export function handleUserState() {
    const userSessionStore = useUserSessionStore();
    const callbackPage = `${window.location.origin}/callback`;
    const currentRoute = window.location.href;

    const loginUser = () => {
        userSessionStore.setCallbackUrl(currentRoute);

        auth0.loginWithRedirect({
            appState: {
                target: callbackPage
            }
        });
    }

    const logoutUser = () => {
        auth0.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    }

    return {
        loginUser,
        logoutUser
    };
}