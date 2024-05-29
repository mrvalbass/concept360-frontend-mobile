import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import FloatingTextInput from "../components/FloatingTextInput";

export default function ChangeContactScreen({ navigation }) {
  const updateValue = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <SafeAreaView>
      <View>
        <FloatingTextInput
          value={formData.firstName}
          updateValue={updateValue}
          label="Prénom"
          name="firstName"
        />
        <FloatingTextInput
          value={formData.lastName}
          updateValue={updateValue}
          label="Nom"
          name="lastName"
        />
        <FloatingTextInput
          value={formData.email}
          updateValue={updateValue}
          label="E-mail"
          name="email"
        />
        <FloatingTextInput
          value={formData.password}
          updateValue={updateValue}
          label="Mot de passe"
          name="password"
          secureTextEntry
        />
        <Pressable>
          <Text>Modier mes affaires</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
