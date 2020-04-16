import React from 'react';
import { TouchableNativeFeedback, Text, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const MainLabel = props => {
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={{...styles.labelContainer, ...props.style}}>
                <Text style={styles.text}>
                    {props.children}
                </Text>
                <MaterialCommunityIcons name={props.iconName} size={26} color="black" />
            </View>
        </TouchableNativeFeedback>
    )
};

const styles = StyleSheet.create({
    labelContainer: {

        width: '70%',
        height: '14%',
        padding: 20,
        margin: 8,

        backgroundColor: 'white',
        opacity: .65,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: "center",

        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 1
    },
    text: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',

    }
});

export default MainLabel;