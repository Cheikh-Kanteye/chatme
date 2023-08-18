import {
  ColorValue,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { R, SPACING } from "@misc/const";
import { AntDesign } from "@expo/vector-icons";
import isColorDark from "@utils/isColorDark";

interface PoollingProps {
  color: Animated.SharedValue<ColorValue>;
}

const AnimatedInput = Animated.createAnimatedComponent(TextInput);
const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);

type Answer = { selected: boolean; value: string };
type Answers = { selected: boolean; value: string }[] | null;

const Poolling = ({ color }: PoollingProps) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [select, setSelect] = useState<Answer>(null);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<Answers>([]);
  const maxLength = 50;

  const addAnswers = () => {
    if (debouncedValue === "") setAnswers((a) => [...a]);
    else setAnswers((a) => [...a, { selected: false, value: debouncedValue }]);
    setValue("");
  };

  const accent = useAnimatedStyle(() => ({
    color: withTiming(color.value as never),
  }));
  const border = useAnimatedStyle(() => ({
    borderColor: withTiming(color.value as never),
  }));

  const handleLongPress = (item: Answer) => {
    setSelect(item);
  };

  const handleRemove = (item: Answer) => {
    const newAnswers = answers.filter((answer) => answer !== item);
    setAnswers(newAnswers);
    setSelect(null);
  };

  const btnStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(color.value as never),
  }));
  const labelStyle = useAnimatedStyle(() => ({
    color: isColorDark(color.value) ? withTiming("white") : withTiming("black"),
  }));

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 1000); // Adjust the debounce time as needed

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [value]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "android" ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Animated.Text style={[styles.title, accent]}>Ask</Animated.Text>
        <AnimatedInput
          placeholder="Ask questions?"
          multiline
          value={question}
          onChangeText={(text) => {
            if (text.length < maxLength) setQuestion(text);
          }}
          style={[styles.textTarea, accent]}
        />
        <Animated.Text
          style={[styles.text, accent, { alignSelf: "flex-end", padding: 10 }]}
        >
          {`${question.length} / ${maxLength}`}
        </Animated.Text>
        {answers.length > 0 &&
          answers.map((anw, key) => {
            return (
              <TouchableOpacity
                onLongPress={() => handleLongPress(anw)}
                onPress={() => handleRemove(anw)}
                style={styles.inputContainer}
                key={key}
              >
                <Animated.View style={[styles.index, border]}>
                  <Animated.Text style={[styles.text, accent]}>
                    {key + 1}
                  </Animated.Text>
                </Animated.View>
                <View style={{ flex: 1 }}>
                  <Animated.Text style={[styles.text, accent]}>
                    {anw.value}
                  </Animated.Text>
                </View>

                {anw === select && (
                  <TouchableOpacity style={styles.rmBtn}>
                    <AnimatedIcon name="closecircle" size={20} style={accent} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          })}
        <View style={styles.inputContainer}>
          <Animated.View style={[styles.index, border]}>
            <Animated.Text style={[styles.text, accent]}>
              {answers.length + 1}
            </Animated.Text>
          </Animated.View>
          <AnimatedInput
            value={value}
            onChangeText={setValue}
            placeholder="Ask questions?"
            style={[styles.input, accent]}
          />
        </View>
        <TouchableOpacity onPress={addAnswers} style={styles.btn}>
          <Animated.Text style={[styles.text, accent]}>+ Add</Animated.Text>
        </TouchableOpacity>
        <AnimatedBtn style={[styles.submitBtn, btnStyle]}>
          <Animated.Text style={[styles.text, labelStyle]}>
            Send Pool
          </Animated.Text>
        </AnimatedBtn>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Poolling;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  textTarea: {
    minHeight: 100,
    width: "100%",
    backgroundColor: "white",
    borderRadius: R,
    textAlignVertical: "top",
    padding: SPACING,
    marginTop: SPACING,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: R,
    height: 45,
    marginTop: SPACING / 2,
    paddingHorizontal: 10,
    gap: 8,
  },
  input: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  index: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 14, fontWeight: "bold" },
  btn: {
    paddingHorizontal: SPACING * 1.2,
    paddingVertical: 10,
    backgroundColor: "white",
    alignSelf: "flex-end",
    borderRadius: R,
    marginVertical: SPACING,
  },
  rmBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  submitBtn: {
    width: "100%",
    height: 45,
    borderRadius: R,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
