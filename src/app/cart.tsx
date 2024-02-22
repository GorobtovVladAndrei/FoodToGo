import { View, Text, Platform, FlatList, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@providers/CartProvider";
import CartListItem from "@components/CartListItem";
import Button from "@components/Button";

const CartScreen = () => {
  const { items, total } = useCart();

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.total}>${total.toFixed(2)}</Text>
        </View>
        <Button text="Checkout" />
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

const styles = StyleSheet.create({
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  total: {
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "gainsboro",
  },
});

export default CartScreen;
