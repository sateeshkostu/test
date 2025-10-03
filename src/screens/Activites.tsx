import React, { useState } from 'react'
import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";

const Activities = () => {
    const [image, setImage] = useState<string | null>(null);
    const STATIC_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIxSFpZVnVzM0xNZzlBM00rZTluNDFvaEViQTJTaHc0NVVEaXRraE9NUDA5Q3l6NlNvTXpsVjFrV1NFZDlQNnBtQjB2Y0pGSHBnK2NyR1lSbkl4eEwvMGVaQ2plcG9GQlYxRDFIR2RxdkNwK0w2WUJyV21VZUZMQWVTNU9YRFBjRFMwSnh0NmZ3RDVybDlYZnJrd1lTWEZ1ZVJrbDhKa3k5N0ZvcGVjNExHL1lKOUQrL0g2TG5LbSt4ZTZFL0U2SE9pMGV2Ukh5dmU5ZXBPQjJjeGNBWm93PT0iLCJpYXQiOjE3NTk0NzgwOTF9.rIqS9SKWjDoM1eo8XwbDPv2vCMC78W25KgFTK6f1ejA";
    const leadId = "2";

    const handleOpenCamera = async () => {
        try {
            const img: ImageOrVideo = await ImagePicker.openCamera({
                width: 300,
                height: 300,
            });
            console.log('img', img)
            setImage(img.path);
            await uploadImage(img.path);
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
             await uploadImage(img.path);
        } catch (err) {
            console.log("Gallery cancelled", err);
        }
    };

    const uploadImage = async (filePath: string) => {
        try {
            const formData = new FormData();
            formData.append("file", {
                uri: Platform.OS === "android" ? filePath : filePath.replace("file://", ""),
                type: "image/jpeg",
                name: "upload.jpg",
            } as any);
            formData.append('personelPropertyTax', 10);
            formData.append('others', 1);
            formData.append('others2', 1)
            const response = await fetch(`https://api.vincenttaxfiling.com/v1/leads/${leadId}/taxes-paid`, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${STATIC_TOKEN}`,
                },
                body: formData,
            });

            const result = await response.json();
            console.log("Upload Success:", result);
            Alert.alert("Success", "Image uploaded successfully!");
        } catch (error) {
            console.error("Upload Error:", error);
            Alert.alert("Error", "Failed to upload image");
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
