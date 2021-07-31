import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  Linking,
} from "react-native";
import firebase from "firebase";
import db from "./config";
// import FileViewer from "react-native-file-viewer";
// import DocumentPicker from "react-native-document-picker";
import * as ImagePicker from "expo-image-picker";
// import {  FileSystem, Linking } from 'expo';
import * as DocumentPicker from "expo-document-picker";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      doc: "",
      uploading: false,
      userId: "testing@gmail.com",
    };
  }
  componentDidMount() {
    this.fetchImage(this.state.userId);
  }

  selectPicture = async () => {
    // const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    const { name, uri, type } = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (type === "success") {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    console.log("before fetch!");
    console.log(uri);

    // var response = await fetch(uri);

    // var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("documents/" + imageName);

    return ref
      .put(uri, {
        contentType: "application/pdf",
      })
      .then((response) => {
        this.fetchImage(imageName);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("documents/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ doc: url });
      })
      .catch((error) => {
        alert(error.message);
        console.log(error.message);
        this.setState({ doc: "#" });
      });
  };

  openDocument = (url) => {
    let remoteUrl = "http://www.soundczech.cz/temp/lorem-ipsum.pdf";
    //let localPath = `${FileSystem.documentDirectory}myDirectory/lorem-ipsum.pdf`;
    if (this.state.doc !== "#") {
      Linking.openURL(url);
    } else {
      alert("its is hashtag");
    }
    console.log(this.state.doc);
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.doc ? "Uploaded" : "Uploading"}</Text>

        <TouchableOpacity onPress={this.selectPicture}>
          <Text>Choose Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.openDocument(this.state.doc);
          }}
        >
          <Text>Open Document </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    alignItems: "center",
  },
});
