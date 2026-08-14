import { useState, useEffect } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
  getNoteById,
  type Note,
  initDatabase,
} from "@/db";

export default function Index() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Note | null>(null);
  const [title, setTitle] = useState(" ");
  const [content, setContent] = useState(" ");

  useEffect(() => {
    const setup = async () => {
      await initDatabase();
      await loadNotes(); // Load notes once database is initialized
    };
    setup();
  }, []);

  const loadNotes = async () => {
    const allNotes = await getNotes();
    setNotes(allNotes);
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    await loadNotes();
  };

  const handleSave = async () => {
    if (editing) {
      await updateNote(editing.id, title, content);
    } else {
      await addNote(title, content);
    }
    setTitle(" ");
    setContent(" ");
    setEditing(null);
    setModalVisible(false);
    await loadNotes();
  };

  const handleEditNote = (note: Note) => {
    setEditing(note);
    setTitle(note.title);
    setContent(note.content);
    setModalVisible(true);
  };

  const handleNewNote = () => {
    setEditing(null);
    setTitle(" ");
    setContent(" ");
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Note Buddy</Text>
        <Text style={styles.headerSubtitle}>
          {notes.length === 0
            ? "No notes saved yet"
            : `${notes.length} note${notes.length > 1 ? "s" : ""} offline`}
        </Text>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.notesList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteCard}
            onPress={() => handleEditNote(item)}
            activeOpacity={0.7}
          >
            <View style={styles.noteContentContainer}>
              <Text style={styles.noteTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.noteTextPreview} numberOfLines={2}>
                {item.content}
              </Text>
              <Text style={styles.noteDate}>{item.created_at}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color="#333333" />
            <Text style={styles.emptyText}>Create your first note!</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={handleNewNote}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={30} color="#ffffff" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>
              {editing ? "Edit Note" : "New Note"}
            </Text>

            <TextInput
              style={styles.titleInput}
              placeholder="Title"
              placeholderTextColor="#888888"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.contentInput}
              placeholder="Type your note here..."
              placeholderTextColor="#888888"
              value={content}
              onChangeText={setContent}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setTitle("");
                  setContent("");
                  setEditing(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888888",
    marginTop: 4,
  },
  notesList: {
    paddingBottom: 100,
  },
  noteCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  noteContentContainer: {
    flex: 1,
    marginRight: 12,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
  },
  noteTextPreview: {
    fontSize: 14,
    color: "#b0b0b0",
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
    color: "#666666",
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyText: {
    color: "#666666",
    fontSize: 16,
    marginTop: 12,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#ff7f50",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1e1e1e",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  titleInput: {
    backgroundColor: "#2a2a2a",
    color: "#ffffff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  contentInput: {
    backgroundColor: "#2a2a2a",
    color: "#ffffff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 150,
    textAlignVertical: "top",
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#2a2a2a",
    marginRight: 12,
  },
  cancelButtonText: {
    color: "#aaaaaa",
    fontWeight: "600",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#ff7f50",
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});
