import React from "react";

interface AppContextValue {
    twitterAuthClient: any
}

const defaultAppContext: AppContextValue = {
    twitterAuthClient: null
}

const AppContext = React.createContext<AppContextValue>(defaultAppContext);

export default AppContext;
