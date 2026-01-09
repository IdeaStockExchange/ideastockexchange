import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import axios from 'axios';

type CreateArgumentScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateArgument'
>;

interface Props {
  navigation: CreateArgumentScreenNavigationProp;
}

const CreateArgumentScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (title.length < 10) {
      Alert.alert('Error', 'Title must be at least 10 characters');
      return;
    }

    if (description.length < 20) {
      Alert.alert('Error', 'Description must be at least 20 characters');
      return;
    }

    try {
      setSubmitting(true);
      const API_URL = 'http://localhost:3001';

      const response = await axios.post(`${API_URL}/api/arguments`, {
        title,
        description,
      });

      Alert.alert('Success', 'Argument created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('ArgumentDetail', { id: response.data.id });
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.error || 'Failed to create argument'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Create New Argument</Text>
        <Text style={styles.subtitle}>
          Submit a new belief or claim for evidence-based evaluation
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Argument Title *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., Roundabouts reduce traffic accidents"
            placeholderTextColor="#666"
            maxLength={500}
          />
          <Text style={styles.charCount}>{title.length}/500</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Provide a detailed explanation of your argument..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={8}
            maxLength={10000}
          />
          <Text style={styles.charCount}>{description.length}/10,000</Text>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.submitButtonText}>
            {submitting ? 'Creating...' : 'Create Argument'}
          </Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 Tips</Text>
          <Text style={styles.infoText}>• Be specific and clear</Text>
          <Text style={styles.infoText}>• Provide comprehensive context</Text>
          <Text style={styles.infoText}>• Add evidence after creating</Text>
          <Text style={styles.infoText}>• Link supporting/opposing arguments</Text>
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
  content: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#242424',
    color: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#333',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderWidth: 1,
    borderColor: '#4f46e5',
    borderRadius: 8,
    padding: 15,
    marginTop: 30,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 6,
  },
});

export default CreateArgumentScreen;
