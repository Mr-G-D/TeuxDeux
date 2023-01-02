import {
  Modal,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../Colors";
import TodoModal from "./TodoModal";

const TodoList = ({ list, updateList }) => {
  const [listVisibility, setListVisibility] = useState(false);
  const [item, setItem] = useState(list);

  const updateItem = (data) => {
    setItem({ ...item, todos: data });
  };

  useEffect(() => {
    updateList(item);
  }, [item]);

  const completedCount = item.todos.filter((todo) => todo.completed).length;
  const remainingCount = item.todos.length - completedCount;

  return (
    <View>
      <Modal animationType="slide" visible={listVisibility}>
        <TodoModal
          item={item}
          updateItem={updateItem}
          setListVisibility={setListVisibility}
        />
      </Modal>
      <TouchableOpacity
        style={[styles.listContainer, { backgroundColor: item.color }]}
        onPress={() => setListVisibility(!listVisibility)}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {item.name}
        </Text>

        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subtitle}>Remaining</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
});
