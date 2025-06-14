import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  TextInput,
  Modal,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import { useTheme, theme } from '../context/ThemeContext';
 
// Sample initial contacts
const initialContacts = [
  { id: '1', name: 'Mom', phone: '+1 (555) 123-4567', priority: 1 },
  { id: '2', name: 'Dad', phone: '+1 (555) 987-6543', priority: 2 },
  { id: '3', name: 'Local Police', phone: '911', priority: 3 },
];

export default function ContactsScreen() {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const [contacts, setContacts] = useState(initialContacts);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [priority, setPriority] = useState('1');

  const openAddModal = () => {
    setEditingContact(null);
    setName('');
    setPhone('');
    setPriority('1');
    setModalVisible(true);
  };

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setName(contact.name);
    setPhone(contact.phone);
    setPriority(contact.priority.toString());
    setModalVisible(true);
  };

  const handleSaveContact = () => {
    if (!name.trim() || !phone.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editingContact) {
      // Update existing contact
      const updatedContacts = contacts.map(c => 
        c.id === editingContact.id 
          ? { ...c, name, phone, priority: parseInt(priority) } 
          : c
      );
      setContacts(updatedContacts);
      toast.success('Contact updated');
    } else {
      // Add new contact
      const newContact = {
        id: Date.now().toString(),
        name,
        phone,
        priority: parseInt(priority),
      };
      setContacts([...contacts, newContact]);
      toast.success('Contact added');
    }
    
    setModalVisible(false);
  };

  const handleDeleteContact = (id) => {
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to remove this emergency contact?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            setContacts(contacts.filter(c => c.id !== id));
            toast.info('Contact removed');
          },
          style: "destructive"
        }
      ]
    );
  };

  const renderContactItem = ({ item }) => (
    <View style={[styles.contactCard, { backgroundColor: currentTheme.surface }]}>
      <View style={styles.contactInfo}>
        <View style={[styles.priorityBadge, { 
          backgroundColor: item.priority === 1 ? currentTheme.error : 
                         item.priority === 2 ? currentTheme.warning : 
                         currentTheme.accent 
        }]}>
          <Text style={styles.priorityText}>{item.priority}</Text>
        </View>
        <View>
          <Text style={[styles.contactName, { color: currentTheme.text }]}>{item.name}</Text>
          <Text style={[styles.contactPhone, { color: currentTheme.textSecondary }]}>{item.phone}</Text>
        </View>
      </View>
      
      <View style={styles.contactActions}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => openEditModal(item)}
        >
          <MaterialIcons name="edit" size={22} color={currentTheme.accent} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeleteContact(item.id)}
        >
          <MaterialIcons name="delete" size={22} color={currentTheme.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={[styles.header, { 
        backgroundColor: currentTheme.surface,
        borderBottomColor: currentTheme.border 
      }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={currentTheme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>Emergency Contacts</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={[styles.infoCard, { backgroundColor: currentTheme.accentLight }]}>
        <MaterialIcons name="info" size={24} color={currentTheme.accent} style={styles.infoIcon} />
        <Text style={[styles.infoText, { color: currentTheme.accent }]}>
          Add up to 5 emergency contacts who will be notified in case of emergency.
          Priority 1 contacts will be contacted first.
        </Text>
      </View>

      <FlatList
        data={contacts.sort((a, b) => a.priority - b.priority)}
        renderItem={renderContactItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contactsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: currentTheme.textSecondary }]}>
              No emergency contacts added yet
            </Text>
          </View>
        }
      />

      <TouchableOpacity 
        style={[styles.addButton, { backgroundColor: currentTheme.accent }]}
        onPress={openAddModal}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Emergency Contact</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: currentTheme.surface }]}>
            <Text style={[styles.modalTitle, { color: currentTheme.text }]}>
              {editingContact ? 'Edit Contact' : 'Add Contact'}
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: currentTheme.textSecondary }]}>Name</Text>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: currentTheme.surfaceSecondary,
                  color: currentTheme.text
                }]}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
                placeholderTextColor={currentTheme.textSecondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: currentTheme.textSecondary }]}>Phone Number</Text>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: currentTheme.surfaceSecondary,
                  color: currentTheme.text
                }]}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                placeholderTextColor={currentTheme.textSecondary}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: currentTheme.textSecondary }]}>Priority</Text>
              <View style={styles.prioritySelector}>
                {['1', '2', '3'].map((p) => (
                  <TouchableOpacity
                    key={p}
                    style={[
                      styles.priorityOption,
                      { backgroundColor: currentTheme.surfaceSecondary },
                      priority === p && [
                        styles.prioritySelected,
                        { borderColor: currentTheme.accent }
                      ]
                    ]}
                    onPress={() => setPriority(p)}
                  >
                    <Text style={[
                      styles.priorityOptionText,
                      { color: currentTheme.text },
                      priority === p && styles.prioritySelectedText
                    ]}>{p}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.cancelButton, { backgroundColor: currentTheme.surfaceSecondary }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.cancelButtonText, { color: currentTheme.textSecondary }]}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.saveButton, { backgroundColor: currentTheme.accent }]}
                onPress={handleSaveContact}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#0d47a1',
    lineHeight: 20,
  },
  contactsList: {
    padding: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  priorityBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  priorityText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
  },
  contactActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 8,
    marginRight: 8,
  },
  deleteButton: {
    padding: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  prioritySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityOption: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  prioritySelected: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  priorityOptionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  prioritySelectedText: {
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});