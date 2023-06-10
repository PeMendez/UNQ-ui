import { View, Text } from "react-native";

export default function Profile() {
    return (
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.title}>Home</Text>
            <Text style={styles.subtitle}>This is the first page of your app.</Text>
            <Link href="/profile">Go to profile</Link>
          </View>
        </View>
  );
}

