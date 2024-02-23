import { View, Text, StyleSheet, Image} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { defaultPizzaImage } from "@constants/Images/defaultPizzaImage";
// import { useProduct } from '@api/products';
import products from "@assets/data/products";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }


  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>{product.name}</Text>
      <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
