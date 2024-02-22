import Colors from '@/src/constants/Colors';
import { StyleSheet, Text, View, Image } from 'react-native';

export const ProductListItem = ({product}) => {
  return(
    <View style={styles.container}>
      <Image source={{ uri: product.image}} style={styles.image} />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 30,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  }

});
