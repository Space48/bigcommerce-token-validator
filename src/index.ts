import BigCommerce from 'node-bigcommerce';
import { BigCommercePermission } from './types/BigCommercePermission';
import { BigCommercePermissionEndpoints } from './endpoints';



const getClient = (creds: {
    clientId: string,
    accessToken: string,
    storeHash: string,

}, version: "v2" | "v3") => {
    return new BigCommerce({
        logLevel: 'info',
        responseType: 'json',
        headers: { 'Accept-Encoding': '*' }, // Override headers (Overriding the default encoding of GZipped is useful in development)
        apiVersion: version, // Default is v2
        ...creds
    });
}

const isUnauthorized = (status: number) => (status === 403)
const isNotFound = (status: number) => (status === 404)
const isNotError = (status: number) => (status >= 200 && status < 300)
const formatError = (status: number) => (status === 422) || (status === 400);
const isSuccessful = (status: number) => !isUnauthorized(status) && (isNotError(status) || isNotFound(status) || formatError(status));

const processPermissions = (permissions: BigCommercePermission[]): BigCommercePermission[] => {
    if(permissions.some(p => p === BigCommercePermission.All)) {
        return Object.keys(BigCommercePermissionEndpoints)
            .map(p => p as BigCommercePermission)
            .filter(p => BigCommercePermissionEndpoints[p] !== undefined)
            .filter(p => BigCommercePermissionEndpoints[p]!.enabled !== false)
            .filter(p => p !== BigCommercePermission.All)
    }
    return permissions
    .filter(p => BigCommercePermissionEndpoints[p] !== undefined)
    .filter(p => BigCommercePermissionEndpoints[p]!.enabled !== false);
}

export const DoAudit = async (creds: {
    clientId: string,
    accessToken: string,
    storeHash: string,

}, permissions: BigCommercePermission[]) => {
    const results = processPermissions(permissions).map(async (permission) => {
        const endpoint = BigCommercePermissionEndpoints[permission]!;
        if (endpoint.enabled === false) {
            console.log(`Permission ${permission} is disabled`);
            return { permission, result: false };
        }
        const client = getClient(creds, endpoint.version);

        let response = undefined;

        if (endpoint.method === "POST") {
            response = await client.post(endpoint.path, {  })
            .then((r: any) => ({ status: 200, body: r }))
            .catch((e: Error & {code: number, responseBody: string}) => ({ status: e.code, body: e.responseBody }));
        } else if (endpoint.method === "GET") {
            response = await client.get(endpoint.path)
            .then((r: any) => ({ status: 200, body: r }))
            .catch((e: Error & {code: number, responseBody: string}) => ({ status: e.code, body: e.responseBody }));
        } else {
            console.log(`Permission ${permission} has an invalid method`);
            return { permission, result: false };
        }
        const isSuccessfulResult = endpoint.test ? endpoint.test(response) : isSuccessful(response.status);
        return { permission, result: isSuccessfulResult, status: response.status, message: !isSuccessfulResult ? response.body: undefined };
    });
    return Promise.all(results);

}