import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Welcome" }} />
        <Stack.Screen name="screen1" options={{ title: "Projects" }} />
        <Stack.Screen name="text" options={{ title: "Plus" }} />
        <Stack.Screen name="text2" options={{ title: "Minus" }} />
        <Stack.Screen name="cart" options={{ title: "Cart" }} />
      </Stack>
    </Provider>
  );
}
