import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BadgerNewsScreen from '../screens/BadgerNewsScreen';
import BadgerArticleScreen from '../screens/BadgerArticleScreen';

const Stack = createNativeStackNavigator();

function BadgerNewsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ArticlesList" 
                component={BadgerNewsScreen}
                options={{
                    headerTitle: 'Articles'
                }}
            />
            <Stack.Screen 
                name="Article" 
                component={BadgerArticleScreen}
                options={({ route }) => ({
                    headerTitle: 'Article',
                    headerBackTitle: 'Articles'
                })}
            />
        </Stack.Navigator>
    );
}

export default BadgerNewsStack;