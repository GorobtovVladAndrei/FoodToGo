import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

function ProductDetailsScreen() {

  const { id } = useLocalSearchParams();

  return (
    <View>
        <Text style={styles.text}>Test for : {id}</Text>
        <Stack.Screen 
        options={{title: "Details: " + id}}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default ProductDetailsScreen;