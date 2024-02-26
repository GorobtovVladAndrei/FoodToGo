import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

export default function LoadingAnimation({ text = "Loading..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#d9d2d2",
    fontSize: 15,
  },
});
