import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import axios from 'axios';

type ArgumentDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ArgumentDetail'
>;

type ArgumentDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ArgumentDetail'
>;

interface Props {
  navigation: ArgumentDetailScreenNavigationProp;
  route: ArgumentDetailScreenRouteProp;
}

const ArgumentDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [argument, setArgument] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArgument();
  }, [id]);

  const fetchArgument = async () => {
    try {
      setLoading(true);
      const API_URL = 'http://localhost:3001';
      const response = await axios.get(`${API_URL}/api/arguments/${id}`);
      setArgument(response.data);
    } catch (error) {
      console.error('Error fetching argument:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatScore = (score: number): string => {
    return `${(score * 100).toFixed(0)}%`;
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (!argument) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Argument not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{argument.title}</Text>
        <Text style={styles.description}>{argument.description}</Text>
      </View>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>ReasonRank Score</Text>
        <Text style={styles.scoreNumber}>
          {formatScore(argument.calculated_truth_score || 0.5)}
        </Text>
        <View style={styles.scoreBarLarge}>
          <View
            style={[
              styles.scoreBarFill,
              {
                width: `${(argument.calculated_truth_score || 0.5) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.formula}>
          Argument Strength = Truth × Linkage × Importance
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          📚 Evidence ({argument.evidence?.length || 0})
        </Text>
        {argument.evidence && argument.evidence.length > 0 ? (
          argument.evidence.map((evidence: any) => (
            <View key={evidence.id} style={styles.evidenceItem}>
              <Text style={styles.evidenceDescription}>
                {evidence.description}
              </Text>
              <Text style={styles.evidenceSource}>
                Source: {evidence.source}
              </Text>
              <Text style={styles.evidenceScore}>
                Truth: {formatScore(evidence.truth_score)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No evidence added yet</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          ✅ Supporting Arguments ({argument.supportingArguments?.length || 0})
        </Text>
        {argument.supportingArguments && argument.supportingArguments.length > 0 ? (
          argument.supportingArguments.map((link: any) => (
            <View key={link.id} style={styles.subArgumentItem}>
              <Text style={styles.subArgumentTitle}>
                {link.sub_argument_title}
              </Text>
              <View style={styles.linkScores}>
                <Text style={styles.linkScore}>
                  Linkage: {formatScore(link.linkage_score)}
                </Text>
                <Text style={styles.linkScore}>
                  Importance: {formatScore(link.importance_weight)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No supporting arguments</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          ❌ Opposing Arguments ({argument.opposingArguments?.length || 0})
        </Text>
        {argument.opposingArguments && argument.opposingArguments.length > 0 ? (
          argument.opposingArguments.map((link: any) => (
            <View key={link.id} style={[styles.subArgumentItem, styles.opposing]}>
              <Text style={styles.subArgumentTitle}>
                {link.sub_argument_title}
              </Text>
              <View style={styles.linkScores}>
                <Text style={styles.linkScore}>
                  Linkage: {formatScore(Math.abs(link.linkage_score))}
                </Text>
                <Text style={styles.linkScore}>
                  Importance: {formatScore(link.importance_weight)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No opposing arguments</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  errorText: {
    color: '#888',
    fontSize: 16,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#aaa',
    lineHeight: 24,
  },
  scoreCard: {
    backgroundColor: '#667eea',
    padding: 20,
    margin: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  scoreBarLarge: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 15,
  },
  scoreBarFill: {
    height: '100%',
    backgroundColor: 'white',
  },
  formula: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'monospace',
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  evidenceItem: {
    backgroundColor: '#242424',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#4f46e5',
  },
  evidenceDescription: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 8,
    lineHeight: 20,
  },
  evidenceSource: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  evidenceScore: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  subArgumentItem: {
    backgroundColor: '#242424',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  opposing: {
    borderLeftColor: '#ef4444',
  },
  subArgumentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  linkScores: {
    flexDirection: 'row',
    gap: 15,
  },
  linkScore: {
    fontSize: 12,
    color: '#888',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default ArgumentDetailScreen;
