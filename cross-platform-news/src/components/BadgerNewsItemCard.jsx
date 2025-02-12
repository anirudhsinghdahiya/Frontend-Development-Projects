import { View, Text, Image, StyleSheet } from 'react-native';

function BadgerNewsItemCard({ title, img }) {
    return (
        <View style={styles.card}>
            <Image 
                source={{ uri: `https://raw.githubusercontent.com/CS571-F24/hw8-api-static-content/main/${img}` }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={3}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        margin: 10,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    textContainer: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 28,
        color: '#000',
    }
});

export default BadgerNewsItemCard;