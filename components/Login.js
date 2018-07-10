import React from 'react'
import {View, Text, TextInput, Button} from 'react-native';
import ZoneSelection from "./ZoneSelection";
import ExistingAccount from "./ExistingAccount";


const STATES = {
    LOGIN_SELECTION: 0,
    USE_EXISTING_ACCOUNT: 1,
    REGISTER_NEW_ACCOUNT: 2,
    ZONE_SELECTION: 3
};

export default class Login extends React.Component{

    constructor(props){
        super(props);

        this.selectZone = this.selectZone.bind(this);
    }

    state = {
        current: STATES.LOGIN_SELECTION,
        username: "",
        password: "",
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
                return <ZoneSelection username={this.state.username} password={this.state.password} goBack={() => this.setState({current: STATES.LOGIN_SELECTION})}/>
        }
    }

    loginSelection(){
        return(
            <View style={styles.container}>
                <Button color={styles.text.color} title={"Use existing account"} onPress={() => this.setState({current: STATES.USE_EXISTING_ACCOUNT})}/>
                <Button color={styles.text.color} title={"Register new account"} onPress={() => this.setState({current: STATES.REGISTER_NEW_ACCOUNT})}/>
            </View>
        );
    }

    selectZone(username, password){
        this.setState({username: username, password: password, current: STATES.ZONE_SELECTION});
    }

    useExistingAccount(){
        return(
            <View style={styles.container}>
                <Text style={styles.darkText}>SELECT EXISTING ACCOUNT</Text>
                <ExistingAccount selectZone={this.selectZone}/>
                <Button color={styles.text.color} title={"Go back"} onPress={() => this.setState({current: STATES.LOGIN_SELECTION})}/>
            </View>
        );
    }

    registerNewAccount(){
        return(
            <View style={styles.container}>
                <Text style={styles.darkText}>REGISTER A NEW ACCOUNT</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({username: text})}
                    value={"Account name"}
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({password: text})}
                    value={"Password"}
                />
                <View style={{flexDirection: "row"}}>
                    <Button color={styles.text.color} title={"Ok"} onPress={() => this.setState({current: STATES.ZONE_SELECTION})}/>
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
        backgroundColor: "#1F2833"
    },

    textInput: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#45a29e",
        backgroundColor: "#1F2833",
        height: 40,
        margin: 5,
        padding: 5,
        color: "#66FCF1"
    },

    text: {
        color: "#66FCF1",
        fontSize: 20,
        margin: 5
    },

    darkText: {
        color: "#C5C6C7",
        fontSize: 20,
        margin: 5
    }
};