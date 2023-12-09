import { View, Text } from "react-native";
import React, { useState } from "react";
import axios from "axios";

const UserManage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/users");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Text>UserManage</Text>
    </View>
  );
};

export default UserManage;
