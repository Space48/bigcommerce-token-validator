## BigCommerce Token Permissions Audit Tool

[![Node.js CI](https://github.com/space48/bigcommerce-token-validator/actions/workflows/node.js.yml/badge.svg)](https://github.com/space48/bigcommerce-token-validator/actions/workflows/node.js.yml)

This tool is designed to help you audit your BigCommerce store's token permissions. It will generate a report that shows which endpoints are accessible with the token you provide.

You can use this tool to determine which permissions are carried by your token, and which permissions are missing. This can be useful when you are trying to determine why a particular API call is failing.

### Install

Add the following line to your .nmprc file:

`@space48:registry=https://npm.pkg.github.com/space48`

Run `npm install @space48/bigcommerce-token-validator` to install the package.

Then, import the `DoAudit` function and pass it your credentials and the permissions you want to test.
### Usage


```js
import { DoAudit, BigCommercePermission } from '@space48/bigcommerce-token-validator';

const creds = {
    clientId: '',
    accessToken: '',
    storeHash: '',
};
const results = await DoAudit(creds, [
    BigCommercePermission.All,
]);
console.log(results);
```
Results
```json
[
 
    {
        "message": "{\"status\":403,\"title\":\"You don't have a required scope to access the endpoint\",\"type\":\"https://developer.bigcommerce.com/api-docs/getting-started/api-status-codes\",\"errors\":{}}",
        "permission": "store_v2_customers",
        "result": false,
        "status": 403,
    },
    {
        "message": undefined,
        "permission": "store_v2_customers_read_only",
        "result": true,
        "status": 200,
    },
    {
        "message": undefined,
        "permission": "store_v2_information_read_only",
        "result": true,
        "status": 200,
    },
    ...
]
```