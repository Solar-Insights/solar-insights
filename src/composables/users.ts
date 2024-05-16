import { auth0 } from "@/plugins/auth";
import { useUserSessionStore } from "@/stores/userSessionStore";
import router from "@/plugins/router";

export function handleUserState() {
    const userSessionStore = useUserSessionStore();

    const loginUser = () => {
        const currentPath = router.currentRoute.value.path;
        userSessionStore.setCallbackPath(currentPath);

        const callbackPage = `${window.location.origin}/callback`;
        auth0.loginWithRedirect({
            appState: {
                target: callbackPage
            }
        });
    };

    const logoutUser = () => {
        auth0.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    };

    return {
        loginUser,
        logoutUser
    };
}
