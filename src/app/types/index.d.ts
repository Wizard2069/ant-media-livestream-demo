import {KeycloakProfile} from 'keycloak-js';

declare type MessagePayload = {
    sender: {
        name: string;
        email: string;
        avatar: string;
    },
    msg: string;
    time: Date;
};

declare type CustomKeycloakProfile = KeycloakProfile & {
    attributes: {
        picture: string[]
    } 
};
