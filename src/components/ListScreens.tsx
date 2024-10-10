import React from 'react';
import {Button, View} from 'react-native';
import {useAuth} from '../context/AuthContext';
import permissions from '../utils/permissions';
import {useNavigation} from '@react-navigation/native';

const ListScreens = () => {
  const {state} = useAuth();

  const navigation = useNavigation();

  return (
    <View>
      {state.accountType &&
        permissions[state.accountType as keyof typeof permissions]?.map(
          (screen: string) => (
            <Button
              key={screen}
              title={`Go to ${screen}`}
              onPress={() => navigation.navigate(screen)}
            />
          ),
        )}
    </View>
  );
};

export default ListScreens;
