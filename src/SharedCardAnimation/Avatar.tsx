import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { avatars } from "../../data";
import { AVATAR_SIZE } from "./constants";
interface AvatarProps {
  isStacked?: boolean;
  style?: {};
}

const Avatar = ({ isStacked, style }: AvatarProps) => {
  let marginLeftValue = isStacked ? -AVATAR_SIZE / 2 : 20;
  return (
    <View style={[style]}>
      <Text style={styles.avatarText}>Your Team</Text>
      <View style={styles.avatarContainer}>
        {avatars.map(({ id, image }, i) => {
          return (
            <Image
              source={image}
              key={id}
              style={[
                styles.avatar,
                { marginLeft: i != 0 ? marginLeftValue : 0 },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: "row",
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    resizeMode: "cover",
  },
  avatarText: {
    color: "white",
    marginBottom: 15,
  },
});

export default Avatar;
