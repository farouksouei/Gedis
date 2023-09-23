import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
} from "@ionic/react";
import { Geolocation } from "@capacitor/geolocation";
import axios from "axios";

const ShopFormEdit: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();

  const [shop, setShop] = useState({
    name: "",
    description: "",
    longitude: "",
    latitude: "",
    google_maps_url: "",
    rank: 0,
  });

  function generateGoogleMapsURL(latitude: number, longitude: number): string {
    const baseUrl = "https://www.google.com/maps/";
    const queryParameters = `?q=${latitude},${longitude}`;

    return baseUrl + queryParameters;
  }

  useEffect(() => {
    console.log("====================================");
    console.log("Shop ID:", shopId);
    console.log("====================================");
    axios
      .get(`http://wealthy-technology.com/apiv1/api/details/${shopId}/`)
      .then((res) => {
        console.log("====================================");
        console.log("Shop Data:", res.data);
        console.log("====================================");
        setShop(res.data);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShop((prevShop) => ({
      ...prevShop,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your logic to handle form submission here
    axios.put(
      `http://wealthy-technology.com/apiv1/api/details/${shopId}/`,
      shop
    );
    console.log("Shop data submitted:", shop);
    // You can send the shop data to your API or perform other actions as needed
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shop Form Edit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonCard>
            <IonCardHeader>Shop Form</IonCardHeader>
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
          </IonCard>

          <IonButton expand="full" type="submit">
            Submit
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ShopFormEdit;
