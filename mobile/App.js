import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function App() {
  const [title, setTitle] = useState('');
  const sendOrder = async () => {
    await axios.post('https://foodapp-api.azurewebsites.net/api/createOrder', {
      title,
      price: 15,
      vendorId: 'demo-user-id'
    });
    alert('Ordine inviato');
  };
  return (
    <View style={{ padding: 20 }}>
      <Text>Nuovo ordine</Text>
      <TextInput placeholder="Titolo piatto" value={title} onChangeText={setTitle} />
      <Button title="Invia" onPress={sendOrder} />
    </View>
  );
}