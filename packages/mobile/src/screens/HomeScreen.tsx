import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>💡</Text>
        <Text style={styles.title}>Idea Stock Exchange</Text>
        <Text style={styles.subtitle}>ReasonRank: PageRank for Truth</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Evidence-based argument evaluation using the ReasonRank algorithm.
          Every argument shows its score based on evidence, not popularity.
        </Text>

        <View style={styles.formula}>
          <Text style={styles.formulaText}>
            Argument Strength =
          </Text>
          <Text style={styles.formulaText}>
            Truth Score × Linkage Score × Importance Weight
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('ArgumentList')}
        >
          <Text style={styles.buttonText}>View Arguments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('CreateArgument')}
        >
          <Text style={styles.secondaryButtonText}>Create New Argument</Text>
        </TouchableOpacity>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Key Features</Text>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📊</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Evidence-Based Scoring</Text>
              <Text style={styles.featureDescription}>
                Arguments scored on evidence quality, not popularity
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🔗</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Logical Connections</Text>
              <Text style={styles.featureDescription}>
                Link supporting and opposing arguments
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>♻️</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Dynamic Updates</Text>
              <Text style={styles.featureDescription}>
                Scores automatically update as new evidence emerges
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🎯</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>No Duplicates</Text>
              <Text style={styles.featureDescription}>
                Semantic clustering merges similar arguments
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 30,
    alignItems: 'center',
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
    marginBottom: 20,
  },
  formula: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  formulaText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4f46e5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#4f46e5',
    fontSize: 16,
    fontWeight: '600',
  },
  features: {
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
  },
});

export default HomeScreen;
