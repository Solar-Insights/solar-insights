import { createAuth0 } from "@auth0/auth0-vue";
import { VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID, VITE_AUTH0_AUDIENCE } from "@/env";

export const auth0 = createAuth0({
    domain: VITE_AUTH0_DOMAIN,
    clientId: VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
        audience: VITE_AUTH0_AUDIENCE,
        redirect_uri: `${window.location.origin}/callback` // e.g. https://solarinsights.ca/callback
    }
});
