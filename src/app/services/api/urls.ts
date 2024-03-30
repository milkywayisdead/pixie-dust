const apiHost = 'localhost';
const apiPort = 3000;
const path = `http://${apiHost}:${apiPort}/api/v1`;

export const urls = {
    profiles: `${path}/profiles`,
    profile: `${path}/profile`,
}