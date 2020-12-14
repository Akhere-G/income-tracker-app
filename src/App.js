import React from "react";
import { Switch, Route } from "react-router-dom";
import { AppProvider } from "./context";
import { About, Contact, Home, Error } from "./pages";
import { Header, Footer } from "./components";
import styles from "./App.module.css";
import { reducer } from "./reducer";

const stateKey = "wsdvbnjuytfcvhjiuytr";

const getInitialState = () => {
  const initalState = JSON.parse(localStorage.getItem(stateKey));
  if (initalState === null) {
    return {
      balance: 0,
      income: 0,
      expenses: 0,
      transactions: [],
    };
  }
  const transactions = initalState.transactions;
  const balance = initalState.balance;
  const income = initalState.income;
  const expenses = initalState.expenses;

  return {
    transactions,
    balance,
    income,
    expenses,
  };
};
const App = () => {
  return (
    <AppProvider
      initialState={getInitialState()}
      reducer={reducer}
      storageKey={stateKey}
    >
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/contact'>
              <Contact />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
            <Route path='*'>
              <Error />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
};

export default App;
