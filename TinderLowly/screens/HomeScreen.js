import React, { useEffect, useRef, useState } from "react";
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
import Toast from "react-native-toast-message";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { generateId } from "../libs/helpers";

// const users = [
//   {
//     id: 1,
//     firstName: "Jim",
//     lastName: "Brown",
//     occupation: "Football player",
//     picture: "JimBrown.jpg",
//     age: 87,
//   },
//   {
//     id: 2,
//     firstName: "Jimmy",
//     lastName: "Buffett",
//     occupation: "Singer and songwriter",
//     picture: "JimmyBuffett.jpg",
//     age: 77,
//   },
//   {
//     id: 3,
//     firstName: "Malcolm",
//     lastName: "X",
//     occupation: "Civil rights activist",
//     picture: "MalcolmX.jpg",
//     age: 40,
//   },
//   {
//     id: 4,
//     firstName: "Harrison",
//     lastName: "Ford",
//     occupation: "Hollywood's leading men",
//     picture: "HarrisonFord.jpg",
//     age: 81,
//   },
// ];

const HomeScreen = ({ navigation, route }) => {
  const { user, logOut } = useAuth();
  const [profilexist, setProfilexist] = useState(route?.params?.profilexist);
  const [users, setUsers] = useState([]);
  const swipeRef = useRef(null);

  useEffect(() => {
    if (profilexist) {
      const querySnapshot = async () => {
        const passes = await getDocs(
          collection(db, "users", user.id, "passes")
        ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
        const match = await getDocs(
          collection(db, "users", user.id, "match")
        ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

        const data = await getDocs(
          query(
            collection(db, "users"),
            where("id", "not-in", [...passes, ...match, user.id])
          )
        );
        data.forEach((doc) => {
          setUsers((state) => [...state, doc.data()]);
        });
      };
      querySnapshot();
    } else {
      getDoc(doc(db, "users", user.id)).then((shapshot) => {
        if (shapshot.exists()) setProfilexist(true);
        else navigation.navigate("ModalScreen");
      });
    }
  }, [profilexist, route]);

  const swipedLeft = async (index) => {
    const targetUser = users[index];
    await setDoc(doc(db, "users", user.id, "passes", targetUser.id), targetUser)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Passes.",
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Something went wrong, try late.",
        });
      });
  };
  const swipedRight = async (index) => {
    const targetUser = users[index];
    const snapshot = await getDoc(
      doc(db, "users", targetUser.id, "match", user.id)
    );

    if (snapshot.exists()) {
      await setDoc(
        doc(db, "users", user.id, "match", targetUser.id),
        targetUser
      )
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Match",
          });
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: "Something went wrong, try late.",
          });
        });

      // AND create Matches between users
      await setDoc(doc(db, "matches", generateId(user.id, targetUser.id)), {
        users: {
          [user.id]: user,
          [targetUser.id]: targetUser,
        },
        usersMatched: [user.id, targetUser.id],
        timestamp: serverTimestamp(),
      })
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Pair created",
          });
          navigation.navigate("MatchScreen", {
            user,
            targetUser,
          });
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: "Something went wrong, try late.",
          });
        });
    } else {
      await setDoc(
        doc(db, "users", user.id, "match", targetUser.id),
        targetUser
      )
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Match",
          });
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: "Something went wrong, try late.",
          });
        });
    }
  };

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
      <View className="-mt-6 relative">
        <Swiper
          ref={swipeRef}
          stackSize={users.length ? users.length : 1}
          verticalSwipe={false}
          animateCardOpacity
          overlayLabels={{
            left: {
              title: "PASS",
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
          onSwipedLeft={(index) => swipedLeft(index)}
          onSwipedRight={(index) => swipedRight(index)}
          backgroundColor="#4FD0E9"
          className="bg-transparent"
          cards={users}
          renderCard={(user) => {
            return user ? (
              <View
                key={user.id}
                className="relative bg-white h-3/4 rounded-xl"
              >
                <Image
                  source={
                    user.picture.indexOf("https") != -1
                      ? { uri: user.picture }
                      : require(`../assets/${user.picture}`)
                  }
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
            ) : (
              <View
                className="relative bg-white h-3/4 rounded-xl justify-center items-center"
                style={styles.cardShadow}
              >
                <Text className="font-bold pb-5">No more profiles.</Text>
                <Image
                  className="h-20 w-20"
                  height={100}
                  width={100}
                  source={require("../assets/smile-sad.png")}
                />
              </View>
            );
          }}
        />
      </View>
      {/* content end */}

      <View className=" flex-row justify-evenly relative">
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
