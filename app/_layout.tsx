import React from 'react'
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default Layout
