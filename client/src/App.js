import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./store";
import MainNavigator from "./navigator/MainNavigator";
import "./App.css";

const { store, persistor } = configureStore();

const App = () => {
  return (
    <div className="app">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
