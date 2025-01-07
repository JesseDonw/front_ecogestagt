import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Signin() {
    const router = useRouter();

    const handleSignin = () => {
        router.replace('/home'); 
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text>Connexion</Text>
            <TextInput placeholder="Email" style={{ borderWidth: 1, marginVertical: 10 }} />
            <TextInput placeholder="Mot de passe" secureTextEntry style={{ borderWidth: 1, marginVertical: 10 }} />
            <Button title="Se connecter" onPress={handleSignin} />
            <Button title="Créer un compte" onPress={() => router.push('/auth/signup')} />
        </View>
    );
}
