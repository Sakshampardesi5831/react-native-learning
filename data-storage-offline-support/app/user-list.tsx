import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getUsers, User } from "@/database/crud";
import { Link } from "expo-router";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  async function loadUsers() {
    const list = await getUsers();
    setUsers(list);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>User Directory</Text>

        <View style={styles.tableContainer}>
          <ScrollView>
            {/* Table Header */}
            <View style={styles.tableRowHeader}>
              <Text style={[styles.headerCell, styles.idCol]}>ID</Text>
              <Text style={[styles.headerCell, styles.nameCol]}>Name</Text>
              <Text style={[styles.headerCell, styles.emailCol]}>Email</Text>
            </View>

            {/* Table Body */}
            {users.length > 0 ? (
              users.map((user) => (
                <View key={user.id} style={styles.tableRow}>
                  <Text style={[styles.cell, styles.idCol]}>{user.id}</Text>
                  <Text style={[styles.cell, styles.nameCol]}>{user.name}</Text>
                  <Text
                    style={[styles.cell, styles.emailCol]}
                    numberOfLines={1}
                  >
                    {user.email}
                  </Text>
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No users registered yet.</Text>
              </View>
            )}
          </ScrollView>
        </View>

        <Link href="/insert-user" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>+ Add New User</Text>
          </Pressable>
        </Link>

        <Pressable
          onPress={loadUsers}
          style={({ pressed }) => [
            styles.button,
            styles.loadButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Refresh List</Text>
        </Pressable>

        <Link href="/offline-apps" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.linkButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.linkButtonText}>➔ Back to Offline Apps</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 500,
    maxHeight: "85%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1d1d1f",
    marginBottom: 20,
    textAlign: "center",
  },
  tableContainer: {
    height: 250,
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e5e5ea",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f7",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5ea",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f7",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  headerCell: {
    fontWeight: "600",
    color: "#1d1d1f",
    fontSize: 14,
  },
  cell: {
    color: "#1d1d1f",
    fontSize: 14,
  },
  idCol: {
    width: 40,
    textAlign: "center",
  },
  nameCol: {
    flex: 1,
    paddingLeft: 8,
  },
  emailCol: {
    flex: 1.5,
    paddingLeft: 8,
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#86868b",
    fontSize: 14,
  },
  button: {
    height: 48,
    backgroundColor: "#0071e3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  loadButton: {
    backgroundColor: "#34c759",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "#86868b",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  linkButtonText: {
    color: "#86868b",
    fontSize: 16,
    fontWeight: "600",
  },
});
