import * as local from "../assets/appsettings.json"
import * as dev from "../assets/appsettings.dev.json"
import * as prod from "../assets/appsettings.prod.json"
const getConfiguration = () => {
    const env = '{{APP_ENV}}'.replace(/^\s+|\s+$/g, '');
    console.log(env);
    let config: any;
    switch (env.toLowerCase()) {

        case 'test': {
            config = dev;
            break;
        }
        case 'prod': {

            config = prod;
            break;
        }
        default:
            config = local;
    }

    return config;
};

export const AppConfig = getConfiguration();