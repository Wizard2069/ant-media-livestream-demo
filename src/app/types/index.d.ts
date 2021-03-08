import {KeycloakProfile} from 'keycloak-js';

declare type MessagePayload = {
    sender: {
        name: string;
        avatar: string;
    },
    msg: string;
    time: Date;
};

declare type Message = MessagePayload & {type: string};

declare type CustomKeycloakProfile = KeycloakProfile & {
    attributes: {
        picture: string[]
    } 
};
