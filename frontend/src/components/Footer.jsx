import { Container, HStack, Icon, Link, Stack, Text} from '@chakra-ui/react'
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si'
import { useColorModeValue } from "./ui/color-mode"
// import { Copyright } from './copyright'
// import { Logo } from './logo'

 const Footer = () => (
    <Container as="footer" py={{ base: '10', md: '12' }}
                position={"fixed"}
                bottom={"0"}
                width={"100%"}
                maxW={"100%"}
                bg={useColorModeValue('white', 'gray.800')}
   borderTop={"1px"}
   borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Stack gap="1">
        <Stack direction="row" justify="space-between" align="center">
          <HStack gap="4">
            {socialLinks.map(({ href, icon }, index) => (
              <Link key={index} href={href} colorPalette="gray">
                <Icon size="md">{icon}</Icon>
              </Link>
            ))}
          </HStack>
          <Text fontSize="sm" color="gray.500">
       © {new Date().getFullYear()} Sarthak. All rights reserved.
     </Text>

        </Stack>
      </Stack>
    </Container>
  )
  
  const socialLinks = [
    { href: 'https://github.com/sarthakp107', icon: <SiGithub /> },
    { href: 'https://www.linkedin.com/in/sarthak-pradhan-a2abab275/', icon: <SiLinkedin /> },
  ]

export default Footer