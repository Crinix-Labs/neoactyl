import db from './models/db.ts';
import accounts from './models/accounts.ts';
import settings from './models/settings.ts';

(async () => {
    await settings.create({setting: 'secret', value: '12345678'});
})()