import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Linking,
} from 'react-native';
import Contacts from 'react-native-contacts';

const ContactItem = ({ contact, onPressCall }) => {
  return (
    <TouchableOpacity onPress={() => onPressCall(contact)}>
      <View style={styles.contactItem}>
        <Text style={styles.contactName}>{contact.displayName}</Text>
        {contact.phoneNumbers && contact.phoneNumbers.length > 0 && (
          <TouchableOpacity onPress={() => onPressCall(contact)}>
            <Text style={styles.contactNumber}>{contact.phoneNumbers[0].number}</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app needs access to your contacts.',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll()
          .then((fetchedContacts) => {
            setContacts(fetchedContacts);
            setFilteredContacts(fetchedContacts);
          })
          .catch((error) => {
            console.log('Error fetching contacts:', error);
          });
      } else {
        console.log('Contacts permission denied');
      }
    } catch (error) {
      console.log('Error requesting contacts permission:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = contacts.filter((contact) =>
      contact.displayName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const handleContactPress = (contact) => {
    setSelectedContact(contact);
    setIsModalVisible(true);
  };

  const handleCallPress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleDismiss = () => {
    setSelectedContact(null);
    setIsModalVisible(false);
  };

  const handleOpenDialer = (phoneNumber) => {
    handleDismiss();
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchText}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.recordID}
        renderItem={({ item }) => (
          <ContactItem contact={item} onPressCall={handleContactPress} />
        )}
      />
      <Modal visible={isModalVisible} onRequestClose={handleDismiss} transparent>
        {selectedContact && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.contactName}>{selectedContact.displayName}</Text>
              {selectedContact.phoneNumbers && selectedContact.phoneNumbers.length > 0 && (
                <TouchableOpacity onPress={() => handleCallPress(selectedContact.phoneNumbers[0].number)}>
                  <Text style={styles.contactNumber}>{selectedContact.phoneNumbers[0].number}</Text>
                </TouchableOpacity>
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleOpenDialer(selectedContact.phoneNumbers[0].number)} style={styles.dialerButton}>
                  <Text style={styles.dialerButtonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDismiss} style={styles.dismissButton}>
                  <Text style={styles.dismissButtonText}>Dismiss</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchInput: {
    padding: 16,
    backgroundColor: 'gray',
    margin: 15,
    fontSize: 16,
    marginBottom: 8,
    borderRadius: 15,
  },
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 16,
    color: '#888888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  dialerButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  dialerButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dismissButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  dismissButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default ContactsScreen;
