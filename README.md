App Link - https://drive.google.com/file/d/10dXMcmLYMaESPHrolRotLlzOIMDpCIvL/view?usp=sharing <br>

The Contacts App is a React Native application that allows users to view and search their contacts. It utilizes the React Navigation library to implement navigation between screens.

Libraries Used React: A JavaScript library for building user interfaces.

React Native: A framework for building native mobile applications using React.

React Navigation: A library for managing navigation in React Native apps.

<b>Installation</b>

To run the Contacts App locally, you need to have Node.js and npm (Node Package Manager) installed on your machine. Follow the steps below to set up and run the app:

Clone this repository to your local machine or download the source code as a ZIP file.

Navigate to the project directory in your terminal or command prompt.

Run npm install to install the project dependencies.

Once the installation is complete, run npm start to start the Metro server.

Open another terminal or command prompt window and run npm run android to launch the app on an Android device or emulator. Alternatively, you can run npm run ios to launch the app on an iOS simulator if you're on a macOS system.

<b>Usage</b>

Upon launching the Contacts App, you will see a screen displaying your contacts. Use the search input field at the top to search for specific contacts by name. Tap on a contact to view additional details and options.

<b>How the Code Works The app's code is structured into two main files:</b>

Contact.js: This file contains the ContactsScreen component, which handles fetching and displaying the contacts. It utilizes the react-native-contacts library to access the device's contacts, and the PermissionsAndroid module to request the necessary permissions. The component includes a search feature, a contact list, and a modal for displaying additional details and options for a selected contact.

App.js: This file serves as the entry point of the application. It configures the navigation using the NavigationContainer and Stack.Navigator components from the react-navigation library. The ContactsScreen component is set as the main screen to be displayed within the stack navigator.

<b>How the Code Works</b>

Import the required React Native components and libraries.

Define the ContactItem functional component to represent an individual contact item in the list. It displays the contact's name and phone number (if available).

Define the main ContactsScreen component.

Declare state variables using the useState hook: contacts, filteredContacts, searchText, selectedContact, and isModalVisible.

Implement the useEffect hook to fetch the contacts when the component mounts.

The fetchContacts function requests permission to access the device's contacts using the PermissionsAndroid module. If granted, it retrieves all the contacts using the Contacts.getAll() method and updates the state variables accordingly.

Implement the handleSearch function to filter the contacts based on the search text entered by the user. It updates the filteredContacts state variable.

Implement the handleContactPress function to set the selected contact and show the modal for more options. It updates the selectedContact and isModalVisible state variables.

Implement the handleCallPress function to open the phone dialer with the selected contact's phone number using the Linking.openURL() method.

Implement the handleDismiss function to clear the selected contact and hide the modal. It updates the selectedContact and isModalVisible state variables.

Implement the handleOpenDialer function to open the phone dialer and call the selected contact's phone number. It calls the handleDismiss function and then uses the Linking.openURL() method.

Render the main ContactsScreen component.

Display a search input field (TextInput) to allow users to search for contacts.

Use the FlatList component to display the filtered contacts. Each item in the list is rendered using the ContactItem component.

Use the Modal component to display more details and options for the selected contact.

Inside the Modal component, display the selected contact's name and phone number (if available).

Render buttons for calling and dismissing the modal.

Apply styles using the StyleSheet.create method to define the component's appearance.

This code enables users to search and view their contacts, call a selected contact, and dismiss the modal with additional options. It uses the react-native-contacts library to fetch and access the device's contacts, and the PermissionsAndroid module to request the necessary permissions. The Linking module is used to open the phone dialer and external URLs.
