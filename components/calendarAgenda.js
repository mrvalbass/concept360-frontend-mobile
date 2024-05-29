import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { useState, useRef, useMemo } from "react";

import moment from "moment";
import "moment/locale/fr";

import Swiper from "react-native-swiper";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import CalendarModal from "./CalendarModal";

const { width } = Dimensions.get("screen");

export default function CalendarInline({}) {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Configuration de Moment.js pour utiliser le français
  moment.locale("fr");

  const weeks = useMemo(() => {
    const start = moment(value, "YYYY-MM-DD")
      .add(week, "weeks")
      .startOf("week");
    return [-1, 0, 1].map((adj) => {
      return [...Array(7)].map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");
        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
          month: date.format("MMMM"),
        };
      });
    });
  }, [week, value]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.month}>
          {weeks[1][0].month[0].toUpperCase() + weeks[1][0].month.slice(1)}
        </Text>
      </View>
      <View style={styles.picker}>
        <Swiper
          index={1}
          ref={swiper}
          loop={false}
          showsPagination={false}
          onIndexChanged={(ind) => {
            if (ind === 1) {
              return;
            }
            setTimeout(() => {
              const newIndex = ind - 1;
              const newWeek = week + newIndex;
              setWeek(newWeek);
              setValue(moment(value).add(newIndex, "week").toDate());
              swiper.current.scrollTo(1, false);
            }, 100);
          }}
        >
          {weeks.map((dates, index) => (
            <View style={styles.itemRow} key={index}>
              {dates.map((item, dateIndex) => {
                const isActive =
                  value.toDateString() === item.date.toDateString();
                return (
                  <TouchableWithoutFeedback
                    key={dateIndex}
                    onPress={() => setValue(item.date)}
                  >
                    <View
                      style={[
                        styles.item,
                        isActive && {
                          backgroundColor: "#020024",
                          borderColor: "#020024",
                          borderWidth: 1,
                          borderRadius: 25,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.itemWeekday,
                          isActive && { color: "#fff" },
                        ]}
                      >
                        {item.weekday}
                      </Text>
                      <Text
                        style={[
                          styles.itemDate,
                          isActive && {
                            color: "#fff",
                          },
                        ]}
                      >
                        {item.date.getDate()}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          ))}
        </Swiper>
      </View>
      <View style={{ paddingLeft: 20 }}>
        <TouchableOpacity>
          <FontAwesome
            name="caret-down"
            color={"white"}
            size={20}
            onPress={() => setShowModal(true)}
          />
        </TouchableOpacity>
      </View>
      <View>
        {showModal && (
          <CalendarModal
            setShowModal={setShowModal}
            showModal={showModal}
            setValue={setValue}
            value={value}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  month: {
    color: "white",
    fontSize: 20,
    alignSelf: "flex-end",
    marginRight: 35,
  },

  picker: {
    maxHeight: 75,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,

    flexDirection: "column",
    alignItems: "center",
  },

  itemRow: {
    width: width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },

  itemWeekday: {
    fontSize: 13,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 4,
  },

  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
});
