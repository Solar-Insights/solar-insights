import { LatLng } from "geo-env-typing/geo";

export type TimeParameters = {
    tick: number;
    month: number;
    day: number;
    hour: number;
};

export type Alert = {
    type: AlertType;
    title: string;
    message: string;
};

export type MapElements = {
    map: google.maps.Map;
    marker: google.maps.Marker;
    autocomplete: google.maps.places.Autocomplete;
};

export type AlertType = "warning" | "error" | "success";

export type FinancialParameters = {
    installationLifespan: number;
    installationCostPerWatt: number;
    averageMonthlyEnergyBill: number;
    energyCostPerKwh: number;
    solarIncentives: number;
    yearlyEnergyCostIncrease: number;
    yearlyDiscountRate: number;
};

export type PanelParameters = {
    panelCount: number;
    minPanelCount: number;
    maxPanelCount: number;
    panelCapacityWatts: number;
    defaultPanelCapacityWatts: number;
    yearlyEnergyDcKwh: number;
    dcToAcDerate: number;
    yearlyPanelEfficiencyDecline: number;
}

export type UserSolarData = FinancialParameters & PanelParameters;

export type SolarReadonlyPanel = "BUILDING_READONLY" | "INSIGHTS_READONLY";

export type TimeSerie = {
    name: String;
    data: TimeSerieData;
};

export type TimeSerieData = [Date, number][];

export type Theme = "light" | "dark";

export type Locale = "fr" | "en";

export type ExportType = "json";

export type InstallationExportOptions = {
    solarInsightsAndParameters: boolean;
    panelConfiguration: boolean;
    exportType: ExportType;
};

export function getDefaultInstallationExportOptions() {
    return {
        solarInsightsAndParameters: true,
        buildingAttributes: true,
        panelConfiguration: true,
        exportType: "json"
    } as InstallationExportOptions;
}

export type RouteInfo = {
    section: RouteSection;
    name: string;
    icon: string;
    requiresAuth: boolean;
    displaysAppBarAndFooter: boolean;
    action?: () => void;
};

export type MyOrganization = {
    name: string;
    admins: MyOrganizationMember[];
};

export type MyOrganizationMember = {
    created_date: string;
    email: string;
    name: string;
    avatar: string;
};

export type ButtonAction = {
    text: string;
    icon?: string;
};

export type BuildingQueried = {
    validRequest: boolean;
    coords: LatLng;
};

export type RouteSection = "solar-insights" | "services" | "support";

export type PricingCardDetails = {
    pricingTier: PricingTier;
    name: string;
    description: string;
    action: string;
    monthlyFixedPrice: number;
    benefits: PricingCardBenefits;
};

export type PricingCardBenefits = {
    title: string;
    benefits: PricingCardSingleBenefit[];
};

export type PricingCardSingleBenefit = {
    title: string;
    description?: string;
};

export type PricingTier = "starter" | "pro" | "enterprise";

export type NewOrganizationForm = {
    name: string;
    contactEmail: string;
    pricingTier: PricingTier;
    modifiyingExistingPlan: boolean;
    additionalNotes: string;
};

export type NewOrganizationUserForm = {
    email: string;
    name: string;
};

export type PageTitleActionType = {
    text: string;
    icon: string;
};

export type MonthlyFreeField = "max_free_members_count" | "max_free_building_insights_requests";

export type MonthlyQuotaField = "max_members_count" | "max_building_insights_requests";

export type MonthlyBillingField = "members_count" | "building_insights_requests";

export type MonthlyBillingPrice = "members_unit_price_in_cents" | "building_insights_requests_unit_price_in_cents";

export type MonthlyPlanInfo = "plan_count" | "plan_unit_price_in_cents";

export type BillingInfoFromInvoice = {
    [key in MonthlyBillingPrice]: number;
} & {
    [key in MonthlyPlanInfo]: number;
} & {
    [key in MonthlyFreeField]: number;
} & {
    periodStart: string;
    periodEnd: string;
    dueDate: string;
};

export type MyOrganizationBillingRecap = {
    [key in MonthlyQuotaField]: number;
} & {
    [key in MonthlyBillingField]: number;
} & {
    pricingTier: PricingTier;
} & BillingInfoFromInvoice;

export type MyOrganizationDetails = {
    admins: MyOrganizationMember[];
    name: string;
};

export type MyOrganizationAdminDetails = {
    myOrganizationMembers: MyOrganizationMember[];
    myOrganizationBillingRecap: MyOrganizationBillingRecap;
};
