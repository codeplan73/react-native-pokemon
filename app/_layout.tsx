import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f35b04',
        },
        headerTintColor: '#eee',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Pokemon' }} />
      <Stack.Screen name="(pokemon)/[id]" options={{ title: '' }} />
    </Stack>
  )
}

export default Layout
