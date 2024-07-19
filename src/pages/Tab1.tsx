import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonAlert,
  IonButton,
  IonButtons,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import {
  createOutline,
  eyeOutline,
  trashOutline,
  refreshOutline,
} from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";

const Tab1: React.FC = () => {
  interface Shop {
    id: number;
    name: string;
    phone: string;
    description: string;
    longitude: number;
    latitude: number;
    conductor: string;
    google_maps_url: string;
  }

  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const history = useHistory();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [test, setTest] = useState(false);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  async function getShops(): Promise<void> {
    try {
      const response = await axios.post('https://06a1-196-178-181-193.ngrok-free.app/apiv1/details/get-organization-detail/');
      console.log(response.data);
      setShops(response.data);
    } catch (error) {
      console.error(error);
      // Optionally, handle the error response here
    }
  }

  const handleTest = () => {
    console.log("Test");
    axios
      .get("https://reqres.in/api/users/2")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setTest(true);
        } else {
          setTest(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setTest(false);
      });
  };

  const handleEdit = (shop: Shop) => {
    console.log("Edit shop with id:", shop.id);
    // push to the edit page with the shop id as a parameter go to /edit-shop/:shopId
  };

  const handleView = (shop: Shop) => {
    console.log("View shop with id:", shop.id);
    // Implement your view logic here
  };

  const handleDelete = (shop: Shop) => {
    setSelectedShop(shop); // Set the selected shop to display confirmation dialog
    setShowDeleteAlert(true);
  };

  const handleRefresh = () => {
    getShops();
  };

  const confirmDelete = () => {
    if (selectedShop) {
      console.log("Delete shop with id:", selectedShop.id);
      // Implement your delete logic here
      axios.delete(`https://06a1-196-178-181-193.ngrok-free.app/apiv1/details/${selectedShop.id}/`);
      // Refresh the shops list
      getShops();

      // Clear the selected shop and close the alert
      setSelectedShop(null);
      setShowDeleteAlert(false);
    }
  };

  useEffect(() => {
    getShops();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>All Shops</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>All Shops</IonCardTitle>
            <IonButton onClick={handleRefresh}>
              <IonIcon slot="icon-only" icon={refreshOutline} />
            </IonButton>
          </IonCardHeader>
        </IonCard>

        <IonCard>
          {shops.map((shop) => (
            <IonItem key={shop.id}>
              <IonLabel>
                <h2>{shop.name}</h2>
                <p>{shop.description}</p>
                <p>
                  Location:{" "}
                  <a
                    href={shop.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Maps
                  </a>
                </p>
              </IonLabel>
              {/* Edit Icon */}
              <IonButton routerLink={`/view-shop/${shop.id}`} color="primary">
                View
              </IonButton>
              {/* View Icon */}
              <IonButton routerLink={`/edit-shop/${shop.id}`} color="primary">
                Edit
              </IonButton>
              {/* Delete Icon */}
              <IonIcon icon={trashOutline} onClick={() => handleDelete(shop)} />
            </IonItem>
          ))}
        </IonCard>
      </IonContent>

      {/* Delete Confirmation Alert */}
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header="Delete Shop"
        message={`Are you sure you want to delete ${selectedShop?.name}?`}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Delete canceled");
            },
          },
          {
            text: "Delete",
            handler: () => {
              confirmDelete();
            },
          },
        ]}
      />
    </IonPage>
  );
};

export default Tab1;
