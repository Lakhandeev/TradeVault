import { themes } from "@/constants/themes";
import { useTheme } from "@/contexts/theme-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Trade = {
  pair: string;
  direction: string;
  rr: number;
  strategy: string;
  date: string;
  notes: string;
};

export default function HomeScreen() {
  const [pair, setPair] = useState("");
  const [rr, setRR] = useState("");
  const [direction, setDirection] = useState("");
  const [date] = useState("");
const [notes, setNotes] = useState("");
  const [trade, setTrades] = useState<Trade[]>([]);

const [strategy, setStrategy] = useState("5PM ORB");

  const { theme } = useTheme();
  const colors = themes[theme];

  useEffect(() => {
    loadTrades();
  }, []);

  useEffect(() => {
    saveTrades();
  }, [trade]);

  const saveTrades = async () => {
    try {
      await AsyncStorage.setItem(
        "trades",
        JSON.stringify(trade)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const loadTrades = async () => {
    try {
      const savedTrades = await AsyncStorage.getItem(
        "trades"
      );

      if (savedTrades) {
        setTrades(JSON.parse(savedTrades));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTrade = () => {
    if (
      pair.trim() === "" ||
      rr.trim() === "" ||
      direction === ""
    ) {
      return;
    }

 const newTrade: Trade = {
  pair,
  direction,
  rr: parseFloat(rr),
  strategy,
  date: new Date().toLocaleString(),
  notes,
};

    setTrades([newTrade, ...trade]);

    setPair("");
    setRR("");
    setDirection("");
    setNotes("");
    setStrategy("5PM ORB");
  };

  const deleteTrade = (indexToDelete: number) => {
    setTrades(
      trade.filter(
        (_, index) => index !== indexToDelete
      )
    );
  };

  const totalTrades = trade.length;

  const wins = trade.filter(
    (trade) => trade.rr > 0
  ).length;

  const losses = trade.filter(
    (trade) => trade.rr <= 0
  ).length;

  const winRate =
    totalTrades > 0
      ? (
          (wins / totalTrades) *
          100
        ).toFixed(1)
      : "0";

  const totalRR = trade
    .reduce((sum, trade) => sum + trade.rr, 0)
    .toFixed(1);

  const bestTrade =
    trade.length > 0
      ? Math.max(
          ...trade.map((trade) => trade.rr)
        )
      : 0;

  const worstTrade =
    trade.length > 0
      ? Math.min(
          ...trade.map((trade) => trade.rr)
        )
      : 0;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
        padding: 20,
        paddingTop: 70,
        paddingBottom: 40,
      }}
    >
      <Text
        style={{
          fontSize: 34,
          fontWeight: "bold",
          color: colors.accent,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        TradeVault 🚀
      </Text>

      {/* DASHBOARD */}

      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 16,
          padding: 18,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: colors.accent,
        }}
      >
        <Text
          style={{
            color: colors.accent,
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          Dashboard
        </Text>

        <Text style={{ color: colors.text }}>
          Total Trades: {totalTrades}
        </Text>

        <Text style={{ color: colors.profit }}>
          Wins: {wins}
        </Text>

        <Text style={{ color: colors.loss }}>
          Losses: {losses}
        </Text>

        <Text style={{ color: colors.text }}>
          Win Rate: {winRate}%
        </Text>

        <Text
          style={{
            color:
              Number(totalRR) >= 0
                ? colors.profit
                : colors.loss,
            marginTop: 10,
            fontWeight: "bold",
          }}
        >
          Total RR: {totalRR}R
        </Text>
        <Text
          style={{ color: colors.profit }}
        >
          Best Trade: {bestTrade}R
        </Text>

        <Text style={{ color: colors.loss }}>
          Worst Trade: {worstTrade}R
        </Text>
      </View>

      {/* INPUTS */}

      <TextInput
        placeholder="Pair (BTCUSDT)"
        placeholderTextColor="#888"
        value={pair}
        onChangeText={setPair}
        style={{
          backgroundColor: colors.card,
          color: colors.text,
          borderRadius: 12,
          padding: 14,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: colors.accent,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setDirection("Long")}
          style={{
            flex: 1,
            backgroundColor:
              direction === "Long"
                ? colors.profit
                : colors.card,
            padding: 15,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color:
                direction === "Long"
                  ? "black"
                  : colors.text,
            }}
          >
            LONG
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setDirection("Short")}
          style={{
            flex: 1,
            backgroundColor:
              direction === "Short"
                ? colors.loss
                : colors.card,
            padding: 15,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            SHORT
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="RR Result (2, -1, 3)"
        placeholderTextColor="#888"
        value={rr}
        onChangeText={setRR}
        keyboardType="numeric"
        style={{
          backgroundColor: colors.card,
          color: colors.text,
          borderRadius: 12,
          padding: 14,
          marginBottom: 15,
          borderWidth: 1,
          borderColor: colors.accent,
        }}
      />
<View
  style={{
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.accent,
  }}
>
  <Picker
    selectedValue={strategy}
    onValueChange={(itemValue) => setStrategy(itemValue)}
    dropdownIconColor={colors.accent}
    style={{
      color: colors.text,
    }}
  >
    <Picker.Item label="5PM ORB" value="5PM ORB" />
    <Picker.Item label="Scalping" value="Scalping" />
    <Picker.Item label="Breakout" value="Breakout" />
    <Picker.Item label="Swing" value="Swing" />
    <Picker.Item
      label="Trend Following"
      value="Trend Following"
    />
    <Picker.Item label="Custom" value="Custom" />
  </Picker>
</View>
<TextInput
  placeholder="Trade Notes"
  placeholderTextColor="#888"
  value={notes}
  onChangeText={setNotes}
  multiline
  style={{
    backgroundColor: colors.card,
    color: colors.text,
    borderRadius: 12,
    padding: 14,
    minHeight: 90,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.accent,
  }}
/>

      <TouchableOpacity
        onPress={addTrade}
        style={{
          backgroundColor: colors.accent,
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "black",
            fontSize: 16,
          }}
        >
          Add Trade
        </Text>
      </TouchableOpacity>

      {/* TRADE CARDS */}

      {trade.map((trade, index) => (
        <View
          key={index}
          style={{
            backgroundColor: colors.card,
            borderRadius: 16,
            padding: 18,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: colors.accent,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  color: colors.accent,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {trade.pair}
              </Text>

              <Text
                style={{
                  color:
                    trade.direction === "Long"
                      ? colors.profit
                      : colors.loss,
                  marginTop: 6,
                }}
              >
                {trade.direction}

                <Text
  style={{
    color: colors.accent,
    marginTop: 4,
    fontWeight: "600",
  }}
>
  🎯 {trade.strategy}
</Text>
              </Text>

              <Text
                style={{
                  color:
                    trade.rr >= 0
                      ? colors.profit
                      : colors.loss,
                  marginTop: 6,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {trade.rr}R
                <Text
  style={{
    color: colors.secondary,
    marginTop: 8,
    fontSize: 13,
  }}
>
  📅 {trade.date}
</Text>

<Text
  style={{
    color: colors.text,
    marginTop: 6,
  }}
>
  📝 {trade.notes}
</Text>
                <Text
  style={{
    color: colors.text,
    marginTop: 8,
  }}
>
  📅 {trade.date}
</Text>

<Text
  style={{
    color: colors.secondary,
    marginTop: 4,
  }}
>
  📝 {trade.notes}
</Text>
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => deleteTrade(index)}
            >
              <Text
                style={{
                  color: colors.loss,
                  fontSize: 20,
                }}
              >
                ❌
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}