import React from 'react'
import {View, Text, Button, ActivityIndicator} from 'react-native';

const PUSH_ENDPOINT = 'https://datbot.lysandredebut.fr/app/php/FetchExistingAccounts.php';

export default class ExistingAccount extends React.Component{

    state = {dataFetched: false};

    constructor(){
        super();

        fetch(PUSH_ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => this.data = data)
            .then(() => this.setState({dataFetched: true}))
            .done();
    }

    clickedOnName(username, password){
        console.log("Clicked on ", username, password);

        this.props.selectZone(username, password);
    }

    render(){
        let parent = this;
        if(this.state.dataFetched){
            if(this.data.length === 0){
                return(
                    <View><Text style={styles.text}>No registered accounts.</Text></View>
                )
            }else{
                return(
                    <View style={{padding: 10}}>{this.data.map(function(item, key){return <Button color={styles.text.color} key={key} title={item.username} onPress={() => parent.clickedOnName(item.username, item.password)}/>})}</View>
                )
            }
        }else{
            return(
                <ActivityIndicator size="large" color="#66FCF1"/>
            );
        }

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
    },

    darkText: {
        color: "#45A29E",
        fontSize: 20,
        margin: 5
    }
};