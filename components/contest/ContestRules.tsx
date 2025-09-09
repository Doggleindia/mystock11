import { View, Text } from 'react-native'
import React from 'react'

const ContestRules = () => {
  return (
    <>
        {/* Rules */}
          <View style={styles.rules}>
            <Text style={styles.ruleTitle}>📜 Contest Rules</Text>
            <Text>1. Pick 11 stocks in NIFTY50 or 7-9 stocks in BankNifty.</Text>
            <Text>2. Choose 1 Captain & 1 Vice Captain.</Text>
            <Text>3. Portfolio locks at 9:15 AM, cannot be changed.</Text>
            <Text>4. Points based on real-time price movement.</Text>
          </View>
    </>
  )
}

export default ContestRules

const styles = StyleSheet.create({
  rules: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#fff7f7",
    borderRadius: 8,
  },
  ruleTitle: { fontWeight: "700", marginBottom: 6 },
});