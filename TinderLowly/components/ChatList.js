import React, { useEffect, useState } from "react";

import { FlatList, Text, View } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  
  useEffect(() => {
    const getMatches = async () => {
      const data = await getDocs(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user.id)
        )
      );
      data.forEach((doc) => {
        setMatches((state) => [...state, { id: doc.id, ...doc.data() }]);
      });
    };
    getMatches();
  }, []);

  return matches.length > 0 ? (
    <FlatList
      className="h-full"
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow item={item} chatId={matches.id} />}
    />
  ) : (
    <View className="p-5">
      <Text className="text-center text-lg">No matches at the moment.</Text>
    </View>
  );
};

export default ChatList;
