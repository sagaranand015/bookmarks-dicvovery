// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useContext, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import Twitter from 'mdi-material-ui/Twitter'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { GetState, GetTwitterAuthClient, SetTwitterAuthClient } from 'src/@core/utils/twitter-auth-utils'
import AppContext from 'src/app-context'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const LoginPage = (props: any) => {
  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  // initiate the login by redirecting to the authUrl
  async function initiateTwitterLogin() {
    if (props != null && props.authUrl != null) {
      window.open(props.authUrl, "_blank");
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in via Twitter to see your awesome data insights!</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={initiateTwitterLogin}
            >
              <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                <Twitter sx={{ color: '#1da1f2' }} />
              </IconButton>
              Login via Twitter
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>See How It Works</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 5 }}></Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <Typography variant='body2' sx={{ marginRight: 2 }}>
                More Integrations Coming Soon!
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>See our Roadmap</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export async function getServerSideProps(context: any) {
  /**
   * Get the Twitter authClient from the server and give it to the Login Page via server props
   */
  const authClient = GetTwitterAuthClient();
  const STATE = GetState();
  // Get authorization
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge: "challenge",
    code_challenge_method: "plain",
  });
  SetTwitterAuthClient(authClient);
  console.log("authUrl on server is: ", authUrl);
  return {
    props: { authUrl: authUrl }, // will be passed to the page component as props
  }
}

export default LoginPage
