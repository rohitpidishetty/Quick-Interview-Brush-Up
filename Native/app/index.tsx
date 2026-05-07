import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [data, setData] = useState([
    { id: 1, name: "a", screen: "/screen1" },
    { id: 2, name: "b", screen: "/text" },
    { id: 3, name: "c", screen: "/text2" },
    { id: 4, name: "d", screen: "/cart" },
  ]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "red",
      }}
    >
      <Text>Hello, world!</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderWidth: 2,
          borderColor: "blue",
          position: "absolute",
          bottom: 0,
        }}
      >
        {data.map((e) => {
          return (
            <TouchableOpacity
              onPress={() => {
                router.push(`${e.screen}`);
              }}
              key={e.id}
              style={style.container}
            >
              <Text>{e.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#f9c2f",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    flex: 1,
    width: 100,
    textAlign: "center",
    display: "flex",
    margin: "auto",
    alignItems: "center",
  },
});
