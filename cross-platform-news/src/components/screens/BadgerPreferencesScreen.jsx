import { View, Text, StyleSheet, Switch, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { usePreferences } from '../context/BadgerPreferencesContext';

function BadgerPreferencesScreen() {
    const { preferences, setPreferences } = usePreferences();
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);  // Add loading state

    useEffect(() => {
        const fetchTags = async () => {
            try {
                setLoading(true);  // Start loading
                const response = await fetch('https://cs571api.cs.wisc.edu/rest/f24/hw8/articles', {
                    headers: {
                        'X-CS571-ID': 'bid_a2af385ee3dcc0025e6ea8de3c41a34c0983dc676d69028a71dc3bf93e2fc84a'
                    }
                });
                const articles = await response.json();
                
                const uniqueTags = [...new Set(articles.flatMap(article => article.tags))];
                setTags(uniqueTags);
                
                if (Object.keys(preferences).length === 0) {
                    const initialPrefs = {};
                    uniqueTags.forEach(tag => {
                        initialPrefs[tag] = true;
                    });
                    setPreferences(initialPrefs);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);  // End loading
            }
        };

        fetchTags();
    }, []);

    const toggleSwitch = (tag) => {
        setPreferences(prev => ({
            ...prev,
            [tag]: !prev[tag]
        }));
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#e01e3c" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {tags.map(tag => (
                <View key={tag} style={styles.preferenceCard}>
                    <Text style={styles.preferenceText}>
                        Currently {preferences[tag] ? 'showing' : 'NOT showing'} {' '}
                        <Text style={styles.tagText}>{tag}</Text>
                        {' '}articles.
                    </Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#e01e3c' }}
                        thumbColor={'#f4f3f4'}
                        value={preferences[tag]}
                        onValueChange={() => toggleSwitch(tag)}
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    preferenceCard: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        flexDirection: 'column',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    preferenceText: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    tagText: {
        fontWeight: 'bold'
    }
});

export default BadgerPreferencesScreen;