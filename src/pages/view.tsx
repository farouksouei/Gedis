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
  IonText,
  IonCardContent,
} from "@ionic/react";
import { Geolocation } from "@capacitor/geolocation";
import axios from "axios";

const ShopView: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();

  const [shop, setShop] = useState({
    name: "",
    description: "",
    longitude: "",
    latitude: "",
    google_maps_url: "",
    rank: 0,
  });

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shop Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>Shop Details</IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>Name:</IonLabel>
                <IonText>{shop.name}</IonText>
              </IonItem>
              <IonItem>
                <IonLabel>Description:</IonLabel>
                <IonText>{shop.description}</IonText>
              </IonItem>
              <IonItem>
                <IonLabel>Longitude:</IonLabel>
                <IonText>{shop.longitude}</IonText>
              </IonItem>
              <IonItem>
                <IonLabel>Latitude:</IonLabel>
                <IonText>{shop.latitude}</IonText>
              </IonItem>
              <IonItem>
                <IonLabel>Google Maps URL:</IonLabel>
                <IonText>
                  <a
                    href={shop.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shop.google_maps_url}
                  </a>
                </IonText>
              </IonItem>
              <IonItem>
                <IonLabel>Rank:</IonLabel>
                <IonText>{shop.rank}</IonText>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ShopView;
