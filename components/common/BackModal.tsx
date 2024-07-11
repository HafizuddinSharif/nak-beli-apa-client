import { COLORS } from "@/constants";
import { Modal, Text, StyleSheet, View, Alert, Pressable } from "react-native";

const BackModal = ({ modalVisible, setModalVisible, router }: any) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {`Are you sure you want to go back? \n All edit will be lost`}
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              width: 250,
            }}
          >
            <Pressable
              style={[styles.button, styles.buttonClose, { flex: 1 }]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Let me stay</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose, { flex: 1 }]}
              onPress={() => {
                setModalVisible(modalVisible);
                router.back();
              }}
            >
              <Text style={styles.textStyle}>Go back</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: COLORS.secondary,
  },
  buttonClose: {
    backgroundColor: COLORS.secondary,
  },
  textStyle: {
    color: COLORS.black,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default BackModal;
