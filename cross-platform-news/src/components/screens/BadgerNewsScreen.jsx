import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useState, useEffect } from 'react';
import BadgerNewsItemCard from "../../components/BadgerNewsItemCard";
import { usePreferences } from '../context/BadgerPreferencesContext';

function BadgerNewsScreen({ navigation }) {
    const [articles, setArticles] = useState([]);
    const { preferences } = usePreferences();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('https://cs571api.cs.wisc.edu/rest/f24/hw8/articles', {
                    headers: {
                        'X-CS571-ID': 'bid_a2af385ee3dcc0025e6ea8de3c41a34c0983dc676d69028a71dc3bf93e2fc84a'
                    }
                });
                const data = await response.json();
                setArticles(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchArticles();
    }, []);

    const handlePress = (article) => {
        console.log('Attempting navigation with:', article.fullArticleId);
        navigation.navigate('Article', {
            fullArticleId: article.fullArticleId,
            title: article.title
        });
    };

    // Filter articles based on preferences
    const filteredArticles = articles.filter(article => 
        article.tags.every(tag => preferences[tag])
    );

    if (!Array.isArray(articles)) {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.message}>Loading articles...</Text>
            </View>
        );
    }

    if (filteredArticles.length === 0) {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.message}>No articles match your preferences!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {filteredArticles.map(article => (
                    <TouchableOpacity
                        key={article.id}
                        onPress={() => handlePress(article)}
                    >
                        <BadgerNewsItemCard
                            title={article.title}
                            img={article.img}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    message: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        padding: 20,
    }
});

export default BadgerNewsScreen;