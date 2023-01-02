import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { backgroundColors, colors } from "../Colors";
import { AntDesign } from "@expo/vector-icons";
import { tempData } from "../tempData";

export default function AddListModal({ setModalVisibility, createList }) {
  const [todo, setTodo] = useState({
    name: "",
    color: backgroundColors[0],
  });

  const AddNewList = () => {
    createList(
      (item = {
        id: Date.now() % 1000,
        name: todo.name,
        color: todo.color,
        todos: [],
      }),
    );
    setModalVisibility(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{ position: "absolute", top: 15, right: 20, cursor: "pointer" }}
        onPress={setModalVisibility}
      >
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>

      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>Create Todo List </Text>
        <TextInput
          style={styles.input}
          placeholder="List Name"
          onChangeText={(text) => setTodo({ ...todo, name: text })}
          value={todo}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          {backgroundColors.map((color) => {
            return (
              <TouchableOpacity
                key={color}
                style={[styles.colorSelect, { backgroundColor: color }]}
                onPress={() => setTodo({ ...todo, color: color })}
              />
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.create, { backgroundColor: todo.color }]}
          onPress={AddNewList}
        >
          <Text style={{ color: colors.white, fontWeight: "600" }}>
            Create!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function renderColors() {
  return backgroundColors.map((color) => {
    return (
      <TouchableOpacity
        key={color}
        style={[styles.colorSelect, { background: color }]}
        onPress={() => setTodo({ ...todo, color: color })}
      />
    );
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.black,
    alignSelf: "center",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
