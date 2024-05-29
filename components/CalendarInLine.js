import {
  StyleSheet,
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
import Week from "./Week";

moment.locale("fr");

export default function CalendarInline({ selectedDate, setSelectedDate }) {
  const swiper = useRef();
  const [week, setWeek] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const weeks = useMemo(() => {
    const start = moment(selectedDate, "YYYY-MM-DD")
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
  }, [week, selectedDate]);

  return (
    <SafeAreaView>
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
              setSelectedDate(
                moment(selectedDate).add(newIndex, "week").toDate()
              );
              swiper.current.scrollTo(1, false);
            }, 100);
          }}
        >
          {weeks.map((dates, i) => {
            return (
              <Week
                key={i}
                dates={dates}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            );
          })}
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
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
});
