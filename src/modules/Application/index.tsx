import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, VStack } from 'native-base';
import HomeScreen from '~/modules/Application/HomeScreen';
import AppBar from '~/component/AppBar';

const Stack = createNativeStackNavigator();

const Application = () => {
  return (
    <VStack flex={1}>
      <AppBar />
      <Box flex={1}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </Box>
    </VStack>
  );
};

export default Application;
