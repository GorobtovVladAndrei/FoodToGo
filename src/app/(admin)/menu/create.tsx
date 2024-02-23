import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React from "react";
import Button from "@components/Button";
import { defaultPizzaImage } from "@constants/Images/defaultPizzaImage";
import Colors from "@constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [error, setError] = React.useState("");
  const [image, setImage] = React.useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const resetField = () => {
    setName("");
    setPrice("");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateInput = () => {
    setError("");
    if (!name || !price) {
      setError("Please fill in all fields");
      return false;
    }

    if (name.length < 3) {
      setError("Name must be at least 3 characters long");
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setError("Price must be a number");
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }

    // update product
    resetField();
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    // create product
    resetField();
  };

  const onDelete = () => {
    // delete product
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ],{
      cancelable: true
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update product" : "Create product" }}
      />

      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select image
      </Text>

      <Text style={styles.label}>Product name</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Product price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="$9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>

      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}>
          Delete product
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },
  label: {
    color: "gray",
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default CreateProductScreen;
