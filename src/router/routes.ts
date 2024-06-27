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

export type RouteInfo = {
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
            title: "Solar Insights - Drive adoption of solar energy",
            meta: [
                { 
                    name: "description", 
                    content: "Discover SOLAR INSIGHTS - Easy to use, highly adaptive, and accurate. Observe the viability of solar installations in one single search." 
                }
            ]
        }
    },
    fr: {
        name: PageName.HOME,
        path: PageRoute.HOME,
        head: {
            title: "Solar Insights - Propulser l'adoption de l'énergie solaire",
            meta: [
                { 
                    name: "description", 
                    content: "Découvrez SOLAR INSIGHTS - Intuitif, hautement adaptif et précis. Observer la viabilité d'une installation de panneaux solaires en une simple recherche." 
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
            title: "Search - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "Quickly find your next solar panel installation with a single request by address." 
                }
            ]
        }
    },
    fr: {
        name: PageName.SEARCH,
        path: PageRoute.SEARCH,
        head: {
            title: "Recherche - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "Trouvez rapidement votre prochaine installation de panneaux solaires avec une simple requête par adresse." 
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
            title: "Solar Map - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "Visualize, customize and optimize solar panel installations with up-to-date solar and financial data." 
                }
            ]
        }
    },
    fr: {
        name: PageName.SOLAR_MAP,
        path: PageRoute.SOLAR_MAP,
        head: {
            title: "Carte solaire - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "Visualisez, modifiez et optimisez des installations de panneaux solaires avec des données solaires et financières à jour." 
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
            title: "Get Started - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "A quick guide to kickstart your journey on Solar Insights." 
                }
            ]
        }
    },
    fr: {
        name: PageName.GET_STARTED,
        path: PageRoute.GET_STARTED,
        head: {
            title: "Lancez-vous - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "Une introduction en quelques étapes à votre séjour sur Solar Insights." 
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
            title: "My Organization - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "Manage your organization and find out more about it." 
                }
            ]
        }
    },
    fr: {
        name: PageName.MY_ORGANIZATION,
        path: PageRoute.MY_ORGANIZATION,
        head: {
            title: "Mon organisation - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "Gérez votre organisation et découvrez-en plus sur celle-ci." 
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
            title: "Pricing - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "Simple and unsurpricing pricing. Pay only for what you need, and nothing more." 
                }
            ]
        }
    },
    fr: {
        name: PageName.PRICING,
        path: PageRoute.PRICING,
        head: {
            title: "Tarification - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "Une tarification simple et sans surprise. Payez seulement pour ce que vous utilisez, et rien de plus." 
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
            title: "Callback - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "Get redirected to the right place on our site." 
                }
            ]
        }
    },
    fr: {
        name: PageName.CALLBACK,
        path: PageRoute.CALLBACK,
        head: {
            title: "Rappel - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "Soyez rediriger à la bonne place sur notre site." 
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
            title: "Page Not Found - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "The page your are looking fore might have been deleted." 
                }
            ]
        }
    },
    fr: {
        name: PageName.NOT_FOUND,
        path: PageRoute.NOT_FOUND,
        head: {
            title: "Page introuvable - Solar Insights",
            meta: [
                { 
                    name: "description", 
                    content: "La page que vous recherchiez a peut-être été supprimée." 
                }
            ]
        }
    }
}

export function headSelector(route: RouteInfo, locale: Locale) {
    return route[locale].head;
}