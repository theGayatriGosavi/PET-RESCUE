import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DefaultTheme, Provider } from 'react-native-paper';

const themeColors = {
  primary: '#8e2020', 
  secondary: '#f0f0f0', 
  overlay: 'rgba(255, 255, 255, 0.5)', 
  textPrimary: '#8e2020', 
  textSecondary: '#ffffff',
};

const pets = [
  { id: 1, name: 'Buddy', image: require('../../assets/images/Pet1.jpeg'), location: 'New York, NY', vaccinated: true },
  { id: 2, name: 'Milo', image: require('../../assets/images/Pet2.jpg'), location: 'Los Angeles, CA', vaccinated: false },
  { id: 3, name: 'Bella', image: require('../../assets/images/Pet3.png'), location: 'Chicago, IL', vaccinated: true },
  { id: 4, name: 'Timo', image: require('../../assets/images/Pet4.jpg'), location: 'Washington, DC', vaccinated: false },
  // Add more pets here
];

const AdoptPet = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeMenu, setActiveMenu] = useState('AdoptPet');

  useEffect(() => {
    const currentRoute = route.name;
    setActiveMenu(currentRoute);
  }, [route.name]);

  const handleMenuPress = (routeName) => {
    setActiveMenu(routeName);
    navigation.navigate(routeName === 'Home' ? 'Home' : routeName);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle" size={36} color="white" />
        </TouchableOpacity>
        <Text style={styles.heading}>PET RESCUE</Text>
        <View style={{ width: 70 }} />
      </View>

      <ImageBackground
        source={require('../../assets/images/banner3.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.petContainer}>
        {pets.map((pet) => (
          <View key={pet.id} style={styles.tile}>
            <Image source={pet.image} style={styles.petImage} />
            <View style={styles.details}>
              <Text style={styles.name}>{pet.name}</Text>
              <Text style={styles.location}>{pet.location}</Text>
              <View style={styles.vaccinationTag}>
                <Text style={styles.vaccinationText}>
                  {pet.vaccinated ? 'Vaccinated' : 'Not Vaccinated'}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Menu Bar */}
      <View style={styles.menuBar}>
        <TouchableOpacity
          style={[styles.menuItem, activeMenu === 'Home' && styles.activeMenuItem]}
          onPress={() => handleMenuPress('Home')}
        >
          <Ionicons name="home" size={24} color={activeMenu === 'Home' ? themeColors.primary : themeColors.textSecondary} />
          <Text style={[styles.menuText, activeMenu === 'Home' && styles.activeMenuText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, activeMenu === 'AdoptPet' && styles.activeMenuItem]}
          onPress={() => handleMenuPress('AdoptPet')}
        >
          <Ionicons name="paw" size={24} color={activeMenu === 'AdoptPet' ? themeColors.primary : themeColors.textSecondary} />
          <Text style={[styles.menuText, activeMenu === 'AdoptPet' && styles.activeMenuText]}>Adopt a Pet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, activeMenu === 'ListPet' && styles.activeMenuItem]}
          onPress={() => handleMenuPress('ListPet')}
        >
          <Ionicons name="add-circle" size={24} color={activeMenu === 'ListPet' ? themeColors.primary : themeColors.textSecondary} />
          <Text style={[styles.menuText, activeMenu === 'ListPet' && styles.activeMenuText]}>List Pet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.secondary,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: themeColors.overlay,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 0,
    backgroundColor: themeColors.primary,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 5,
  },
  heading: {
    color: themeColors.textSecondary,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  petContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tile: {
    width: width * 0.40, // Adjust to fit two tiles in a row
    backgroundColor: themeColors.overlay,
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  petImage: {
    width: '100%',
    height: 140, // Adjusted for smaller tiles
    resizeMode: 'cover',
  },
  details: {
    padding: 10,
    backgroundColor: themeColors.secondary,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
  },
  location: {
    fontSize: 14,
    color: themeColors.textPrimary,
    marginVertical: 5,
  },
  vaccinationTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: themeColors.primary,
  },
  vaccinationText: {
    color: themeColors.textSecondary,
    fontSize: 12,
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: themeColors.primary,
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
  },
  menuItem: {
    alignItems: 'center',
  },
  activeMenuItem: {
    backgroundColor: themeColors.overlay,
    borderRadius: 10,
    padding: 5,
  },
  menuText: {
    color: themeColors.textSecondary,
    fontSize: 12,
  },
  activeMenuText: {
    color: themeColors.primary,
    fontWeight: 'bold',
  },
});

export default AdoptPet;
