import React, { useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Image,
} from "react-native";
import useAuth from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

const users = [
  {
    id: 1,
    firstName: "Jim",
    lastName: "Brown",
    occupation: "Football player",
    picture: "JimBrown.jpg",
    age: 87,
  },
  {
    id: 2,
    firstName: "Jimmy",
    lastName: "Buffett",
    occupation: "Singer and songwriter",
    picture: "JimmyBuffett.jpg",
    age: 77,
  },
  {
    id: 3,
    firstName: "Malcolm",
    lastName: "X",
    occupation: "Civil rights activist",
    picture: "MalcolmX.jpg",
    age: 40,
  },
  {
    id: 4,
    firstName: "Harrison",
    lastName: "Ford",
    occupation: "Hollywood's leading men",
    picture: "HarrisonFord.jpg",
    age: 81,
  },
];

const HomeScreen = ({ navigation }) => {
  const { user, logOut } = useAuth();
  const swipeRef = useRef(null);

  return (
    <SafeAreaView>
      {/* Header */}
      <View className="relative flex-row items-center justify-between px-5">
        <TouchableOpacity onPress={logOut}>
          <Image
            source={{ uri: user.picture }}
            className="h-10 w-10 rounded-full"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ModalScreen")}>
          <Image
            source={require("../assets/tinder-logo.png")}
            className="h-14 w-14 rounded-full"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
          <Ionicons name="chatbubble-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/* Header end */}

      {/* content */}
      <View className="flex-1 -mt-6 relative">
        <Swiper
          ref={swipeRef}
          stackSize={users.length}
          verticalSwipe={false}
          animateCardOpacity
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "green",
                },
              },
            },
          }}
          onSwipedLeft={() => {}}
          onSwipedRight={() => {}}
          backgroundColor="#4FD0E9"
          className="bg-transparent"
          cards={users}
          renderCard={(user) => {
            return (
              <View
                key={user.id}
                className="relative bg-white h-3/4 rounded-xl"
              >
                <Image
                  source={require(`../assets/${user.picture}`)}
                  className="absolute top-0 h-full w-full rounded-xl object-cover"
                />

                <View
                  className="bg-white w-full h-20 absolute bottom-0 flex-row justify-between items-center px-6 py-2
                rounded-b-xl"
                  style={styles.cardShadow}
                >
                  <View>
                    <Text className="font-bold text-xl">
                      {user.firstName} {user.lastName}
                    </Text>
                    <Text className="">{user.occupation}</Text>
                  </View>
                  <Text className="font-bold text-2xl">{user.age}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      {/* content end */}

      <View className="flex-1 flex-row justify-evenly relative">
        <TouchableOpacity
          className="items-center justify-center rounded-full w-12 h-12 bg-red-200"
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center rounded-full w-12 h-12 bg-green-200"
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.2,
    elevation: 2,
  },
});

export default HomeScreen;
