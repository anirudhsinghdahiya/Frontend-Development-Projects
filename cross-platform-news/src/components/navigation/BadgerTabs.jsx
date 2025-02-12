import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import BadgerNewsStack from './BadgerNewsStack';  // Make sure path is correct
import BadgerPreferencesScreen from '../screens/BadgerPreferencesScreen';

const Tab = createBottomTabNavigator();

function BadgerTabs(props) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'News') {
                        iconName = 'newspaper';
                    } else if (route.name === 'Preferences') {
                        iconName = 'settings';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#e01e3c',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen 
                name="News"
                component={BadgerNewsStack}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name="Preferences" 
                component={BadgerPreferencesScreen}
            />
        </Tab.Navigator>
    );
}

export default BadgerTabs;