import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

const App = () => {
  const ctx = require.context('./app', true, /\.js$/); // Charge toutes les pages
  return <ExpoRoot context={ctx} />;
};

registerRootComponent(App);
