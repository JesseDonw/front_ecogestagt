import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    alert("Mot de passe modifié avec succès !");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ancien mot de passe</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ancien mot de passe"
          style={styles.input}
          secureTextEntry={!showCurrentPassword}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
          <Ionicons
            name={showCurrentPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Nouveau mot de passe</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nouveau mot de passe"
          style={styles.input}
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
          <Ionicons
            name={showNewPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirmez nouveau mot de passe</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Confirmez nouveau mot de passe"
          style={styles.input}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons
            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#28a745",
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
