import React from "react";
import { View, StyleSheet, Text, Dimensions, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackScreenProps } from "../../navigation";
import routes from "../../routes";

interface HomeProps {}

const { height, width } = Dimensions.get("window");

const SPACING = 5;

const Home = ({ navigation }: RootStackScreenProps<"Home">) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Animations</Text>
      </View>

      <FlatList
        data={routes}
        keyExtractor={(item) => `${item.id}`}
        style={styles.ItemContainer}
        numColumns={2}
        renderItem={({ item: { name } }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(name)}
              style={styles.animationItem}
            >
              <Text style={styles.itemText}>{name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: "center",
    padding: 20,
    flexDirection: "row",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  ItemContainer: {
    width: width,
    flexWrap: "wrap",
    paddingHorizontal: SPACING,
  },
  animationItem: {
    width: (width - SPACING * 2) / 2,
    backgroundColor: "orange",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
