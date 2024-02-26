import { Text, View, FlatList } from "react-native";
import { ProductListItem } from "@components/ProductListItem";
import { useProductList } from "@api/products";
import LoadingAnimation from "@components/LoadingAnimation";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <LoadingAnimation text="Loading products.." />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
