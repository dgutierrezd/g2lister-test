import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';
import {ActivityIndicator, Button, View} from 'react-native';
import ScreenX from '../screens/ScreenX';
import ScreenZ from '../screens/ScreenZ';
import ScreenY from '../screens/ScreenY';
import LoginScreen from '../screens/LoginScreen';
import permissions from '../utils/permissions';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {state, logOut} = useAuth();

  if (state.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const getScreens = () => {
    if (!state.isLoggedIn) {
      return (
        <>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        </>
      );
    } else if (state.accountType) {
      // Member 1: show X, Y, Z
      // Member 2: show Y, Z
      return (
        <>
          {permissions[state.accountType as keyof typeof permissions]?.map(
            (permission: string) => (
              <Stack.Screen
                key={permission}
                name={permission}
                component={screenComponents[permission]}
              />
            ),
          )}
        </>
      );
    }
  };

  const logoutButton = () => <Button onPress={logOut} title="Log Out" />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: state.isLoggedIn ? logoutButton : undefined,
        }}>
        {getScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Map between string keys and component values
const screenComponents: {[key: string]: React.ComponentType<any>} = {
  ScreenX: ScreenX,
  ScreenY: ScreenY,
  ScreenZ: ScreenZ,
};

export default AppNavigator;
