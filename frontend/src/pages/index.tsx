// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'

import { GetState, GetTwitterAuthClient } from 'src/@core/utils/twitter-auth-utils'
import { Client } from 'twitter-api-sdk'
import { useContext, useState } from 'react'
import TwitterAuthContext from 'src/@core/context/twitterAuthContext'

const Dashboard = (props: any) => {

  const twitterAuthContext = useContext(TwitterAuthContext);
  const [twitterAuthCode, setTwitterAuthCode] = useState<string | null>(null);
  const [twitterAuthToken, setTwitterAuthToken] = useState<string | null>(null);
  const [twitterUserId, setTwitterUserId] = useState<any | null>(null);

  console.log("===== props are: ", props);

  return (
    (twitterUserId && twitterAuthCode) ? <div>Logged in!</div> : <div>Not Logged in!</div>
  )
}

export async function getServerSideProps(context: any) {

  console.log("====== context on server is: ", context);

  const authClient = GetTwitterAuthClient();
  const STATE = GetState();
  if (context.query != null) {
    const state = context.query.state;
    if (state != STATE) {
      console.error("State is not matching.. Failing..");
      return {
        props: {
          success: false,
          error: "State is not matching. Please try authenticating again",
        }
      }
    }
    const err = context.query.error;
    if (err != null) {
      console.error("Error authenticating with Twitter. Err: " + err);
      return {
        props: {
          success: false,
          error: "Error authenticating with Twitter. Err: " + err,
        }
      }
    }

    const authUrl = authClient.generateAuthURL({
      state: STATE,
      code_challenge: "challenge",
      code_challenge_method: "plain",
    });
    const code = context.query.code;
    //Gets access token and pass back to the dashboard page
    try {
      await authClient.requestAccessToken(code);
      const client = new Client(authClient);
      const myuser = await client.users.findMyUser();
      const mybookmarks = await client.bookmarks.getUsersIdBookmarks("108667883")
      return {
        props: {
          success: true,
          error: null,
          bookmarks: mybookmarks,
          user: myuser,
        }
      }
    } catch (error) {
      console.error("========= major error...", error);
      return {
        props: {
          success: false,
          error: "Major Error!",
        }
      }
    }

  }

  return {
    props: {
      success: false,
      accessToken: null,
      error: "No Response from Twitter API. Please contact support",
    }
  }
}

export default Dashboard
