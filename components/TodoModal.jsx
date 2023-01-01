import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { colors } from "../Colors";

export default function TodoModal({ setListVisibility, listVisibility, item }) {
  const renderTodo = (item) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity>
          <Ionicons
            name={item.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color={colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              color: colors.black,
              textDecorationLine: item.completed ? "line-through" : "none",
              color: item.completed ? colors.gray : colors.black,
            },
          ]}
        >
          {item.title}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{ top: 15, right: -160 }}
        onPress={() => setListVisibility(false)}
      >
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>

      <View
        style={[
          styles.section,
          styles.header,
          { borderBottomColor: item.color },
        ]}
      >
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.taskCount}>
            {item.completedCount} of {item.taskCount} tasks
          </Text>
        </View>
      </View>

      <View style={[styles.section, { flex: 3 }]}>
        <FlatList
          data={item.todos}
          renderItem={({ item }) => renderTodo(item)}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <KeyboardAvoidingView
        style={[styles.section, styles.footer]}
        behavior="padding"
      >
        <TextInput style={[styles.input, { borderColor: item.color }]} />
        <TouchableOpacity
          style={[styles.addTodo, { backgroundColor: item.color }]}
        >
          <AntDesign name="plus" size={16} color={colors.white} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 6,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
});
