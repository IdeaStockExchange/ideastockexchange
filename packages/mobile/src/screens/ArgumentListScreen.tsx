import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import axios from 'axios';

type ArgumentListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ArgumentList'
>;

interface Props {
  navigation: ArgumentListScreenNavigationProp;
}

interface ArgumentSummary {
  id: string;
  title: string;
  description: string;
  calculated_truth_score: number;
  evidence_count: number;
  created_by_username: string;
}

const ArgumentListScreen: React.FC<Props> = ({ navigation }) => {
  const [arguments, setArguments] = useState<ArgumentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchArguments();
  }, [searchTerm]);

  const fetchArguments = async () => {
    try {
      setLoading(true);
      // In production, replace with your API URL
      const API_URL = 'http://localhost:3001';
      const response = await axios.get(`${API_URL}/api/arguments`, {
        params: { search: searchTerm || undefined },
      });
      setArguments(response.data.arguments || []);
    } catch (error) {
      console.error('Error fetching arguments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number | null): string => {
    if (score === null || score === undefined) return '#6b7280';
    if (score >= 0.7) return '#10b981';
    if (score <= 0.3) return '#ef4444';
    return '#6b7280';
  };

  const formatScore = (score: number | null): string => {
    if (score === null || score === undefined) return 'N/A';
    return `${(score * 100).toFixed(0)}%`;
  };

  const renderArgument = ({ item }: { item: ArgumentSummary }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ArgumentDetail', { id: item.id })}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription} numberOfLines={3}>
        {item.description}
      </Text>

      <View style={styles.scoreSection}>
        <Text style={styles.scoreLabel}>Truth Score</Text>
        <View style={styles.scoreBar}>
          <View
            style={[
              styles.scoreFill,
              {
                width: `${(item.calculated_truth_score || 0.5) * 100}%`,
                backgroundColor: getScoreColor(item.calculated_truth_score),
              },
            ]}
          />
        </View>
        <Text style={styles.scoreValue}>
          {formatScore(item.calculated_truth_score)}
        </Text>
      </View>

      <View style={styles.metadata}>
        <Text style={styles.metadataText}>
          📊 {item.evidence_count} evidence
        </Text>
        <Text style={styles.metadataText}>
          👤 {item.created_by_username || 'Anonymous'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && arguments.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading arguments...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search arguments..."
          placeholderTextColor="#666"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <FlatList
        data={arguments}
        renderItem={renderArgument}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No arguments found</Text>
          </View>
        }
      />
    </View>
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
  loadingText: {
    color: '#888',
    marginTop: 10,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#242424',
  },
  searchInput: {
    backgroundColor: '#333',
    color: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  list: {
    padding: 15,
  },
  card: {
    backgroundColor: '#242424',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
    marginBottom: 15,
  },
  scoreSection: {
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
  },
  scoreBar: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  scoreFill: {
    height: '100%',
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textAlign: 'right',
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  metadataText: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
});

export default ArgumentListScreen;
