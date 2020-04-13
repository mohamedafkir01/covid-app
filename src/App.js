import React, { useEffect, useReducer, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { getData } from './api';
import { Regions, Statistics, Title, Toggles } from './components';
import { Spinner } from './components/common';
import { AppContext, AppReducer, initialState } from './context';
import { dark, GlobalStyles, light } from './theme';
function App() {
  const [data, setData] = useState(null);
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    // Get the data from the url
    getData().then((data) => setData(data));
  }, []);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <ThemeProvider theme={state.theme === 'light' ? light : dark}>
        <GlobalStyles></GlobalStyles>
        <Title />
        <Toggles />

        {data ? (
          <>
            <Statistics data={data} />
            {/* //TODO: Toggle regions */}
            {data.regions && <Regions regions={data.regions} />}
          </>
        ) : (
          <Spinner />
        )}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
