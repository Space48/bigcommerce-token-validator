require('dotenv').config()

import { DoAudit } from '../src/index';
import { BigCommercePermission } from '../src/types/BigCommercePermission';

const noPermsCreds = {
    // Get from env var
    clientId: process.env.BC_CREDS_LOGGING_ONLY_CLIENTID!,
    accessToken: process.env.BC_CREDS_LOGGING_ONLY_ACCESSTOKEN!,
    storeHash: process.env.BC_CREDS_LOGGING_ONLY_STOREHASH!,
}

const allButCustomersWriteCreds = {
    clientId: process.env.BC_CREDS_ALL_BUT_CUSTOMERS_WRITE_CLIENTID!,
    accessToken: process.env.BC_CREDS_ALL_BUT_CUSTOMERS_WRITE_ACCESSTOKEN!,
    storeHash: process.env.BC_CREDS_ALL_BUT_CUSTOMERS_WRITE_STOREHASH!,
};

describe('index', () => {

    describe('None except logs', () => {

        it('should audit', async () => {
            const permissions = [BigCommercePermission.All];

            const results = await DoAudit(noPermsCreds, permissions);
            expect(results).toMatchSnapshot();
        });
    });

    describe('All except customer write', () => {
        it('should audit all', async () => {
            const permissions = [BigCommercePermission.All];
            const results = await DoAudit(allButCustomersWriteCreds, permissions);
            expect(results).toMatchSnapshot();

            const customerResult = results.find(r => r.permission === BigCommercePermission.Customers);
            const customerReadResult = results.find(r => r.permission === BigCommercePermission.CustomersRead);

            expect(customerResult).toBeDefined();
            expect(customerReadResult).toBeDefined();

            expect(customerResult?.result).toEqual(false);
            expect(customerReadResult?.result).toEqual(true);

            const resultsWithoutCustomerWrite = results.filter(r => r.permission !== BigCommercePermission.Customers);
            expect(resultsWithoutCustomerWrite.map(r => r.result).every(r => r === true)).toBeTruthy();

            return;

        });
    });
});