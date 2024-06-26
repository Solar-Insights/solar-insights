import { Locale } from "@/helpers/types";

enum PageName {
    HOME = "home",
    SEARCH = "search",
    SOLAR_MAP = "solar-map",
    GET_STARTED = "get-started",
    MY_ORGANIZATION = "my-organization",
    PRICING = "pricing",
    CALLBACK = "callback",
    NOT_FOUND = "not-found",
};

enum PageRoute {
    HOME = "/",
    SEARCH = "/search-location",
    SOLAR_MAP = "/solar-map",
    GET_STARTED = "/get-started",
    MY_ORGANIZATION = "/my-organization",
    PRICING = "/pricing",
    CALLBACK = "/callback",
    NOT_FOUND = "/not-found",
}

type RouteInfo = {
    [key in Locale]: {
        name: PageName,
        path: string,
        head: {
            title: string,
            meta: [
                { 
                    name: string, 
                    content: string 
                }
            ]
        }
    }
};

export const HOME: RouteInfo = {
    en: {
        name: PageName.HOME,
        path: PageRoute.HOME,
        head: {
            title: "Home",
            meta: [
                { 
                    name: "description", 
                    content: "Welcome to the home page" 
                }
            ]
        }
    },
    fr: {
        name: PageName.HOME,
        path: PageRoute.HOME,
        head: {
            title: "Accueil",
            meta: [
                { 
                    name: "description", 
                    content: "Bienvenue sur la page d'accueil" 
                }
            ]
        }
    }
}

export const SEARCH: RouteInfo = {
    en: {
        name: PageName.SEARCH,
        path: PageRoute.SEARCH,
        head: {
            title: "Search",
            meta: [
                { 
                    name: "description", 
                    content: "Search for locations" 
                }
            ]
        }
    },
    fr: {
        name: PageName.SEARCH,
        path: PageRoute.SEARCH,
        head: {
            title: "Recherche",
            meta: [
                { 
                    name: "description", 
                    content: "Rechercher des emplacements" 
                }
            ]
        }
    }
}

export const SOLAR_MAP: RouteInfo = {
    en: {
        name: PageName.SOLAR_MAP,
        path: PageRoute.SOLAR_MAP,
        head: {
            title: "Solar Map",
            meta: [
                { 
                    name: "description", 
                    content: "View the solar map" 
                }
            ]
        }
    },
    fr: {
        name: PageName.SOLAR_MAP,
        path: PageRoute.SOLAR_MAP,
        head: {
            title: "Carte Solaire",
            meta: [
                { 
                    name: "description", 
                    content: "Voir la carte solaire" 
                }
            ]
        }
    }
}

export const GET_STARTED: RouteInfo = {
    en: {
        name: PageName.GET_STARTED,
        path: PageRoute.GET_STARTED,
        head: {
            title: "Get Started",
            meta: [
                { 
                    name: "description", 
                    content: "Get started with our services" 
                }
            ]
        }
    },
    fr: {
        name: PageName.GET_STARTED,
        path: PageRoute.GET_STARTED,
        head: {
            title: "Commencer",
            meta: [
                { 
                    name: "description", 
                    content: "Commencez avec nos services" 
                }
            ]
        }
    }
}

export const MY_ORGANIZATION: RouteInfo = {
    en: {
        name: PageName.MY_ORGANIZATION,
        path: PageRoute.MY_ORGANIZATION,
        head: {
            title: "My Organization",
            meta: [
                { 
                    name: "description", 
                    content: "View my organization details" 
                }
            ]
        }
    },
    fr: {
        name: PageName.MY_ORGANIZATION,
        path: PageRoute.MY_ORGANIZATION,
        head: {
            title: "Mon Organisation",
            meta: [
                { 
                    name: "description", 
                    content: "Voir les détails de mon organisation" 
                }
            ]
        }
    }
}

export const PRICING: RouteInfo = {
    en: {
        name: PageName.PRICING,
        path: PageRoute.PRICING,
        head: {
            title: "Pricing",
            meta: [
                { 
                    name: "description", 
                    content: "View pricing details" 
                }
            ]
        }
    },
    fr: {
        name: PageName.PRICING,
        path: PageRoute.PRICING,
        head: {
            title: "Tarification",
            meta: [
                { 
                    name: "description", 
                    content: "Voir les détails des prix" 
                }
            ]
        }
    }
}

export const CALLBACK: RouteInfo = {
    en: {
        name: PageName.CALLBACK,
        path: PageRoute.CALLBACK,
        head: {
            title: "Callback",
            meta: [
                { 
                    name: "description", 
                    content: "Callback page" 
                }
            ]
        }
    },
    fr: {
        name: PageName.CALLBACK,
        path: PageRoute.CALLBACK,
        head: {
            title: "Rappel",
            meta: [
                { 
                    name: "description", 
                    content: "Page de rappel" 
                }
            ]
        }
    }
}

export const NOT_FOUND: RouteInfo = {
    en: {
        name: PageName.NOT_FOUND,
        path: PageRoute.NOT_FOUND,
        head: {
            title: "Not Found",
            meta: [
                { 
                    name: "description", 
                    content: "Page not found" 
                }
            ]
        }
    },
    fr: {
        name: PageName.NOT_FOUND,
        path: PageRoute.NOT_FOUND,
        head: {
            title: "Introuvable",
            meta: [
                { 
                    name: "description", 
                    content: "Page non trouvée" 
                }
            ]
        }
    }
}

export function headSelector(route: RouteInfo, locale: Locale) {
    return route[locale].head;
}