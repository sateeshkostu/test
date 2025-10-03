import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";

const Activities = () => {
    const [image, setImage] = useState<string | null>(null);

    const handleOpenCamera = async () => {
        try {
            const img: ImageOrVideo = await ImagePicker.openCamera({
                width: 300,
                height: 300,
            });
            console.log('img', img)
            setImage(img.path);
        } catch (err) {
            console.log("Camera cancelled", err);
        }
    };

    const handleOpenGallery = async () => {
        try {
            const img: ImageOrVideo = await ImagePicker.openPicker({
                width: 300,
                height: 300,
            });
            setImage(img.path);
        } catch (err) {
            console.log("Gallery cancelled", err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Activity</Text>

            {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={handleOpenCamera}>
                    <Text style={styles.btnText}>Upload from Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={handleOpenGallery}>
                    <Text style={styles.btnText}>Upload from Gallery</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Activities;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    btnContainer: {
        flexDirection: "row",
        gap: 10,
        marginTop: 20,
    },
    btn: {
        backgroundColor: "blue",
        padding: 12,
        borderRadius: 10,
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
    },
    imagePreview: {
        width: 300,
        height: 300,
        borderRadius: 10,
        marginTop: 20,
    },
});
