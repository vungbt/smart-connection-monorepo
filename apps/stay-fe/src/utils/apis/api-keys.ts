import { queryKeysFactory } from '@smart-connection-monorepo/api-client';

export const serviceKeys = queryKeysFactory('services');
export const configKeys = serviceKeys;
export const roomKeys = queryKeysFactory('rooms');
export const userKeys = queryKeysFactory('members');
export const memberKeys = userKeys;
export const contractKeys = queryKeysFactory('contracts');
