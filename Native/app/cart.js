import { remove } from "@/redux/cartSlice";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

function CartScreen() {
  const items = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  if (!items || items.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No items in cart</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {items.map((item, idx) => (
          <View style={styles.card} key={idx}>
            <View style={styles.cardHeader}>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>

            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => {
                dispatch(remove(item));
                alert('Removed');
              }}
            >
              <Text style={styles.btnText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7', // Apple System Gray 6 (light background makes white cards pop)
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#8E8E93' },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 20,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
  },
  removeBtn: {
    backgroundColor: '#FF3B30', // Apple System Red
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});