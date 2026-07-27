import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
//import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number | string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}
const PhotoGallery = () => {
  const [randomUser, setrandomUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();

  const fetchUsers = () => {
    setLoading(true);
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => {
        setrandomUser(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading && randomUser.length === 0) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size={"large"} color={"#007AFF"} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.darkbg : styles.lightbg,
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.headerTitle,
              colorScheme === "dark" ? styles.textDark : styles.textLight,
            ]}
          >
            Photo Gallery
          </Text>
          <Text
            style={[
              styles.subtitle,
              colorScheme === "dark" ? styles.subtextDark : styles.subtextLight,
            ]}
          >
            Explore profiles & photos
          </Text>
        </View>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={fetchUsers}
          activeOpacity={0.7}
        >
          <Text style={styles.refreshButtonText}>🔄 Refresh</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={randomUser}
        keyExtractor={(item) => item.login.uuid}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchUsers} />
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              colorScheme === "dark" ? styles.cardDark : styles.cardLight,
            ]}
          >
            <View style={styles.cardHeader}>
              <Image
                source={{ uri: item.picture.medium }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text
                  style={[
                    styles.userName,
                    colorScheme === "dark" ? styles.textDark : styles.textLight,
                  ]}
                >
                  {item.name.first} {item.name.last}
                </Text>
                <Text
                  style={[
                    styles.userEmail,
                    colorScheme === "dark"
                      ? styles.subtextDark
                      : styles.subtextLight,
                  ]}
                >
                  {item.email}
                </Text>
              </View>
            </View>
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: item.picture.large }}
                style={styles.photo}
                resizeMode="cover"
              />
            </View>
            <View style={styles.cardFooter}>
              <Text
                style={[
                  styles.userLocation,
                  colorScheme === "dark"
                    ? styles.subtextDark
                    : styles.subtextLight,
                ]}
              >
                📍 {item.location.city}, {item.location.country}
              </Text>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{item.nat}</Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default PhotoGallery;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  darkbg: {
    backgroundColor: "#121212",
  },
  lightbg: {
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  refreshButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  refreshButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 13,
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 16,
  },
  cardLight: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#f1f3f5",
  },
  cardDark: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e9ecef",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
  },
  userEmail: {
    fontSize: 13,
    marginTop: 2,
  },
  textLight: {
    color: "#212529",
  },
  textDark: {
    color: "#f8f9fa",
  },
  subtextLight: {
    color: "#6c757d",
  },
  subtextDark: {
    color: "#a0aec0",
  },
  userLocation: {
    fontSize: 13,
    color: "#868e96",
    marginTop: 2,
  },
  photoContainer: {
    width: "100%",
    height: 240,
    backgroundColor: "#f1f3f5",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },
  tagBadge: {
    backgroundColor: "#e7f5ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1c7ed6",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#868e96",
  },
});
