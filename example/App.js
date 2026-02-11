import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import * as Appcues from '@appcues/react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserContext from './contexts/UserContext';
import SignInScreen from './screens/signin/SignInScreen';
import MainScreen from './screens/main/MainScreen';
import { PlainButton } from './components/Button';
import { AppcuesPlugin } from '@appcues/segment-react-native';
import {
  createClient,
  AnalyticsProvider,
} from '@segment/analytics-react-native';

const RootStack = createNativeStackNavigator();

const segmentClient = createClient({
  writeKey: 'SEGMENT_WRITE_KEY',
});

segmentClient.add({ plugin: new AppcuesPlugin() });

export default function App() {
  // App state for current user ID, which is used in the
  // UserContext.Provider below to make accessible to other elements
  // in the view hierarchy (sign in screen, profile screen)
  const [userID, setUserID] = useState('default-00000');

  return (
    <AnalyticsProvider client={segmentClient}>
      <UserContext.Provider value={{ userID, setUserID }}>
        <RootView />
      </UserContext.Provider>
    </AnalyticsProvider>
  );
}

function RootView() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: '#1EB5C4',
          background: `#FFFFFF`,
          border: `#FFFFFF`,
        },
        fonts: DefaultTheme.fonts,
      }}
    >
      <RootStack.Navigator>
        <RootStack.Screen
          name="Sign In"
          component={SignInScreen}
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: '600' },
            headerRight: () => (
              <PlainButton
                title="Skip"
                onPress={() => {
                  navigation.navigate('Main');
                }}
              />
            ),
          })}
        />
        <RootStack.Screen
          name="Main"
          component={MainScreen}
          options={{
            presentation: 'fullScreenModal',
            animation: 'fade',
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

Linking.addEventListener('url', async ({ url }) => {
  const appcuesDidHandleURL = await Appcues.didHandleURL(url);

  if (!appcuesDidHandleURL) {
    // Handle a non-Appcues URL
  }
});
