
import {
  Button,
  Text,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { inc } from "../redux/counterSlice";

export default function text() {
  const dispatch = useDispatch();
  const counterState = useSelector((state) => state.counter.value);
  return (
    <View>
      <Text>{counterState}</Text>
      <Button title="+" onPress={() => { dispatch(inc()) }} />
    </View>
  );
}
