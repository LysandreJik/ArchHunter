import React from 'react'
import {ScrollView, View, Text, Button} from 'react-native';
import {NotificationsManagement} from "../usermanagement/NotificationsManagement";

var AreasInformation = require('../assets/jsonFiles/AreasInformation');

export default class ZoneSelection extends React.Component{

    startHunt(zone){
        console.log("Starting hunt in zone : ", zone);
        let not = new NotificationsManagement({positions: AreasInformation[zone].positions, username: this.props.username, password: this.props.password, zone: zone});
    }

    render(){
        let parent = this;
        return(
            <View style={styles.container}>
                <Text style={styles.darkText}>SELECT AN AREA</Text>
                <ScrollView>
                    {Object.keys(AreasInformation).map(function(key, index){
                        return <Button color={styles.text.color} key={index} title={key} onPress={() => parent.startHunt(key)}/>
                    })}
                </ScrollView>
                <Button color={styles.text.color} title={"Go back"} onPress={this.props.goBack}/>
            </View>
        )
    }
}

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: "#1F2833",
        paddingTop: 50,
        paddingBottom: 50
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

    scrollView: {

    },

    darkText: {
        color: "#C5C6C7",
        fontSize: 20,
        margin: 5
    }
};