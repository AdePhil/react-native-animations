import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import {  EventCardScreensProps, StackParamList } from '.';
import { height, width } from './constants';
import * as Animatable from 'react-native-animatable';
import { opacity } from 'react-native-redash';

interface DetailsProps { }

const DETAILS_HEIGHT = 0.35 * height;

const Details = ({ route , navigation}: EventCardScreensProps<"details">) => {
  const { item: { poster, id, title, location, date } } = route.params;
  const { top } = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={[StyleSheet.absoluteFillObject, { zIndex: 2,width, height, backgroundColor: 'rgba(0,0,0,0.2)'}]}></View>
       <SharedElement id={`item.${id}.photo`} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <Image source={{ uri: poster }} style={[StyleSheet.absoluteFillObject, {width, height}]} >
        </Image>
      </SharedElement>
      <TouchableOpacity
         activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("home");
          }}
          style={[styles.fixedHeaderGroup, {top: top, zIndex: 3}]}
            >
          <Ionicons name="ios-arrow-round-back" size={24} color="white" style={{ fontWeight: 'bold' }} />
          <Text style={styles.fixedHeaderText}>Event Detail</Text>
        </TouchableOpacity>
      <Animatable.View style={styles.textGroup}
        duration={500}
        delay={300}
        animation={{
        0: {transform: [{translateY: DETAILS_HEIGHT}], opacity: 0.5},
        1: {transform: [{translateY: 0}, ], opacity: 1}
      }}>
        <View style={styles.textGroupTop}>
          <Animatable.View style={styles.textHeadingGroup}
            duration={500}
            delay={600}
            animation="fadeInUp"
       >
          <Text style={styles.textTitle}>{title}</Text>
          <View style={styles.location}>
            <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={16}
                  color="#5F5F5F"
                />
             <Text style={styles.textLocation}>{location}</Text>
         </View>
          <Text style={styles.textDate}>{date}</Text>
          </Animatable.View>
          <Animatable.View 
            duration={500}
            delay={600}
            animation="fadeInUp"
          >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Interested</Text>
            </TouchableOpacity>
        </Animatable.View>
        </View>
        <Animatable.View
          style={styles.textGroupBottom}
            duration={500}
            delay={700}
            animation="fadeInUp"
        >
          <TouchableOpacity>
          <Text style={styles.calendarText}>Add to Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.knowMoreText}>Know More</Text>
             <Ionicons name="ios-arrow-round-forward" size={24} color="black" />
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </View>
   );
}

Details.sharedElements = (route: RouteProp<StackParamList, "details">) => {
  const { item } = route.params;
  return [`item.${item.id}.photo`];
};

const styles = StyleSheet.create({
  container: {},
  fixedHeaderGroup: {
    position: 'absolute',
    width: width,
    left: 0,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'

  },
  fixedHeaderText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  textGroup: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0.65 * height,
    height: DETAILS_HEIGHT,
    width,
    zIndex: 2
  },
  textGroupTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 40,
    paddingHorizontal: 20,
    
  },
  textHeadingGroup: {
  flex: 1
  },
  textGroupBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopColor: '#ddd',
    borderTopWidth: 1
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: 'capitalize'
  },
  location: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#5F5F5F',
    minWidth: 100,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 4,

  },
  buttonText: {
    color: 'white',
    fontWeight: "500"

  },
  textLocation: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)'
    
},
  textDate: {
    fontSize: 12,
    fontWeight: 'bold',
      color: 'rgba(0,0,0,0.8)'
  },
  calendarText: {
    color: '#5F5F5F',
    fontWeight: 'bold'
  },
  knowMoreText: {
    fontWeight: 'bold',
    color: '#7DB785',
    marginRight: 10,
    marginTop: 2
}

})

export default Details;