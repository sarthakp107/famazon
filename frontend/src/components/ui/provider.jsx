'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'
import { createStandaloneToast } from '@chakra-ui/toast'

const { ToastContainer } = createStandaloneToast()

export function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem}>
        <ToastContainer position="top" />
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
