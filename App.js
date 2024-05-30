import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import DocumentScreen from "./screens/DocumentScreen";
import AppointmentScreen from "./screens/AppointmentScreen";
import SettingScreen from "./screens/SettingScreen";
import ChangeContactScreen from "./screens/ChangeContactScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SettingStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const store = configureStore({
  reducer: { user },
});

function SettingStackScreen() {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ title: "Paramètres", headerShown: false }}
      />
      <SettingStack.Screen
        name="ChangeContact"
        component={ChangeContactScreen}
        options={{ tabBarLabel: "Mon profil!", headerShown: false }}
      />
    </SettingStack.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Document") {
            iconName = "file";
          } else if (route.name === "Appointment") {
            iconName = "calendar-check-o";
          } else if (route.name === "Setting") {
            iconName = "gears";
          }
          return <FontAwesome name={iconName} size={25} color={color} />;
        },

        tabBarActiveTintColor: "#020024",
        tabBarInactiveTintColor: "white",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#067D5D",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Document" component={DocumentScreen} />
      <Tab.Screen name="Appointment" component={AppointmentScreen} />
      <Tab.Screen name="Setting" component={SettingStackScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
        <Stack.Screen name="ChangeContact" component={ChangeContactScreen} />
      </NavigationContainer>
    </Provider>
  );
}
