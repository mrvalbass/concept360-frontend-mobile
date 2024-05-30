import { StyleSheet, Text, View } from "react-native";

import { useState, useEffect, useMemo } from "react";

import { useSelector } from "react-redux";

import moment from "moment";
import "moment/locale/fr";
import UserProgram from "./UserProgram";

export default function ProgramCard({ selectedDate, navigation }) {
  const user = useSelector((state) => state.user.value);
  const [userProgramsData, setUserProgramsData] = useState(null);

  useEffect(() => {
    (async () => {
      const programsData = await fetch(
        `https://concept360-backend-five.vercel.app/programs/user/${
          user._id
        }/${moment(selectedDate).unix()}`
      ).then((r) => r.json());
      setUserProgramsData(programsData.userPrograms);
    })();
  }, [selectedDate]);

  const userPrograms = useMemo(() => {
    if (userProgramsData) {
      return userProgramsData.map((userProgram, i) => {
        return (
          <UserProgram
            key={i}
            userProgram={userProgram}
            navigation={navigation}
          />
        );
      });
    }
  }, [userProgramsData]);

  return <View style={styles.container}>{userPrograms}</View>;
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
