import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { File, Directory, Paths } from "expo-file-system";
import { Link } from "expo-router";

const FileSystem = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${message}`]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const createAndReadFile = async () => {
    try {
      const file = new File(Paths.document, "hello.txt");
      file.create();
      file.write("saksham from expo filesystem");
      const content = await file.text();
      addLog(`File created and read: ${content}`);
    } catch (error: any) {
      console.log(error);
      addLog(`Error: ${error.message}`);
    }
  };

  const readAsBase64 = async () => {
    try {
      const file = new File(Paths.document, "base64-test.txt");
      file.create();
      file.write("convert me to base64");
      const base64 = await file.base64();
      addLog(`Base64 File: ${base64}`);
    } catch (error: any) {
      console.log(error);
      addLog(`Error: ${error.message}`);
    }
  };

  const deleteFile = () => {
    const file = new File(Paths.document, "delete-me-test.txt");
    file.create();
    file.write("delete me");
    file.delete();
  };

  const copyFile = () => {
    const original = new File(Paths.document, "original.txt");
    if (!original.exists) {
      original.create();
      original.write("Original content");
    }
    const copy = new File(Paths.cache, "copy.txt");
    original.copy(copy);
  };

  const listDirectory = () => {
    try {
      const dir = new Directory(Paths.document);
      const items = dir.list();
      addLog(`Listed directory. Found ${items.length} items:`);
      items.forEach((item) => {
        addLog(`- ${item.name} (${item instanceof File ? "File" : "Directory"})`);
      });
    } catch (error: any) {
      console.log(error);
      addLog(`Error listing directory: ${error.message}`);
    }
  };

  useEffect(() => {
    // Auto-scroll to bottom of the logs
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [logs]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>File System Demo</Text>

        <Pressable
          onPress={createAndReadFile}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Create & Read File</Text>
        </Pressable>

        <Pressable
          onPress={readAsBase64}
          style={({ pressed }) => [
            styles.button,
            styles.base64Button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Read as Base64</Text>
        </Pressable>

        <Pressable
          onPress={listDirectory}
          style={({ pressed }) => [
            styles.button,
            styles.listDirectoryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>List Directory Contents</Text>
        </Pressable>

        <Pressable
          onPress={clearLogs}
          style={({ pressed }) => [
            styles.button,
            styles.clearButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Clear Logs</Text>
        </Pressable>

        <View style={styles.outputContainer}>
          <Text style={styles.outputLabel}>Execution Logs:</Text>
          <ScrollView
            ref={scrollViewRef}
            style={styles.logContainer}
            contentContainerStyle={styles.logContent}
          >
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <Text key={index} style={styles.logText}>
                  • {log}
                </Text>
              ))
            ) : (
              <Text style={styles.emptyText}>No logs generated yet.</Text>
            )}
          </ScrollView>
        </View>

        <Link href="/" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.linkButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.linkButtonText}>➔ Back to Home</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default FileSystem;

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
    maxWidth: 400,
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
  button: {
    height: 50,
    backgroundColor: "#0071e3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  base64Button: {
    backgroundColor: "#5856d6",
  },
  listDirectoryButton: {
    backgroundColor: "#34c759",
  },
  clearButton: {
    backgroundColor: "#ff9500",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 20,
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
  outputContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f2f2f7",
    height: 180,
  },
  outputLabel: {
    fontSize: 14,
    color: "#86868b",
    marginBottom: 6,
    fontWeight: "500",
  },
  logContainer: {
    backgroundColor: "#f5f5f7",
    borderRadius: 8,
    padding: 12,
    flex: 1,
  },
  logContent: {
    paddingBottom: 8,
  },
  logText: {
    fontSize: 14,
    color: "#1d1d1f",
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 14,
    color: "#86868b",
    fontStyle: "italic",
  },
});
