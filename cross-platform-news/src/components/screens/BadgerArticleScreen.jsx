import { View, Text, ScrollView, StyleSheet, Animated, Image, Pressable, Linking } from 'react-native';
import { useState, useEffect, useRef } from 'react';

function BadgerArticleScreen({ route }) {
    const [article, setArticle] = useState(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(
                    `https://cs571api.cs.wisc.edu/rest/f24/hw8/article?id=${route.params.fullArticleId}`,
                    {
                        headers: {
                            'X-CS571-ID': 'bid_a2af385ee3dcc0025e6ea8de3c41a34c0983dc676d69028a71dc3bf93e2fc84a'
                        }
                    }
                );
                const data = await response.json();
                setArticle(data);
            } catch (err) {
                console.error("Error fetching article:", err);
            }
        };

        fetchArticle();
    }, []);

    useEffect(() => {
        if (article) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start();
        }
    }, [article]);

    const handlePress = async (url) => {
        try {
            await Linking.openURL(url);
        } catch (error) {
            console.error("Failed to open URL:", error);
        }
    };

    if (!article) {
        return (
            <View style={styles.container}>
                <Text style={styles.loading}>The content is loading!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Animated.View style={[{ opacity: fadeAnim }]}>
                    <Text style={styles.title}>{article.title}</Text>
                    <Text style={styles.author}>By {article.author} on {article.posted}</Text>
                    <Pressable onPress={() => handlePress(article.url)}>
                        <Text style={styles.link}>Read full article here.</Text>
                    </Pressable>
                    <Image 
                        source={{ uri: `https://raw.githubusercontent.com/CS571-F24/hw8-api-static-content/main/${article.img}` }}
                        style={styles.image}
                    />
                    {article.body.map((paragraph, index) => (
                        <Text key={index} style={styles.paragraph}>{paragraph}</Text>
                    ))}
                </Animated.View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        padding: 16,
    },
    loading: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#000',
    },
    author: {
        fontSize: 17,
        color: '#666',
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 16,
        borderRadius: 8,
    },
    paragraph: {
        fontSize: 17,
        lineHeight: 24,
        marginBottom: 16,
        color: '#333',
    },
    link: {
        color: '#0066CC',
        fontSize: 17,
        textDecorationLine: 'underline',
        marginBottom: 16,
    }
});

export default BadgerArticleScreen;