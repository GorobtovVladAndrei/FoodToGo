import { View } from "react-native";
import React from "react";
import Button from "@components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@providers/AuthProvider";
import { supabase } from "@lib/supabase";
import LoadingAnimation from "@components/LoadingAnimation";

const index = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return <LoadingAnimation text="Loading interface.." />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  if (!isAdmin) {
    return <Redirect href={"/(tabs)"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(tabs)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;
