import "react-native-get-random-values";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import * as Crypto from "expo-crypto";

// A função getThemedStyles foi mantida exatamente como você forneceu.
const getThemedStyles = (theme) => {
  try {
    const isLight = theme === "light";
    const colors = {
      background: isLight ? "#FFFFFF" : "#1A1A1A",
      text: isLight ? "#333333" : "#F0F0F0",
      placeholderText: isLight ? "#999999" : "#888888",
      cardBackground: isLight ? "#FFFFFF" : "#2C2C2C",
      cardBorder: isLight ? "#E0E0E0" : "#444444",
      buttonBackground: isLight ? "#333333" : "#FFFFFF",
      buttonText: isLight ? "#FFFFFF" : "#333333",
      floatingIconColor: isLight ? "#FFFFFF" : "#333333",
      inputBackground: isLight ? "#F5F5F5" : "#3A3A3A",
      inputBorder: isLight ? "#E0E0E0" : "#555555",
      modalBackground: isLight ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.7)",
      modalContentBackground: isLight ? "#FFFFFF" : "#2C2C2C",
      addCardButtonBorder: isLight ? "#E0E0E0" : "#444444",
      deleteIconColor: isLight ? "#888888" : "#AAAAAA",
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Espaçamento para o status bar
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.cardBorder,
      },
      headerTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: colors.text,
        flex: 1,
        textAlign: "center",
      },
      themeToggleButton: {
        padding: 5,
      },
      backButton: {
        padding: 5,
      },
      deckListContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
      },
      deckItemContainer: {
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: colors.cardBorder,
        padding: 15,
        marginTop: 15,
      },
      deckItemHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
      },
      deckTitle: {
        fontSize: 18,
        fontWeight: "500",
        color: colors.text,
        flex: 1,
      },
      deckCardCount: {
        fontSize: 14,
        color: colors.deleteIconColor,
        marginHorizontal: 10,
      },
      deleteDeckButton: {
        padding: 5,
      },
      expandedDeckContent: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 0.5,
        borderTopColor: colors.cardBorder,
      },
      startGameButton: {
        backgroundColor: colors.buttonBackground,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
      },
      startGameButtonText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: "600",
      },
      addCardButton: {
        backgroundColor: "transparent",
        borderColor: colors.addCardButtonBorder,
        borderWidth: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
      },
      addCardButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "600",
      },
      cardListItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.inputBackground,
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        borderWidth: 0.5,
        borderColor: colors.inputBorder,
      },
      cardListText: {
        color: colors.text,
        fontSize: 14,
        flex: 1,
        marginRight: 10,
      },
      deleteCardButton: {
        padding: 5,
      },
      noCardsText: {
        color: colors.deleteIconColor,
        textAlign: "center",
        marginTop: 10,
        fontSize: 14,
      },
      addDeckFloatingButton: {
        position: "absolute",
        bottom: 25,
        right: 25,
        backgroundColor: colors.buttonBackground,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      settingsFloatingButton: {
        position: "absolute",
        bottom: 25,
        left: 25,
        backgroundColor: colors.buttonBackground,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },

      // Estilos de Modal
      modalOverlay: {
        flex: 1,
        backgroundColor: colors.modalBackground,
        justifyContent: "center",
        alignItems: "center",
      },
      modalContainer: {
        width: "85%",
        backgroundColor: colors.modalContentBackground,
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: colors.cardBorder,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 20,
        textAlign: "center",
      },
      modalInput: {
        width: "100%",
        backgroundColor: colors.inputBackground,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: colors.inputBorder,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: colors.text,
        textAlignVertical: "top", // Para TextInput multiline
      },
      modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 10,
      },
      modalButton: {
        backgroundColor: colors.buttonBackground,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginHorizontal: 5,
      },
      modalButtonText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: "600",
      },

      // Estilos da Tela de Estudo
      studyContainer: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "space-between",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      },
      flashcardWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      flashcard: {
        width: Dimensions.get("window").width - 40,
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: colors.cardBorder,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        minHeight: Dimensions.get("window").height * 0.4,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2.62,
      },
      flashcardText: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.text,
        textAlign: "center",
      },
      tapToRevealText: {
        fontSize: 14,
        color: colors.deleteIconColor,
        marginTop: 15,
        fontStyle: "italic",
      },
      navigationButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      navButton: {
        backgroundColor: colors.buttonBackground,
        paddingVertical: 15,
        paddingHorizontal: 15, // Ajustado para telas menores
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5, // Ajustado para telas menores
        alignItems: "center",
      },
      navButtonText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: "600",
      },
      emptyStudyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      },
      emptyStudyText: {
        fontSize: 18,
        color: colors.deleteIconColor,
        textAlign: "center",
      },

      // Estilos da Tela de Backup
      backupContent: {
        flex: 1,
        backgroundColor: colors.background, // Garante que o fundo da tela de backup use o tema
      },
      backupInnerContent: {
        // Adicionado para centralizar o conteúdo dentro da tela de backup
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 20, // Espaço inferior para ScrollView
      },
      backupDescription: {
        fontSize: 16,
        color: colors.text,
        textAlign: "center",
        marginBottom: 30,
        lineHeight: 24,
      },
      backupButton: {
        backgroundColor: colors.buttonBackground,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        width: "80%",
        alignItems: "center",
        marginBottom: 15,
      },
      backupButtonText: {
        color: colors.buttonText,
        fontSize: 18,
        fontWeight: "600",
      },

      // Estilos para o Alerta Personalizado (CustomAlert)
      alertOverlay: {
        flex: 1,
        backgroundColor: colors.modalBackground,
        justifyContent: "center",
        alignItems: "center",
      },
      alertContainer: {
        width: "80%",
        backgroundColor: colors.modalContentBackground,
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: colors.cardBorder,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      alertTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 10,
        textAlign: "center",
      },
      alertMessage: {
        fontSize: 16,
        color: colors.text,
        textAlign: "center",
        marginBottom: 20,
      },
      alertButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
      },
      alertButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 5,
        flex: 1,
        alignItems: "center",
      },
      alertConfirmButton: {
        backgroundColor: colors.buttonBackground,
      },
      alertCancelButton: {
        backgroundColor: "transparent",
        borderColor: colors.buttonBackground,
        borderWidth: 1,
      },
      alertButtonText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: "600",
      },
      alertCancelButtonText: {
        color: colors.buttonBackground,
        fontSize: 16,
        fontWeight: "600",
      },
    });
    return { styles, colors };
  } catch (error) {
    console.error("Erro em getThemedStyles:", error);
    // Retorna um fallback robusto para evitar erros fatais na interface
    return {
      styles: StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#FFF",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
        header: {
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 0.5,
          borderBottomColor: "#E0E0E0",
        },
        headerTitle: {
          fontSize: 24,
          flex: 1,
          textAlign: "center",
          color: "#333",
        },
        themeToggleButton: { padding: 5 },
        backButton: { padding: 5 },
        deckListContent: { paddingHorizontal: 20, paddingBottom: 100 },
        deckItemContainer: {
          backgroundColor: "#FFF",
          borderRadius: 12,
          borderWidth: 0.5,
          borderColor: "#E0E0E0",
          padding: 15,
          marginTop: 15,
        },
        deckItemHeader: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 5,
        },
        deckTitle: { fontSize: 18, flex: 1, color: "#333" },
        deckCardCount: { fontSize: 14, color: "#888", marginHorizontal: 10 },
        deleteDeckButton: { padding: 5 },
        expandedDeckContent: {
          marginTop: 10,
          paddingTop: 10,
          borderTopWidth: 0.5,
          borderTopColor: "#E0E0E0",
        },
        startGameButton: {
          backgroundColor: "#333",
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 10,
        },
        startGameButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
        addCardButton: {
          backgroundColor: "transparent",
          borderColor: "#E0E0E0",
          borderWidth: 1,
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 10,
        },
        addCardButtonText: { color: "#333", fontSize: 16, fontWeight: "600" },
        cardListItem: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#F5F5F5",
          borderRadius: 8,
          padding: 10,
          marginBottom: 8,
          borderWidth: 0.5,
          borderColor: "#E0E0E0",
        },
        cardListText: { color: "#333", fontSize: 14, flex: 1, marginRight: 10 },
        deleteCardButton: { padding: 5 },
        noCardsText: {
          color: "#888",
          textAlign: "center",
          marginTop: 10,
          fontSize: 14,
        },
        addDeckFloatingButton: {
          position: "absolute",
          bottom: 25,
          right: 25,
          backgroundColor: "#333",
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        },
        settingsFloatingButton: {
          position: "absolute",
          bottom: 25,
          left: 25,
          backgroundColor: "#333",
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        },
        modalOverlay: {
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        },
        modalContainer: {
          width: "85%",
          backgroundColor: "#FFF",
          borderRadius: 12,
          padding: 20,
          alignItems: "center",
          borderWidth: 0.5,
          borderColor: "#E0E0E0",
        },
        modalTitle: {
          fontSize: 20,
          color: "#333",
          marginBottom: 20,
          textAlign: "center",
        },
        modalInput: {
          width: "100%",
          backgroundColor: "#F5F5F5",
          borderRadius: 8,
          borderWidth: 0.5,
          borderColor: "#E0E0E0",
          padding: 12,
          marginBottom: 15,
          fontSize: 16,
          color: "#333",
        },
        modalButtonContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          marginTop: 10,
        },
        modalButton: {
          backgroundColor: "#333",
          paddingVertical: 12,
          paddingHorizontal: 25,
          borderRadius: 8,
          marginHorizontal: 5,
        },
        modalButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
        studyContainer: {
          flex: 1,
          backgroundColor: "#FFF",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
        flashcardWrapper: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        flashcard: {
          width: Dimensions.get("window").width - 40,
          backgroundColor: "#FFF",
          borderRadius: 12,
          borderWidth: 0.5,
          borderColor: "#E0E0E0",
          margin: 20,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          minHeight: Dimensions.get("window").height * 0.4,
        },
        flashcardText: {
          fontSize: 22,
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
        },
        tapToRevealText: {
          fontSize: 14,
          color: "#888",
          marginTop: 15,
          fontStyle: "italic",
        },
        navigationButtonsContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          paddingHorizontal: 20,
          marginBottom: 20,
        },
        navButton: {
          backgroundColor: "#333",
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 8,
          flex: 1,
          marginHorizontal: 10,
          alignItems: "center",
        },
        navButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
        emptyStudyContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        emptyStudyText: { fontSize: 18, color: "#888", textAlign: "center" },
        backupContent: {
          flex: 1,
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        },
        backupDescription: {
          fontSize: 16,
          color: "#333",
          textAlign: "center",
          marginBottom: 30,
          lineHeight: 24,
        },
        backupButton: {
          backgroundColor: "#333",
          paddingVertical: 15,
          paddingHorizontal: 40,
          borderRadius: 8,
          width: "80%",
          alignItems: "center",
          marginBottom: 15,
        },
        backupButtonText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
        alertOverlay: {
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        },
        alertContainer: {
          width: "80%",
          backgroundColor: "#FFF",
          borderRadius: 12,
          padding: 20,
          alignItems: "center",
          borderWidth: 0.5,
          borderColor: "#E0E0E0",
        },
        alertTitle: {
          fontSize: 20,
          color: "#333",
          marginBottom: 10,
          textAlign: "center",
        },
        alertMessage: {
          fontSize: 16,
          color: "#333",
          marginBottom: 20,
          textAlign: "center",
        },
        alertButtonContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        },
        alertButton: {
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
          marginHorizontal: 5,
          flex: 1,
          alignItems: "center",
        },
        alertConfirmButton: { backgroundColor: "#333" },
        alertCancelButton: {
          backgroundColor: "transparent",
          borderColor: "#333",
          borderWidth: 1,
        },
        alertButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
        alertCancelButtonText: {
          color: "#333",
          fontSize: 16,
          fontWeight: "600",
        },
      }),
      colors: {
        background: "#FFF",
        text: "#000",
        placeholderText: "#999",
        cardBackground: "#FFF",
        cardBorder: "#E0E0E0",
        buttonBackground: "#333",
        buttonText: "#FFF",
        floatingIconColor: "#FFF",
        inputBackground: "#F5F5F5",
        inputBorder: "#E0E0E0",
        modalBackground: "rgba(0,0,0,0.5)",
        modalContentBackground: "#FFF",
        addCardButtonBorder: "#E0E0E0",
        deleteIconColor: "#888",
      },
    };
  }
};

