import { useTheme } from "@/contexts/theme-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme();

  const clearTrades = async () => {
    Alert.alert(
      "Clear Journal",
      "Delete all saved trades?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("trades");

            Alert.alert(
              "Success",
              "Restart the app to refresh the journal."
            );
          },
        },
      ]
    );
  };

  const isFuturistic =
    theme === "futuristic";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0B1020",
        padding: 20,
        paddingTop: 80,
      }}
    >
      <Text
        style={{
          color: "#00E5FF",
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        ⚙️ Settings
      </Text>

      {/* THEME */}

      <View
        style={{
          backgroundColor: "#151B2E",
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Theme
        </Text>

        <TouchableOpacity
          onPress={() =>
            setTheme("futuristic")
          }
          style={{
            backgroundColor: isFuturistic
              ? "#00E5FF"
              : "#1F2740",
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: isFuturistic
                ? "black"
                : "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            🌌 Futuristic
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setTheme("professional")
          }
          style={{
            backgroundColor: !isFuturistic
              ? "#3B82F6"
              : "#1F2740",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            📊 Professional
          </Text>
        </TouchableOpacity>
      </View>

      {/* JOURNAL */}

      <View
        style={{
          backgroundColor: "#151B2E",
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Journal
        </Text>

        <TouchableOpacity
          onPress={clearTrades}
          style={{
            backgroundColor: "#FF5A5A",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Clear All Trades
          </Text>
        </TouchableOpacity>
      </View>

      {/* ABOUT */}

      <View
        style={{
          backgroundColor: "#151B2E",
          padding: 20,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          About
        </Text>

        <Text style={{ color: "#BBBBBB" }}>
          TradeVault v1.0
        </Text>

        <Text style={{ color: "#BBBBBB" }}>
          Built by Lakhan 🚀
        </Text>
      </View>
    </View>
  );
}