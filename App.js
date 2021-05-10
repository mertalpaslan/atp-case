import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { DataTable, Appbar} from 'react-native-paper'

export default function App() {

  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchData();
  },[])

  const fetchData = async () => {
    await fetch("https://api-pub.bitfinex.com/v2/tickers?symbols=ALL")
    .then((response) => response.json()).then((responseData) => {
    responseData = responseData.filter(item => item[0].substr(-3) == "USD");
    responseData.map(item => item[0] = item[0].slice(1, -3))
    setData(responseData)});
  }

  return (
    <View>
    <Appbar.Header>
      <Appbar.Content title="Cryptocurrency Explorer - ATP" subtitle="Mert Alpaslan" />
      <Appbar.Action icon="refresh" onPress={fetchData}/>
    </Appbar.Header>
      <DataTable>
      <DataTable.Header>
      <DataTable.Title>Coin </DataTable.Title>
      <DataTable.Title numeric>Last Price</DataTable.Title>
      <DataTable.Title numeric>24H Change</DataTable.Title>
    </DataTable.Header>
      <FlatList data={data} onRefresh={() => fetchData()} refreshing={isFetching} keyExtractor={item => item[0]} renderItem={({item}) =>
                    
                            <DataTable.Row>
                            <DataTable.Cell>{item[0]}</DataTable.Cell>
                            <DataTable.Cell numeric>{item[1]} $ </DataTable.Cell>
                            <DataTable.Cell numeric >
                              <Text style={item[6] > 0 ? {color: 'green'} : {color: 'red'}}>{item[6]} %</Text>
                              </DataTable.Cell>
                          </DataTable.Row>
                    }/>
  </DataTable>
    </View>
  );
}


