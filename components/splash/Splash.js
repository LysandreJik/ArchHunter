import React from 'react';
import {Animated, Easing, View, Image, Dimensions} from 'react-native';

const images = {
    left: require('../../assets/images/splash/left.png'),
    middle: require('../../assets/images/splash/middle.png'),
    right: require('../../assets/images/splash/right.png'),
};

export default class Splash extends React.Component{
    constructor(props){
        super(props);
        this.slideValueLeft = new Animated.Value(0);
        this.slideValueMiddle = new Animated.Value(0);
        this.slideValueRight = new Animated.Value(0);

        this.slideUpLeft = this.slideUpLeft.bind(this);
        this.slideUpMiddle = this.slideUpMiddle.bind(this);
        this.slideUpRight = this.slideUpRight.bind(this);
        this.playAnimation = this.playAnimation.bind(this);

        this.state = {end: false};
    }

    componentDidMount(){
        this.playAnimation();
    }

    playAnimation(){
        this.slideValueLeft.setValue(0);
        this.slideValueMiddle.setValue(0);
        this.slideValueRight.setValue(0);
        this.slideUpLeft();
        setTimeout(this.slideUpMiddle, 300);
        setTimeout(this.slideUpRight, 600);
    }

    slideUpLeft(){
        Animated.timing(this.slideValueLeft, {toValue: 1, duration: 800, easing: Easing.bezier(.35, .35, .08, 1.06)}).start();
    }

    slideUpMiddle(){
        Animated.timing(this.slideValueMiddle, {toValue: 1, duration: 800, easing: Easing.bezier(.35, .35, .08, 1.06)}).start();
    }

    slideUpRight(){
        let parent = this;
        Animated.timing(this.slideValueRight, {toValue: 1, duration: 800, easing: Easing.bezier(.35, .35, .08, 1.06)}).start(this.state.end ? this.props.callback :
            function(){
                parent.setState({end: true});
                parent.playAnimation();
            }, 1000);
    }

    render(){
        let slideLeft = this.slideValueLeft.interpolate({
            inputRange: [0, 1],
            outputRange: this.state.end ? [0, -Dimensions.get('window').height] : [Dimensions.get('window').height, 0]
        });

        let slideMiddle = this.slideValueMiddle.interpolate({
            inputRange: [0, 1],
            outputRange: this.state.end ? [0, -Dimensions.get('window').height] : [Dimensions.get('window').height, 0]
        });

        let slideRight = this.slideValueRight.interpolate({
            inputRange: [0, 1],
            outputRange: this.state.end ? [0, -Dimensions.get('window').height] : [Dimensions.get('window').height, 0]
        });

        return(
            <View style={styles.container}>
                <View style={styles.smallerContainer}>
                    <Animated.Image style={{...styles.smallImage, top: slideLeft}} source={images.left}/>
                    <Animated.Image style={{...styles.image, top: slideMiddle}} source={images.middle}/>
                    <Animated.Image style={{...styles.smallImage, top: slideRight}} source={images.right}/>
                </View>
            </View>
        );
    }
}

const ratio = 4;

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5b5b5b',
        flexDirection: 'row'
    },

    smallerContainer: {
        width: "50%",
        height: "50%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    image: {
        margin: 10/ratio,
        height: 663/ratio,
        width: 70/ratio,
        top: Dimensions.get('window').height
    },

    smallImage: {
        margin: 10/ratio,
        height: 506/ratio,
        width: 70/ratio
    }
};
