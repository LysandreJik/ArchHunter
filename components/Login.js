import React from 'react'
import {View, Text, TextInput, Button} from 'react-native';
import ZoneSelection from "./splash/ZoneSelection";

const STATES = {
    LOGIN_SELECTION: 0,
    USE_EXISTING_ACCOUNT: 1,
    REGISTER_NEW_ACCOUNT: 2,
    ZONE_SELECTION: 3
}

export default class Login extends React.Component{

    state = {
        current: STATES.LOGIN_SELECTION
    };

    render(){
        switch(this.state.current){
            case STATES.LOGIN_SELECTION:
                return this.loginSelection();
            case STATES.USE_EXISTING_ACCOUNT:
                return this.useExistingAccount();
            case STATES.REGISTER_NEW_ACCOUNT:
                return this.registerNewAccount();
            case STATES.ZONE_SELECTION:
                return <ZoneSelection/>
        }
    }

    loginSelection(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Login selection</Text>
                <Button title={"Use existing account"} onPress={() => this.setState({current: STATES.USE_EXISTING_ACCOUNT})}/>
                <Button title={"Register new account"} onPress={() => this.setState({current: STATES.REGISTER_NEW_ACCOUNT})}/>
            </View>
        );
    }

    useExistingAccount(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Select existing account</Text>
                <Button color={styles.text.color} title={"Go back"} onPress={() => this.setState({current: STATES.REGISTER_NEW_ACCOUNT})}/>
            </View>
        );
    }

    registerNewAccount(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Register a new account</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({text})}
                    value={"Account name"}
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({text})}
                    value={"Password"}
                />
                <View style={{flexDirection: "row"}}>
                    <Button color={styles.text.color} title={"Ok"} onPress={() => this.setState({current: STATES.REGISTER_NEW_ACCOUNT})}/>
                    <Button color={styles.text.color} title={"Go back"} onPress={() => this.setState({current: STATES.LOGIN_SELECTION})}/>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: "#0B0C10"
    },

    textInput: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#45a29e",
        backgroundColor: "#1F2833",
        height: 40,
        margin: 5,
        padding: 5
    },

    text: {
        color: "#66FCF1",
        fontSize: 20,
        margin: 5
    }
}