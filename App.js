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
  console.log('selectedId', selectedId);

  // data with selection
  let selectedIndex;
  const dataWithSelection = data.map((item, index) => {
    if (item.selected) {
      const updatedItem = {...item};
      delete updatedItem.selected;
      return updatedItem;
    } else if (item.id === selectedId) {
      selectedIndex = index;
      return {...item, selected: true};
    } else {
      return item;
    }
  });

  // array with detail about which is selected
  const selected = data.map((item) => item.id === selectedId);

  const onClickedHandler = React.useCallback((id) => {
    setSelectedId(id);
  }, []);

  if (selectedIndex !== null && myFlatList.current) {
    if (selectedIndex !== -1) {
      myFlatList.current.scrollToOffset({
        offset: selectedIndex * 49.8,
      });
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <FlatList
          ref={myFlatList}
          contentContainerStyle={styles.flatListContainer}
          data={dataWithSelection}
          renderItem={({item, index}) => {
            return <ListItem item={item} click={onClickedHandler} />;
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingTop: '5%',
  },
});

export default App;
