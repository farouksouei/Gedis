import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonCard,
  IonCardHeader,
  IonAlert,
  IonToast,
} from "@ionic/react";
import { Geolocation } from "@capacitor/geolocation";
import axios from "axios";
import API_URL from "../env";

const ShopForm: React.FC = () => {
  const [shop, setShop] = useState({
    name: "",
    description: "",
    longitude: "",
    latitude: "",
    google_maps_url: "",
    rank: 0,
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function generateGoogleMapsURL(latitude: number, longitude: number): string {
    const baseUrl = "https://www.google.com/maps/";
    const queryParameters = `?q=${latitude},${longitude}`;

    return baseUrl + queryParameters;
  }

  const showToastMessage = (message: string) => {
    setShowToast(true);
    setToastMessage(message);

    // Hide the toast after a few seconds (adjust the duration as needed)
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // 3000 milliseconds (3 seconds)
  };

  useEffect(() => {
    // get permission to access the user's location
    Geolocation.requestPermissions();
    Geolocation.watchPosition({}, (position, err) => {
      console.log("====================================");
      console.log("Position:", position);
      console.log("====================================");
      console.log("====================================");
      console.log("Error:", err);
    });
    // get the current location of the user
    Geolocation.getCurrentPosition()
      .then((position) => {
        setShop((prevShop) => ({
          ...prevShop,
          longitude: position.coords.longitude.toString(),
          latitude: position.coords.latitude.toString(),
          // will need to add the google maps url here as well that will be constructed from the longitude and latitude
          google_maps_url: generateGoogleMapsURL(
            position.coords.latitude,
            position.coords.longitude
          ),
        }));
      })
      .catch((error) => {
        console.error("Error getting location:", error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShop((prevShop) => ({
      ...prevShop,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    setShowConfirm(true);
  };

  const handleConfirmCancel = () => {
    setShowConfirm(false);
  };

  const handleConfirmSubmit = () => {
    // Perform the form submission logic here
    axios
      .post("http://127.0.0.1:8000/apiv1/details/", shop)
      .then((response) => {
        console.log("Shop data submitted:", shop);
        // You can handle the response from the API here
        showToastMessage("Shop data submitted successfully!");
      })
      .catch((error) => {
        // Handle any errors that occur during submission
        console.error("Error submitting shop data:", error);
        showToastMessage("Error submitting shop data!");
      });

    setShowConfirm(false); // Close the confirmation dialog
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleConfirm(); // Show the confirmation dialog
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shop Form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonCard>
            <IonCardHeader>Add a shop</IonCardHeader>
            <IonList>
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  type="text"
                  name="name"
                  value={shop.name}
                  onIonChange={handleChange}
                  required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Description</IonLabel>
                <IonInput
                  type="text"
                  name="description"
                  value={shop.description}
                  onIonChange={handleChange}
                  required
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Longitude</IonLabel>
                <IonInput
                  type="text"
                  name="longitude"
                  value={shop.longitude}
                  onIonChange={handleChange}
                  required
                  disabled
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Latitude</IonLabel>
                <IonInput
                  type="text"
                  name="latitude"
                  value={shop.latitude}
                  onIonChange={handleChange}
                  required
                  disabled
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Google Maps URL</IonLabel>
                <IonInput
                  type="text"
                  name="google_maps_url"
                  value={shop.google_maps_url}
                  onIonChange={handleChange}
                  required
                  disabled
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Rank</IonLabel>
                <IonInput
                  type="number"
                  name="rank"
                  value={shop.rank}
                  onIonChange={handleChange}
                  min="1" // Set the minimum value to 1
                  max="5" // Set the maximum value to 5
                  required
                ></IonInput>
              </IonItem>
            </IonList>
            <IonButton
              expand="block"
              type="submit"
              style={{ borderRadius: "10px" }}
            >
              Submit
            </IonButton>
          </IonCard>
        </form>
      </IonContent>
      <IonAlert
        isOpen={showConfirm}
        onDidDismiss={handleConfirmCancel}
        header="Confirm Submission"
        message="Are you sure you want to submit this shop?"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: handleConfirmCancel,
          },
          {
            text: "Submit",
            handler: handleConfirmSubmit,
          },
        ]}
      />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000} // Duration to show the toast (adjust as needed)
        position="bottom"
        color="success" // You can use "danger" for error messages
        buttons={[
          {
            text: "Close",
            role: "cancel",
            handler: () => setShowToast(false),
          },
        ]}
      />
    </IonPage>
  );
};

export default ShopForm;
