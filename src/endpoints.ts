import { BigCommercePermission } from "./types/BigCommercePermission"


export interface BigCommercePermissionRequest {
    enabled?: boolean;
    method: "GET" | "POST" | "PUT" | "DELETE";
    version: "v2" | "v3";
    path: string;
    test?: (response: any) => boolean;
}
export type BigCommercePermissionEndpointCollection = Partial<{
    [key in BigCommercePermission]: BigCommercePermissionRequest;
}>;

export const BigCommercePermissionEndpoints: BigCommercePermissionEndpointCollection = {
    [BigCommercePermission.Content]: {
        method: "POST",
        version: "v2",
        path: "/pages"
    },
    [BigCommercePermission.ContentRead]: {
        method: "GET",
        version: "v2",
        path: "/pages"
    },
    [BigCommercePermission.CheckoutContent]: {
        method: "POST",
        version: "v3",
        path: "/content/scripts"
    },
    [BigCommercePermission.CheckoutContentRead]: {
        method: "GET",
        version: "v3",
        path: "/content/scripts/1"
    },
    [BigCommercePermission.Customers]: {
        method: "POST",
        version: "v3",
        path: "/customers"
    },
    [BigCommercePermission.CustomersRead]: {
        method: "GET",
        version: "v3",
        path: "/customers"
    },
    // [BigCommercePermission.CustomersLogin]: { // TODO: Add case for this as not mgmt api
    //     enabled: false,
    //     method: "GET",
    //     version: "v2",
    //     path: "/*"
    // },
    // [BigCommercePermission.InformationSettings]: { // No methods to test against
    //     enabled: false,
    //     method: "GET",
    //     version: "v2",
    //     path: "/*"
    // },
    [BigCommercePermission.InformationSettingsRead]: {
        method: "GET",
        version: "v2",
        path: "/time",
        test: (response: any) => {
            return Boolean(response?.body?.time)
        },
    },
    [BigCommercePermission.Marketing]: {
        method: "POST",
        version: "v2",
        path: "/banners"
    },
    [BigCommercePermission.MarketingRead]: {
        method: "GET",
        version: "v2",
        path: "/banners"
    },
    [BigCommercePermission.Orders]: {
        method: "POST",
        version: "v2",
        path: "/orders"
    },
    [BigCommercePermission.OrdersRead]: {
        method: "GET",
        version: "v2",
        path: "/orders"
    },
    // [BigCommercePermission.OrderTransactions]: { // No methods to test against
    //     method: "POST",
    //     version: "v3",
    //     path: "/orders/1/transactions"
    // },
    [BigCommercePermission.OrderTransactionsRead]: {
        method: "GET",
        version: "v3",
        path: "/orders/1/transactions"
    },
    [BigCommercePermission.CreatePayments]: {
        method: "POST",
        version: "v3",
        path: "/payments/access_tokens"
    },
    [BigCommercePermission.GetPaymentMethodsRead]: {
        method: "GET",
        version: "v2",
        path: "/payments/methods"
    },
    [BigCommercePermission.Products]: {
        method: "POST",
        version: "v3",
        path: "/catalog/products"
    },
    [BigCommercePermission.ProductsRead]: {
        method: "GET",
        version: "v3",
        path: "/catalog/products"
    },
    [BigCommercePermission.Themes]: {
        method: "POST",
        version: "v3",
        path: "/themes"
    },
    [BigCommercePermission.ThemesRead]: {
        method: "GET",
        version: "v3",
        path: "/themes"
    },
    [BigCommercePermission.Carts]: {
        method: "POST",
        version: "v3",
        path: "/carts"
    },
    [BigCommercePermission.CartsRead]: {
        method: "GET",
        version: "v3",
        path: "/carts/1"
    },
    [BigCommercePermission.Checkouts]: {
        method: "POST",
        version: "v3",
        path: "/checkouts/1/billing-address"
    },
    [BigCommercePermission.CheckoutsRead]: {
        method: "GET",
        version: "v3",
        path: "/checkouts/1"
    },
    [BigCommercePermission.SitesRoutes]: {
        enabled: false,
        method: "GET",
        version: "v2",
        path: "/*"
    },
    [BigCommercePermission.SitesRoutesRead]: {
        method: "GET",
        version: "v3",
        path: "/sites/1/routes"
    },
    [BigCommercePermission.ChannelSettingsd]: {
        method: "POST",
        version: "v3",
        path: "/channels/currency-assignments"
    },
    [BigCommercePermission.ChannelSettingsRead]: {
        method: "GET",
        version: "v3",
        path: "/channels/currency-assignments"
    },
    [BigCommercePermission.ChannelListings]: {
        method: "POST",
        version: "v3",
        path: "/channels/1/listings"
    },
    [BigCommercePermission.ChannelListingsRead]: {
        method: "GET",
        version: "v3",
        path: "/channels/1/listings"
    },
    [BigCommercePermission.StorefrontApiTokens]: {
        enabled: false,
        method: "GET",
        version: "v2",
        path: "/*"
    },
    [BigCommercePermission.StorefrontApiCustomerImpersonationTokens]: {
        enabled: false,
        method: "GET",
        version: "v2",
        path: "/*"
    }
}