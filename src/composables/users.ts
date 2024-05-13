import { auth0 } from "@/plugins/auth";

export function handleUserState() {
    const loginUser = () => {
        auth0.loginWithRedirect({
            appState: {
                target: window.location.origin
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