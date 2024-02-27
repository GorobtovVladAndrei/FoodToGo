import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderItemListItem from "@components/OrderItemListItem";
import { useOrderDetails } from "@api/orders";
import LoadingAnimation from "@components/LoadingAnimation";
import OrderListItem from "@/src/components/OrderListItem";
import { useUpdateOrderSubscription } from "@/src/api/orders/subscriptions";

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  useUpdateOrderSubscription(id);

  if (!order) {
    return <Text>Order not found</Text>;
  }

  if (isLoading) {
    return <LoadingAnimation text="Loading order.." />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});
