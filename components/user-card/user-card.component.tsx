import { Image, StyleSheet, Text, TextInput, View } from "react-native"
import { Person } from "../../utils/people";

interface UserCardComponentPropsType extends Person {

}

const UserCardComponent = ({
    bio,
    firstName,
    image,
    lastName,
    reaction
}: UserCardComponentPropsType) => {

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                width: "100%"
            }}
        >
            <View>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: image
                    }}
                />
            </View>
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 5,
                    justifyContent: "space-evenly",
                    width: "100%",
                    flex: 1,
                    flexWrap: "wrap"
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    <Text style={[styles.text, styles.name]}>
                        {firstName}
                    </Text>
                    <Text style={[styles.text, styles.name]}>
                        {lastName}
                    </Text>
                </View>
                {
                    bio != undefined ?
                        <View>
                            <Text style={styles.text}>
                                {bio}
                            </Text>
                        </View>
                        :
                        <></>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 100,
        height: 100,
        borderRadius: 50
    },

    text: {
        marginLeft: 5,
        fontFamily: "serif",
    },

    name: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default UserCardComponent;