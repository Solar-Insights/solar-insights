# Breakdown of Solar Insight's costs

Every cost included in this breakdown is in USD. Also, I assume that the monthly volume range of requests stays below 100 000.

## Cost per request

Visit this [page](https://mapsplatform.google.com/pricing/#pricing-grid) for pricing information on all APIs. Otherwise, you can refer to their respective documentation. Also, for certain APIs, the amount of requests used in total costs calculations are pure estimations, not guarantees. For example, the user could make 30 Autocomplete requests instead of the expected 15, or go back to its old URL which wouldn't usie Autocomplete requests at all.

### Frontend

-   Maps API
    -   Maps JavaScript: $0.007 / request
-   Places API
    -   Autocomplete: $0.00283 / request

### Backend server

-   Solar API
    -   Building insights: $0.01 / request
    -   Solar Data Layers: $0.075 / request
-   Geocoding API
    -   Geocoding: $0.005 / request

## Cost per navigation on /solar-map

### Frontend

-   Maps API
    -   Maps JavaScript (1)
-   Places API
    -   Autocomplete (15)

### Backend server

-   Solar API
    -   Building insights (1)
    -   Solar Data Layers (1)
-   Geocoding API
    -   Geocoding: (1)

**Total cost**: $0.13945

## Cost per new search when already on /solar-map

### Frontend

-   Places API
    -   Autocomplete (15)

### Backend server

-   Solar API
    -   Building insights (1)
    -   Solar Data Layers (1)
-   Geocoding API
    -   Geocoding: (1)

**Total cost**: $0.13249
