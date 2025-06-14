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
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { toast } from 'sonner-native';

// Sample initial contacts
const initialContacts = [
  { id: '1', name: 'Mom', phone: '+1 (555) 123-4567', priority: 1 },
  { id: '2', name: 'Dad', phone: '+1 (555) 987-6543', priority: 2 },
  { id: '3', name: 'Local Police', phone: '911', priority: 3 },
];

export default function ContactsScreen() {
  const navigation = useNavigation();
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
    <View style={styles.contactCard}>
      <View style={styles.contactInfo}>
        <View style={[styles.priorityBadge, {
          backgroundColor: 
            item.priority === 1 ? '#F44336' : 
            item.priority === 2 ? '#FF9800' : '#4CAF50'
        }]}>
          <Text style={styles.priorityText}>{item.priority}</Text>
        </View>
        <View>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhone}>{item.phone}</Text>
        </View>
      </View>
      
      <View style={styles.contactActions}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => openEditModal(item)}
        >
          <MaterialIcons name="edit" size={20} color="#2196F3" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeleteContact(item.id)}
        >
          <MaterialIcons name="delete" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.infoCard}>
        <FontAwesome name="info-circle" size={20} color="#2196F3" style={styles.infoIcon} />
        <Text style={styles.infoText}>
          These contacts will be notified in order of priority when an emergency is detected
        </Text>
      </View>

      <FlatList
        data={contacts.sort((a, b) => a.priority - b.priority)}
        renderItem={renderContactItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contactsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No emergency contacts added yet</Text>
          </View>
        }
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={openAddModal}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Emergency Contact</Text>
      </TouchableOpacity>

      {/* Add/Edit Contact Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingContact ? 'Edit Contact' : 'Add New Contact'}
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Contact Name"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Priority (1-3)</Text>
              <View style={styles.prioritySelector}>
                {[1, 2, 3].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.priorityOption,
                      parseInt(priority) === num && styles.prioritySelected,
                      num === 1 ? { backgroundColor: '#ffebee' } : 
                      num === 2 ? { backgroundColor: '#fff3e0' } : 
                      { backgroundColor: '#e8f5e9' }
                    ]}
                    onPress={() => setPriority(num.toString())}
                  >
                    <Text style={[
                      styles.priorityOptionText,
                      parseInt(priority) === num && styles.prioritySelectedText,
                      num === 1 ? { color: '#F44336' } : 
                      num === 2 ? { color: '#FF9800' } : 
                      { color: '#4CAF50' }
                    ]}>
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.saveButton}
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