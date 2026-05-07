import { add } from "@/redux/cartSlice";
import { useEffect, useState } from "react";
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
function screen1() {
  const [state, setState] = useState([]);
  const [show, setShow] = useState(false);
  const [vis, setVis] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  async function getProjects() {
    const res = await fetch("https://rohitpidishetty.github.io/NFRAC_Projects/Projects.json");
    const data = await res.json();
    var collec = [];
    Object.keys(data).forEach((year) => {
      Object.keys(data[year]).forEach((d) => {
        collec.push(data[year][d]);
      });
    });
    setState(collec);
    setShow(true);
  }

  useEffect(() => { getProjects(); }, []);


  const dispatch = useDispatch();

  return (
    <View style={styles.container}>

      <Modal
        visible={vis}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVis(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Image
                  source={{ uri: selectedItem.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalDesc}>{selectedItem.description}</Text>

                <View style={{
                  display: "flex",
                  flexDirection: "row",
                  width:"100%",
                 justifyContent:"space-around"
                }}>


                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setVis(false)}
                  >
                    <Text style={{ color: 'white' }}>Close</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => {
                      dispatch(add(selectedItem));
                      alert("Added");
                      setVis(false);
                    }}
                  >
                    <Text style={{ color: 'white' }}>Add to cart</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {show && (
        <FlatList
          data={state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                setSelectedItem(item);
                setVis(true);
              }}
            >
              <Text style={styles.titleText}>{item.title.split(".")[1]}</Text>

            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  card: { backgroundColor: 'white', padding: 15, margin: 10, borderRadius: 10 },
  titleText: { fontWeight: 'bold', fontSize: 16 },
  listImage: { width: '100%', height: 100, borderRadius: 5, marginTop: 10 },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalImage: { width: '100%', height: 200, borderRadius: 10 },
  modalDesc: { marginVertical: 15, textAlign: 'center' },
  closeBtn: { backgroundColor: '#2196F3', padding: 10, borderRadius: 5 }
});

export default screen1;