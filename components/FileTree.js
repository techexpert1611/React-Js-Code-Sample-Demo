import data from "./data.json";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const getIndicator = (nodeType, isexpand) => {
  if (nodeType === "folder") {
    if (isexpand) {
      return (
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../assets/folder-open.png")}
        />
      );
    } else {
      return (
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../assets/folder.png")}
        />
      );
    }
  } else {
    return (
      <Image
        style={{ height: 15, width: 15 }}
        source={require("../assets/file.png")}
      />
    );
  }
};

const handleExpanded = (data, id) => {
  if (data[id].type === "folder") {
    if (data[id].expand === undefined) {
      return Object.assign(data[id], { expand: false });
    }
    return Object.assign(data[id], { expand: data[id].expand });
  } else {
    return Object.assign(data[id], {});
  }
};

const Tree = ({ data, level }) => {
  const [random, setrandom] = useState(Math.random());
  const handleNodePressed = (node) => {
    if (data[node].type === "folder") {
      const expandValue = data[node].expand;
      data[node].expand = !expandValue;
      setTimeout(() => {
        setrandom(Math.random());
      }, 100);
    }
  };
  return (
    <View>
      {data &&
        Object.keys(data).map((key, i) => {
          const isExpanded = handleExpanded(data, key);
          return (
            <View key={i}>
              <TouchableOpacity onPress={() => handleNodePressed(key)}>
                <Text
                  style={{
                    marginLeft: 25 * level,
                    fontSize: 18,
                  }}
                >
                  {getIndicator(data[key].type, data[key].expand)}
                  {"  "}
                  {key}
                </Text>
                {data[key].expand && data[key].children && (
                  <Tree data={data[key].children} level={level + 1} />
                )}
              </TouchableOpacity>
            </View>
          );
        })}
    </View>
  );
};

export default function FileTree() {
  return (
    <View>
      <Tree data={data} level={0} />
    </View>
  );
}
