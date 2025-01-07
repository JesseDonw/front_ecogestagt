import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUp() {
    const router = useRouter();

    const handleRegister = () => {
        router.replace('/home');  // Redirection vers la page principale
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text>Créer un compte</Text>
            <TextInput placeholder="Nom" style={{ borderWidth: 1, marginVertical: 10 }} />
            <TextInput placeholder="Email" style={{ borderWidth: 1, marginVertical: 10 }} />
            <TextInput placeholder="Mot de passe" secureTextEntry style={{ borderWidth: 1, marginVertical: 10 }} />
            <Button title="S'inscrire" onPress={handleRegister} />
        </View>
    );
}
