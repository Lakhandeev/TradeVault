import { Text, View } from "react-native";

type DashboardProps = {
  colors: any;
  totalTrades: number;
  winRate: string;
  totalRR: string;
  bestTrade: number;
};

export default function Dashboard({
  colors,
  totalTrades,
  winRate,
  totalRR,
  bestTrade,
}: DashboardProps) {
  return (
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
          marginBottom: 15,
        }}
      >
        Dashboard
      </Text>

      {/* First Row */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <View
          style={{
            backgroundColor: colors.background,
            width: "48%",
            padding: 15,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: colors.secondary,
              fontSize: 13,
            }}
          >
            📊 Total Trades
          </Text>

          <Text
            style={{
              color: colors.text,
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            {totalTrades}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.background,
            width: "48%",
            padding: 15,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: colors.secondary,
              fontSize: 13,
            }}
          >
            🎯 Win Rate
          </Text>

          <Text
            style={{
              color: colors.text,
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            {winRate}%
          </Text>
        </View>
      </View>

      {/* Second Row */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            backgroundColor: colors.background,
            width: "48%",
            padding: 15,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: colors.secondary,
              fontSize: 13,
            }}
          >
            📈 Total RR
          </Text>

          <Text
            style={{
              color:
                Number(totalRR) >= 0
                  ? colors.profit
                  : colors.loss,
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            {totalRR}R
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.background,
            width: "48%",
            padding: 15,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: colors.secondary,
              fontSize: 13,
            }}
          >
            🏆 Best Trade
          </Text>

          <Text
            style={{
              color: colors.profit,
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            {bestTrade}R
          </Text>
        </View>
      </View>
    </View>
  );
}