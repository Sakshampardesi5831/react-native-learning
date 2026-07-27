import { Image, StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Image
        source={
          { uri: "https://wallpapershome.com/images/pages/pic_h/29505.jpg" }
        }
        style={{ width: 100, height: 100 }}
      />
      <TextInput
        placeholder="Enter your name"
        //style={styles.textInput}
        style={{ borderWidth: 1, borderColor: "#ccc" }}
      />
      <Button
        title="Submit"
        onPress={() => console.log("Button pressed")}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({

})