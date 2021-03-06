import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'https://datbot.lysandredebut.fr/app/php/InsertInformation.php';

export class NotificationsManagement{

    constructor(props){
        this.registerForPushNotificationsAsync(props);
    }


    async registerForPushNotificationsAsync(props) {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }

        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();

        console.log("Got token ! ", token);

        // POST the token to your backend server from where you can retrieve it to send push notifications.

        let body = {
            token: token,
            positions: props.positions,
            user: {username: props.username, password: props.password},
            zone: props.zone
        };

        return fetch(PUSH_ENDPOINT+"?Token="+token, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .done();
    }
}