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
import React, { useEffect, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { colors } from "../Colors";

export default function TodoModal({ setListVisibility, updateItem, item }) {
  const [chunk, setChunk] = useState(item.todos);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    updateItem(chunk);
  }, [chunk]);

  const createTodo = (todo) => {
    setChunk([
      ...chunk,
      {
        id: Date.now() % 1000,
        title: todo,
        completed: false,
      },
    ]);
    setTodo("");
  };

  const taskUpdate = (id) => {
    setChunk((curr) =>
      curr.map((obj) => {
        if (obj.id === id) {
          return { ...obj, completed: !obj.completed };
        }
        return obj;
      }),
    );
  };

  const renderTodo = (item) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => taskUpdate(item.id)}>
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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
            data={chunk}
            renderItem={({ item }) => renderTodo(item)}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, { borderColor: item.color }]}
            onChangeText={(text) => setTodo(text)}
            value={todo}
          />
          <TouchableOpacity
            style={[styles.addTodo, { backgroundColor: item.color }]}
            onPress={() => createTodo(todo)}
          >
            <AntDesign name="plus" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