const DATA_KEY = "@FlashcardsApp:decks"; // Chave para os baralhos
const THEME_KEY = "@FlashcardsApp:theme"; // Chave para o tema

export default function App() {
  const [theme, setTheme] = useState("light"); // O padrão é carregado, mas será substituído pelo valor salvo
  const { styles, colors } = getThemedStyles(theme);

  const [decks, setDecks] = useState([]);
  const [expandedDeckId, setExpandedDeckId] = useState(null);

  // Modals para operações CRUD
  const [isAddDeckModalVisible, setIsAddDeckModalVisible] = useState(false);
  const [newDeckTitle, setNewDeckTitle] = useState("");
  const [isEditDeckModalVisible, setIsEditDeckModalVisible] = useState(false);
  const [editingDeck, setEditingDeck] = useState(null); // Baralho sendo editado

  const [isAddCardModalVisible, setIsAddCardModalVisible] = useState(false);
  const [newCardQuestion, setNewCardQuestion] = useState("");
  const [newCardAnswer, setNewCardAnswer] = useState("");
  const [addingCardToDeckId, setAddingCardToDeckId] = useState(null);
  const [isEditCardModalVisible, setIsEditCardModalVisible] = useState(false);
  const [editingCard, setEditingCard] = useState(null); // Cartão sendo editado

  // Estado do Modo de Estudo
  const [currentScreen, setCurrentScreen] = useState("deckList"); // 'deckList', 'study', 'backup'
  const [studyingDeck, setStudyingDeck] = useState(null);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Estado do Alerta Personalizado
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOnConfirm, setAlertOnConfirm] = useState(() => {});
  const [alertShowCancel, setAlertShowCancel] = useState(false);

  // --- Persistência de Dados (AsyncStorage) ---
  // Carrega os dados (baralhos e tema) ao iniciar o aplicativo
  useEffect(() => {
    loadDecks();
    loadTheme();
  }, []);

  // Salva os baralhos sempre que a lista de `decks` for alterada
  useEffect(() => {
    saveDecks(decks);
  }, [decks]);

  // Salva o tema sempre que ele for alterado
  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  const loadDecks = async () => {
    try {
      const storedDecks = await AsyncStorage.getItem(DATA_KEY);
      if (storedDecks) {
        setDecks(JSON.parse(storedDecks));
      }
    } catch (error) {
      console.error("Erro ao carregar baralhos do AsyncStorage:", error);
    }
  };

  const saveDecks = async (currentDecks) => {
    try {
      // Evita salvar um array vazio na primeira renderização, antes dos dados serem carregados.
      if (decks !== undefined) {
        await AsyncStorage.setItem(DATA_KEY, JSON.stringify(currentDecks));
      }
    } catch (error) {
      console.error("Erro ao salvar baralhos no AsyncStorage:", error);
    }
  };

  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (storedTheme) {
        setTheme(storedTheme);
      }
    } catch (error) {
      console.error("Erro ao carregar tema do AsyncStorage:", error);
    }
  };

  const saveTheme = async (currentTheme) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, currentTheme);
    } catch (error) {
      console.error("Erro ao salvar tema no AsyncStorage:", error);
    }
  };

  // --- Alternar Tema ---
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // --- Componente de Alerta Personalizado (CustomAlert) ---
  // Este componente é renderizado condicionalmente pelo componente principal App
  const CustomAlert = ({
    visible,
    title,
    message,
    onConfirm,
    onCancel,
    showCancelButton,
    confirmText = "OK",
    cancelText = "Cancelar",
  }) => {
    if (!visible) return null;
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={onCancel} // Permite fechar com o botão de voltar no Android
      >
        <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>{title}</Text>
            <Text style={styles.alertMessage}>{message}</Text>
            <View style={styles.alertButtonContainer}>
              {showCancelButton && (
                <TouchableOpacity
                  style={[styles.alertButton, styles.alertCancelButton]}
                  onPress={onCancel}
                >
                  <Text style={styles.alertCancelButtonText}>{cancelText}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.alertButton, styles.alertConfirmButton]}
                onPress={onConfirm}
              >
                <Text style={styles.alertButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // Função para exibir o alerta personalizado
  const showCustomAlert = (
    title,
    message,
    onConfirm,
    showCancel = false,
    confirmText,
    cancelText
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertOnConfirm(() => {
      // Usamos uma função anônima para garantir que a função seja executada após fechar o modal
      setShowAlert(false);
      onConfirm();
    });
    setAlertShowCancel(showCancel);
    setShowAlert(true);
  };

  // Função para esconder o alerta personalizado
  const hideCustomAlert = () => {
    setShowAlert(false);
  };

  // --- Gerenciamento de Baralhos (Decks) ---
  const handleAddDeck = () => {
    if (newDeckTitle.trim()) {
      const newDeck = {
        id: Crypto.randomUUID(),
        title: newDeckTitle.trim(),
        cards: [],
      };
      setDecks((prevDecks) => [...prevDecks, newDeck]);
      setNewDeckTitle("");
      setIsAddDeckModalVisible(false);
    } else {
      showCustomAlert(
        "Atenção",
        "Por favor, digite um título para o baralho.",
        () => {}
      );
    }
  };

  const openEditDeckModal = (deck) => {
    setEditingDeck(deck);
    setNewDeckTitle(deck.title);
    setIsEditDeckModalVisible(true);
  };

  const handleEditDeck = () => {
    if (newDeckTitle.trim() && editingDeck) {
      setDecks((prevDecks) =>
        prevDecks.map((deck) =>
          deck.id === editingDeck.id
            ? { ...deck, title: newDeckTitle.trim() }
            : deck
        )
      );
      setNewDeckTitle("");
      setEditingDeck(null);
      setIsEditDeckModalVisible(false);
    } else {
      showCustomAlert(
        "Atenção",
        "Por favor, digite um título válido para o baralho.",
        () => {}
      );
    }
  };

  const handleDeleteDeck = (deckId) => {
    showCustomAlert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir este baralho? Esta ação não pode ser desfeita.",
      () => {
        setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
        setExpandedDeckId(null); // Recolhe se o baralho excluído estava expandido
      },
      true // Mostra botão de cancelar
    );
  };

  const toggleDeckExpand = (deckId) => {
    setExpandedDeckId((prevId) => (prevId === deckId ? null : deckId));
  };

  // --- Gerenciamento de Cartões (Cards) ---
  const openAddCardModal = (deckId) => {
    setAddingCardToDeckId(deckId);
    setNewCardQuestion("");
    setNewCardAnswer("");
    setIsAddCardModalVisible(true);
  };

  const handleAddCard = () => {
    if (newCardQuestion.trim() && newCardAnswer.trim() && addingCardToDeckId) {
      const newCard = {
        id: Crypto.randomUUID(),
        question: newCardQuestion.trim(),
        answer: newCardAnswer.trim(),
      };
      setDecks((prevDecks) =>
        prevDecks.map((deck) =>
          deck.id === addingCardToDeckId
            ? { ...deck, cards: [...deck.cards, newCard] }
            : deck
        )
      );
      setNewCardQuestion("");
      setNewCardAnswer("");
      setIsAddCardModalVisible(false);
    } else {
      showCustomAlert(
        "Atenção",
        "Por favor, preencha a pergunta e a resposta do cartão.",
        () => {}
      );
    }
  };

  const openEditCardModal = (card, deckId) => {
    setEditingCard(card);
    setAddingCardToDeckId(deckId); // Armazena o deckId temporariamente para a atualização
    setNewCardQuestion(card.question);
    setNewCardAnswer(card.answer);
    setIsEditCardModalVisible(true);
  };

  const handleEditCard = () => {
    if (
      newCardQuestion.trim() &&
      newCardAnswer.trim() &&
      editingCard &&
      addingCardToDeckId
    ) {
      setDecks((prevDecks) =>
        prevDecks.map((deck) =>
          deck.id === addingCardToDeckId
            ? {
                ...deck,
                cards: deck.cards.map((card) =>
                  card.id === editingCard.id
                    ? {
                        ...card,
                        question: newCardQuestion.trim(),
                        answer: newCardAnswer.trim(),
                      }
                    : card
                ),
              }
            : deck
        )
      );
      setNewCardQuestion("");
      setNewCardAnswer("");
      setEditingCard(null);
      setAddingCardToDeckId(null);
      setIsEditCardModalVisible(false);
    } else {
      showCustomAlert(
        "Atenção",
        "Por favor, preencha a pergunta e a resposta válidas para o cartão.",
        () => {}
      );
    }
  };

  const handleDeleteCard = (deckId, cardId) => {
    showCustomAlert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir este cartão?",
      () => {
        setDecks((prevDecks) =>
          prevDecks.map((deck) =>
            deck.id === deckId
              ? {
                  ...deck,
                  cards: deck.cards.filter((card) => card.id !== cardId),
                }
              : deck
          )
        );
      },
      true
    );
  };

  // --- Lógica do Modo de Estudo ---
  const startStudy = (deck) => {
    if (deck.cards.length === 0) {
      showCustomAlert(
        "Baralho Vazio",
        "Não há cartões neste baralho para estudar. Adicione alguns cartões primeiro!",
        () => {}
      );
      return;
    }
    setStudyingDeck(deck);
    // Embaralha os cartões para uma ordem aleatória
    const shuffled = [...deck.cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setCurrentScreen("study");
  };

  const nextCard = () => {
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setShowAnswer(false);
    } else {
      setCurrentScreen("deckList");
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prevIndex) => prevIndex - 1);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  // --- Lógica de Backup e Restauração ---
  const handleBackup = async () => {
    showCustomAlert(
      "Fazer Backup",
      "Isso salvará todos os seus baralhos e cartões em um arquivo JSON. Você pode compartilhá-lo ou salvá-lo em um local seguro.",
      async () => {
        try {
          const jsonString = JSON.stringify(decks);
          const fileUri =
            FileSystem.documentDirectory + "flashcards_backup.json";

          await FileSystem.writeAsStringAsync(fileUri, jsonString);

          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(fileUri, {
              mimeType: "application/json",
              UTI: "public.json",
            });
            showCustomAlert(
              "Sucesso!",
              "Backup realizado e pronto para compartilhar/salvar.",
              () => {}
            );
          } else {
            showCustomAlert(
              "Erro",
              "Compartilhamento não disponível no seu dispositivo. O arquivo foi salvo internamente.",
              () => {}
            );
          }
        } catch (error) {
          console.error("Erro ao fazer backup:", error);
          showCustomAlert(
            "Erro",
            `Falha ao fazer backup. Detalhes: ${error.message}`,
            () => {}
          );
        }
      },
      true // Mostra botão de cancelar
    );
  };

  const handleRestore = async () => {
    showCustomAlert(
      "Restaurar Backup",
      "Isso substituirá seus dados atuais pelos dados do arquivo de backup. Tenha certeza de que é o arquivo correto.",
      async () => {
        try {
          const result = await DocumentPicker.getDocumentAsync({
            type: "application/json",
            copyToCacheDirectory: true,
          });

          if (
            result.canceled === false &&
            result.assets &&
            result.assets.length > 0
          ) {
            const fileUri = result.assets[0].uri;
            const jsonString = await FileSystem.readAsStringAsync(fileUri);
            const restoredData = JSON.parse(jsonString);

            // Validação básica para verificar se parece com nossos dados
            if (
              Array.isArray(restoredData) &&
              restoredData.every(
                (item) =>
                  item.id &&
                  item.title !== undefined &&
                  Array.isArray(item.cards)
              )
            ) {
              setDecks(restoredData);
              showCustomAlert(
                "Sucesso!",
                "Backup restaurado com sucesso!",
                () => {}
              );
            } else {
              showCustomAlert(
                "Erro",
                "O arquivo selecionado não é um backup válido do aplicativo de flashcards. Verifique a estrutura.",
                () => {}
              );
            }
          } else if (result.canceled) {
            // Usuário cancelou o seletor de documentos, nenhuma ação necessária
          }
        } catch (error) {
          console.error("Erro ao restaurar backup:", error);
          showCustomAlert(
            "Erro",
            `Falha ao restaurar backup. Verifique se o arquivo é válido. Detalhes: ${error.message}`,
            () => {}
          );
        }
      },
      true // Mostra botão de cancelar
    );
  };

  // --- Funções de Renderização para Cada Tela ---

  const renderDeckListScreen = () => (
    <ScrollView contentContainerStyle={styles.deckListContent}>
      {decks.length === 0 ? (
        <Text style={[styles.noCardsText, { marginTop: 50, fontSize: 16 }]}>
          Nenhum baralho encontrado. Clique no botão "+" para adicionar um novo!
        </Text>
      ) : (
        decks.map((deck) => (
          <View key={deck.id} style={styles.deckItemContainer}>
            <TouchableOpacity
              onPress={() => toggleDeckExpand(deck.id)}
              activeOpacity={0.7}
            >
              <View style={styles.deckItemHeader}>
                <Text style={styles.deckTitle}>{deck.title}</Text>
                <Text style={styles.deckCardCount}>
                  {deck.cards.length} cartões
                </Text>
                <TouchableOpacity
                  onPress={() => openEditDeckModal(deck)}
                  style={{ padding: 5 }}
                >
                  <Ionicons
                    name="create-outline"
                    size={20}
                    color={colors.deleteIconColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteDeck(deck.id)}
                  style={styles.deleteDeckButton}
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={colors.deleteIconColor}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {expandedDeckId === deck.id && (
              <View style={styles.expandedDeckContent}>
                <TouchableOpacity
                  style={styles.startGameButton}
                  onPress={() => startStudy(deck)}
                >
                  <Text style={styles.startGameButtonText}>Iniciar Estudo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addCardButton}
                  onPress={() => openAddCardModal(deck.id)}
                >
                  <Text style={styles.addCardButtonText}>Adicionar Cartão</Text>
                </TouchableOpacity>

                {deck.cards.length === 0 ? (
                  <Text style={styles.noCardsText}>
                    Nenhum cartão neste baralho. Adicione um!
                  </Text>
                ) : (
                  <FlatList
                    data={deck.cards}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.cardListItem}
                        onPress={() => openEditCardModal(item, deck.id)}
                      >
                        <Text style={styles.cardListText} numberOfLines={1}>
                          {item.question}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleDeleteCard(deck.id, item.id)}
                          style={styles.deleteCardButton}
                        >
                          <Ionicons
                            name="remove-circle-outline"
                            size={20}
                            color={colors.deleteIconColor}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    )}
                    scrollEnabled={false} // Desabilita o scroll do FlatList para permitir que o ScrollView pai o manipule
                  />
                )}
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );

  const renderStudyScreen = () => (
    <View style={styles.studyContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            showCustomAlert(
              "Terminar Estudo?",
              'Deseja realmente sair da sessão de estudo? Seu progresso atual será perdido (não salva o que foi "estudado", apenas sai).',
              () => {
                setCurrentScreen("deckList");
                setStudyingDeck(null);
              },
              true // Mostra botão de cancelar
            );
          }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {studyingDeck?.title} ({currentCardIndex + 1}/{shuffledCards.length})
        </Text>
        <View style={styles.themeToggleButton} />{" "}
        {/* Placeholder para alinhamento */}
      </View>

      {shuffledCards.length === 0 ? (
        <View style={styles.emptyStudyContainer}>
          <Text style={styles.emptyStudyText}>
            Este baralho não tem cartões para estudar.
          </Text>
          <TouchableOpacity
            style={[styles.startGameButton, { marginTop: 20, width: "60%" }]}
            onPress={() => setCurrentScreen("deckList")}
          >
            <Text style={styles.startGameButtonText}>Voltar aos Baralhos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.flashcardWrapper}>
            <TouchableOpacity
              style={styles.flashcard}
              onPress={toggleAnswer}
              activeOpacity={0.8}
            >
              <Text style={styles.flashcardText}>
                {showAnswer
                  ? shuffledCards[currentCardIndex]?.answer
                  : shuffledCards[currentCardIndex]?.question}
              </Text>
              {!showAnswer && (
                <Text style={styles.tapToRevealText}>
                  Toque para revelar a resposta
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.navigationButtonsContainer}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={prevCard}
              disabled={currentCardIndex === 0}
            >
              <Text style={styles.navButtonText}>Anterior</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={nextCard}>
              <Text style={styles.navButtonText}>
                {currentCardIndex === shuffledCards.length - 1
                  ? "Finalizar"
                  : "Próximo"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  const renderBackupScreen = () => (
    <View style={styles.backupContent}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentScreen("deckList")}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Backup e Restauração</Text>
        <View style={styles.themeToggleButton} />{" "}
        {/* Placeholder para alinhamento */}
      </View>
      <ScrollView contentContainerStyle={styles.backupInnerContent}>
        <Text style={styles.backupDescription}>
          Faça backup dos seus baralhos e cartões para um arquivo JSON em seu
          dispositivo. Você pode usar este arquivo para restaurar seus dados ou
          transferi-los para outro dispositivo.
        </Text>
        <TouchableOpacity style={styles.backupButton} onPress={handleBackup}>
          <Text style={styles.backupButtonText}>Fazer Backup</Text>
        </TouchableOpacity>
        <Text style={[styles.backupDescription, { marginTop: 20 }]}>
          Restaure seus baralhos e cartões de um arquivo JSON salvo
          anteriormente. Isso **substituirá todos os seus dados atuais**.
        </Text>
        <TouchableOpacity style={styles.backupButton} onPress={handleRestore}>
          <Text style={styles.backupButtonText}>Restaurar Backup</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // --- Renderização Principal do Aplicativo ---
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        backgroundColor={colors.background}
      />

      {/* Cabeçalho para telas que não têm seu próprio cabeçalho (atualmente DeckList) */}
      {currentScreen === "deckList" && (
        <View style={styles.header}>
          <View style={styles.backButton} />{" "}
          {/* Placeholder para alinhamento */}
          <Text style={styles.headerTitle}>Meus Flashcards</Text>
          <TouchableOpacity
            style={styles.themeToggleButton}
            onPress={toggleTheme}
          >
            <Ionicons
              name={theme === "light" ? "moon" : "sunny"}
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Renderiza a tela atual com base no estado `currentScreen` */}
      {currentScreen === "deckList" && renderDeckListScreen()}
      {currentScreen === "study" && renderStudyScreen()}
      {currentScreen === "backup" && renderBackupScreen()}

      {/* Botões Flutuantes (apenas na tela DeckList) */}
      {currentScreen === "deckList" && (
        <>
          <TouchableOpacity
            style={styles.addDeckFloatingButton}
            onPress={() => setIsAddDeckModalVisible(true)}
          >
            <Ionicons name="add" size={30} color={colors.floatingIconColor} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsFloatingButton}
            onPress={() => setCurrentScreen("backup")}
          >
            <Ionicons
              name="settings-outline"
              size={30}
              color={colors.floatingIconColor}
            />
          </TouchableOpacity>
        </>
      )}

      {/* Modais */}
      {/* Modal Adicionar/Editar Baralho */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isAddDeckModalVisible || isEditDeckModalVisible}
        onRequestClose={() => {
          setIsAddDeckModalVisible(false);
          setIsEditDeckModalVisible(false);
          setNewDeckTitle("");
          setEditingDeck(null);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {isEditDeckModalVisible ? "Editar Baralho" : "Novo Baralho"}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nome do Baralho"
              placeholderTextColor={colors.placeholderText}
              value={newDeckTitle}
              onChangeText={setNewDeckTitle}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setIsAddDeckModalVisible(false);
                  setIsEditDeckModalVisible(false);
                  setNewDeckTitle("");
                  setEditingDeck(null);
                }}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={
                  isEditDeckModalVisible ? handleEditDeck : handleAddDeck
                }
              >
                <Text style={styles.modalButtonText}>
                  {isEditDeckModalVisible ? "Salvar" : "Adicionar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal Adicionar/Editar Cartão */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isAddCardModalVisible || isEditCardModalVisible}
        onRequestClose={() => {
          setIsAddCardModalVisible(false);
          setIsEditCardModalVisible(false);
          setNewCardQuestion("");
          setNewCardAnswer("");
          setEditingCard(null);
          setAddingCardToDeckId(null);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {isEditCardModalVisible ? "Editar Cartão" : "Novo Cartão"}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Pergunta"
              placeholderTextColor={colors.placeholderText}
              value={newCardQuestion}
              onChangeText={setNewCardQuestion}
              multiline
              numberOfLines={3} // Permite mais linhas
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Resposta"
              placeholderTextColor={colors.placeholderText}
              value={newCardAnswer}
              onChangeText={setNewCardAnswer}
              multiline
              numberOfLines={3} // Permite mais linhas
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setIsAddCardModalVisible(false);
                  setIsEditCardModalVisible(false);
                  setNewCardQuestion("");
                  setNewCardAnswer("");
                  setEditingCard(null);
                  setAddingCardToDeckId(null);
                }}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={
                  isEditCardModalVisible ? handleEditCard : handleAddCard
                }
              >
                <Text style={styles.modalButtonText}>
                  {isEditCardModalVisible ? "Salvar" : "Adicionar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Alerta Personalizado (CustomAlert) */}
      <CustomAlert
        visible={showAlert}
        title={alertTitle}
        message={alertMessage}
        onConfirm={alertOnConfirm}
        onCancel={hideCustomAlert}
        showCancelButton={alertShowCancel}
      />
    </SafeAreaView>
  );
}
