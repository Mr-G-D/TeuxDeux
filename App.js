import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "./Colors";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AddListModal from "./components/AddListModal";
import { tempData } from "./tempData";
import TodoList from "./components/TodoList";
import { createData, readData, updateData } from "./firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./db";

export default function App() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await readData("data");
      setData(res);
    };
    getData();
  }, []);

  // useEffect(() => {
  //   const check = async (chunk) => {
  //     try {
  //       const collectionRef = collection(db, "data");
  //       await chunk.forEach((element) => {
  //         addDoc(collectionRef, element);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   check(data);
  // }, [data]);

  const createList = (item) => {
    setData([...data, item]);
    try {
      const collectionRef = collection(db, "data");

      addDoc(collectionRef, item);
    } catch (error) {
      console.log(error);
    }
  };

  const updateList = (item) => {
    setData((curr) =>
      curr.map((obj) => {
        if (obj.name === item.name) {
          return { ...obj, todos: item.todos };
        }
        return obj;
      }),
    );
    try {
      updateData("data", item.id, item);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisibility}
        onRequestClose={() => setModalVisibility(!modalVisibility)}
      >
        <AddListModal
          setModalVisibility={setModalVisibility}
          createList={createList}
        />
      </Modal>

      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Teux{" "}
          <Text
            style={{
              fontWeight: "300",
              color: colors.blue,
            }}
          >
            Deux
          </Text>
        </Text>
        <View style={styles.divider} />
      </View>

      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() => setModalVisibility(true)}
        >
          <AntDesign name="plus" size={16} color={colors.blue} />
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{ height: 275, paddingLeft: 0 }}>
        <FlatList
          data={data}
          key={(item) => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TodoList list={item} updateList={updateList} />
          )}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightblue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightblue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
