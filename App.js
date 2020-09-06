/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import faker from 'faker';

import ListItem from './ListItem';

const dummyData = [];
for (let i = 0; i <= 100; i++) {
  dummyData.push({
    id: Math.random() * 10000 + '',
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
  });
}

const App: () => React$Node = () => {
  const [data, setData] = useState(dummyData);
  const myFlatList = useRef(null);
  const [selectedId, setSelectedId] = useState(-1);

  const onClickedHandler = React.useCallback((id) => {
    setSelectedId((prevState) => {
      if (prevState === id) {
        return '-1';
      } else {
        return id;
      }
    });
  }, []);

  // array with detail about which is selected
  let selectedIndex;
  const selected = data.map((item, index) => {
    if (item.id === selectedId) {
      selectedIndex = index;
      return true;
    } else {
      return false;
    }
  });

  if (selectedIndex && selectedIndex !== -1 && myFlatList.current) {
    console.log('scroll now', selectedIndex);
    setTimeout(() => {
      myFlatList.current.scrollToOffset({
        offset: selectedIndex * 49.8,
      });
    }, 100);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <FlatList
          ref={myFlatList}
          contentContainerStyle={styles.flatListContainer}
          data={data}
          renderItem={({item, index}) => {
            return (
              <ListItem
                selected={selected[index]}
                isLast={index === data.length - 1}
                item={item}
                click={onClickedHandler}
              />
            );
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingTop: '5%',
    paddingBottom: '5%',
  },
});

export default App;
