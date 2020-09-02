import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const expandHeight = Dimensions.get('window').height * 0.8;
const expandPadding = Dimensions.get('window').height * 0.02;

const ListItem = (props) => {
  const {id, name, price, description, selected} = props.item;

  return (
    <TouchableOpacity onPress={props.click.bind(this, id)} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      {selected ? (
        <View
          style={{
            ...styles.body,
            height: expandHeight,
          }}>
          <Text>{description}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: '5%',
  },
  header: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#ccc',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: '2%',
    paddingVertical: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -7,
  },
  body: {
    paddingHorizontal: '2%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  price: {
    fontSize: 20,
  },
});

export default React.memo(ListItem);
