import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Appcues from '@appcues/react-native';
import UserContext from '../../contexts/UserContext';
import { FilledButton, PlainButton } from '../../components/Button';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import { useAnalytics } from '@segment/analytics-react-native';

const Stack = createNativeStackNavigator();

const ProfileView = () => {
  const { identify, screen, reset } = useAnalytics();

  useFocusEffect(
    React.useCallback(() => {
      screen('Update Profile');
    }, [])
  );

  const [givenName, onChangeGivenName] = useState(null);
  const [familyName, onChangeFamilyName] = useState(null);
  const { userID } = useContext(UserContext);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        paddingTop: 35,
        paddingLeft: 40,
        paddingRight: 40,
      }}
    >
      <Text>Given Name</Text>
      <TextInput
        onChangeText={onChangeGivenName}
        placeholder="Given Name"
        value={givenName}
        nativeID="txtGivenName"
      />
      <Text>Family Name</Text>
      <TextInput
        onChangeText={onChangeFamilyName}
        placeholder="Family Name"
        value={familyName}
        nativeID="txtFamilyName"
      />
      <FilledButton
        title="Save"
        onPress={() => {
          identify(
            userID,
            removeEmpty({ givenName: givenName, familyName: familyName })
          );
          onChangeGivenName(null);
          onChangeFamilyName(null);
        }}
        nativeID="btnSaveProfile"
      />
    </View>
  );
};

export default function ProfileScreen() {
  const { setUserID } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Update Profile"
        component={ProfileView}
        options={{
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '600' },
          headerRight: () => (
            <PlainButton
              title="Sign Out"
              onPress={() => {
                reset();
                setUserID(null);
                navigation.pop();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}
