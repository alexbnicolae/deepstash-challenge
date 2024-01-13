import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { PEOPLE, Person } from './utils/people';
import UserCardComponent from './components/user-card/user-card.component';
import CheckBox from '@react-native-community/checkbox';

export default function App() {

  const [searchText, setSearchText] = useState<string>("");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [peopleReaction1, setPeopleReaction1] = useState<Person[]>(PEOPLE.filter(f => f.reaction == '💡'));
  const [peopleReaction2, setPeopleReaction2] = useState<Person[]>(PEOPLE.filter(f => f.reaction == '🥶'));

  // apply the filters
  useEffect(
    () => {
      setPeopleReaction1(() => PEOPLE
        .filter(f => f.reaction == '💡' && `${f.firstName.toLowerCase()} ${f.lastName.toLowerCase()}`.includes(searchText.toLowerCase()))
      )

      setPeopleReaction2(() => PEOPLE
        .filter(f => f.reaction == '🥶' && `${f.firstName.toLowerCase()} ${f.lastName.toLowerCase()}`.includes(searchText.toLowerCase()))
      )

      if(toggleCheckBox) {
        setPeopleReaction1((prev) => prev
          .filter(f => f.reaction == '💡')
          .filter(f => f.bio != undefined)
        )
        setPeopleReaction2((prev) => prev
          .filter(f => f.reaction == '🥶')
          .filter(f => f.bio != undefined)
        )
      }
    },
    [searchText, toggleCheckBox]
  )

  const changeSearchText = (text: string) => {
      setSearchText(() => text);
  }

  const changeCheckboxValue = (value: boolean) => {
      setToggleCheckBox(() => value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
              style={styles.input}
              onChangeText={changeSearchText}
              value={searchText}
              placeholder='Search...'
        />
        <View
          style={{
            display: "flex",
            flexDirection: 'row',
            alignItems: "center"
          }}
        >
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => changeCheckboxValue(newValue)}
          />
          <Text style={styles.text}>
            Only show people with bio
          </Text>
        </View>
      </View>

      <ScrollView 
        style={{
          ...styles.inputContainer,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Text style={styles.text}>
          Reacted with 💡:
        </Text>
        {
          peopleReaction1.map(user => {
            return (
              <View
                style={{
                  marginTop: 15,
                  marginBottom: 15
                }}
                key={user.image}
              >
                <UserCardComponent
                  bio={user.bio}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  image={user.image}
                  reaction={user.reaction}
                />
              </View>
            )
          })
        }

        <Text style={styles.text}>
          Reacted with 🥶:
        </Text>
        {
          peopleReaction2.map(user => {
            return (
              <View
                style={{
                  marginTop: 15,
                  marginBottom: 15
                }}
                key={user.image}
              >
                <UserCardComponent
                  bio={user.bio}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  image={user.image}
                  reaction={user.reaction}
                />
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    fontFamily: "serif",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
    fontFamily: "serif",
  },
  inputContainer: {
    padding: 20,    
    width: "100%",
  },

  text: {
    fontFamily: "serif",
    fontSize: 15
  },
});
