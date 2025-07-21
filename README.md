# Flashcards Minimal

Flashcards Minimal é um aplicativo móvel moderno, intuitivo e rico em recursos, projetado para ajudar os usuários a estudar e memorizar informações de forma eficaz, sendo particularmente útil para o aprendizado de idiomas e disciplinas acadêmicas. Ele permite criar baralhos de flashcards personalizados, adicionar perguntas e respostas, e engajar-se em um modo de estudo interativo. O aplicativo também inclui funcionalidades robustas de backup e restauração, garantindo que seus valiosos dados de estudo estejam sempre seguros.

## Baixe o App Aqui!!

Acessa a página de Release para baixar o Apk do aplicativo, não está na Play Store: https://github.com/guilherme23x/FlashCards-Minimal/releases/tag/flashcard

## Sumário

* [Sobre o Aplicativo](#sobre-o-aplicativo)
* [Capturas de Tela](#capturas-de-tela)
* [Tecnologias](#tecnologias)
* [Configuração](#configuração)
* [Abordagem](#abordagem)
* [Status](#status)
* [Créditos](#créditos)
* [Licença](#licença)

## Sobre o Aplicativo

Flashcards Pro é um aplicativo de flashcards versátil construído com React Native e Expo. Seu propósito principal é facilitar o aprendizado e a memorização através de baralhos de flashcards personalizáveis. Os usuários podem criar, editar e excluir baralhos e cartões individuais. O aplicativo possui um modo de estudo dedicado com embaralhamento de cartões e a capacidade de revelar respostas, aprimorando a experiência de aprendizado.

Key features include:

* **Gerenciamento de Baralhos**: Crie, edite e exclua baralhos de flashcards.
* **Gerenciamento de Cartões**: Adicione, edite e exclua flashcards individuais dentro dos baralhos, com campos separados para perguntas e respostas.
* **Modo de Estudo**: Pratique seu conhecimento com uma interface de estudo dedicada em tela cheia, completa com embaralhamento de cartões e funcionalidade de tocar para revelar.
* **Temas**: Alterne entre temas claros e escuros para uma experiência visual personalizada.
* **Persistência de Dados**: Todos os baralhos e cartões são automaticamente salvos localmente em seu dispositivo usando AsyncStorage.
* **Backup e Restauração**: Exporte facilmente todo o seu conjunto de dados para um arquivo JSON para backup e importe-o de volta, perfeito para transferir dados entre dispositivos ou garantir a segurança dos dados.
* **Interface Amigável**: Design limpo e intuitivo focado na facilidade de uso.
* **Alertas Personalizados**: Feedback aprimorado ao usuário com alertas modais personalizados para ações como confirmação de exclusão.

O design do aplicativo enfatiza a clareza e a facilidade de navegação, tornando-o uma ferramenta ideal para estudantes, aprendizes de idiomas e qualquer pessoa que queira dominar novos conceitos.

## Capturas de Tela

<p align="center">
  <img width="220" heigth="200" alt="1" src="https://github.com/user-attachments/assets/285fbe04-4ca7-4cfd-84cd-1fae346bea87" />
  <img width="220" heigth="200"  alt="2" src="https://github.com/user-attachments/assets/89645772-09aa-4b3a-aded-a20a68123130" />
<img width="220"  heigth="280" alt="3" src="https://github.com/user-attachments/assets/a9627c07-bf3a-482d-93cc-0b3a7fbac9e8" />
<img width="220" heigth="200" alt="4" src="https://github.com/user-attachments/assets/cbcf76c2-bbd2-4fe8-9b21-7ea3e9447536" />

</p>
## Tecnologias

Este aplicativo é construído utilizando as seguintes tecnologias e bibliotecas:

* **React Native**: O core framework para construção de aplicativos móveis multiplataforma.
* **Expo**: Um framework e plataforma para aplicativos React universais, fornecendo ferramentas e serviços para simplificar o desenvolvimento.
    * `expo-file-system`: Para interagir com o sistema de arquivos do dispositivo (usado para backup/restauração).
    * `expo-sharing`: Para compartilhar arquivos gerados durante o backup.
    * `expo-document-picker`: Para selecionar arquivos de backup durante a restauração.
    * `expo-crypto`: Para gerar IDs únicos para baralhos e cartões.
    * `@expo/vector-icons`: Para um rico conjunto de ícones personalizáveis (Ionicons).
* **AsyncStorage (do `@react-native-async-storage/async-storage`)**: Para armazenamento local persistente de baralhos e preferências de tema.
* **JavaScript (ES6+)**: A linguagem de programação utilizada para o desenvolvimento.
* **Node.js**: Ambiente de execução para rodar as ferramentas de desenvolvimento do React Native.

## Configuração

To run this project locally, follow these steps:

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/guilherme23x/FlashCards-Minimal.git)
    cd FlashcardsPro
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Execute o aplicativo:**

    ```bash
    npx expo start
    ```

    Isso abrirá as Ferramentas de Desenvolvimento Expo no seu navegador. A partir daí, você pode:
    * Escanear o QR code com o aplicativo **Expo Go** no seu dispositivo físico (iOS ou Android).
    * Executar em um emulador Android.
    * Executar em um simulador iOS (requer Xcode).

## Abordagem

A arquitetura do aplicativo segue uma estrutura baseada em componentes, comum no desenvolvimento React Native.

* **Gerenciamento de Estado**: Os hooks `useState` e `useEffect` do React são amplamente utilizados para gerenciar o estado do aplicativo, incluindo baralhos, cartões, tema e visibilidade da UI (modais, alertas). O `AsyncStorage` lida com a persistência de dados entre as sessões do aplicativo.
* **Estilização**: Os estilos são gerenciados usando `StyleSheet.create` para desempenho e organização. Uma função `getThemedStyles` gera estilos dinamicamente com base no `theme` atual (claro ou escuro), garantindo uma aparência consistente em todo o aplicativo e fornecendo uma clara separação de responsabilidades para a apresentação da UI. Essa abordagem centraliza as definições de cores e regras de estilo, tornando a troca de tema perfeita.
* **Padrões de Layout**: O layout segue padrões comuns de UI móvel, utilizando componentes `View`, `Text`, `TouchableOpacity`, `ScrollView`, `FlatList`, `Modal` e `TextInput`. `SafeAreaView` e `StatusBar` garantem a exibição correta em vários dispositivos.
* **Experiência do Usuário (UX)**:
    * **Temas**: A capacidade de alternar entre os modos claro e escuro atende à preferência do usuário e à acessibilidade.
    * **Feedback**: Alertas modais personalizados fornecem confirmação e informações claras para ações críticas do usuário, melhorando a experiência geral do usuário em comparação com os alertas nativos.
    * **Manipulação de Teclado**: `KeyboardAvoidingView` é usado em modais para garantir que os campos de entrada não sejam obscured pelo teclado na tela, principalmente no iOS.
    * **Iconografia**: `Ionicons` são usados em todo o aplicativo para sinais visuais claros e navegação intuitiva.
* **Estrutura de Dados**: Baralhos e cartões são armazenados como objetos JavaScript dentro de arrays, serializados para JSON para `AsyncStorage` e arquivos de backup. Cada baralho e cartão possui um `id` único gerado por `expo-crypto` para identificação e manipulação confiáveis.
* **Backup e Restauração**: A implementação utiliza `expo-file-system` para operações de arquivo e `expo-sharing` para fácil compartilhamento de arquivos de backup. `expo-document-picker` facilita a seleção de arquivos de backup para restauração. Uma validação básica é realizada nos dados restaurados para evitar o carregamento de arquivos corrompidos ou malformados.

O projeto foi construído principalmente usando o **Google AI Studio** com o modelo **Gemini Flash 2.5**, que guiou o desenvolvimento das funcionalidades e lógicas centrais. O design da UI e os refinamentos iterativos foram feitos usando o **VS Code** para codificação, o **Figma** para a conceituação inicial e o planejamento do layout, e o **Iconoir** para selecionar os ícones apropriados. **Expo.dev** e o **aplicativo Expo Go** foram cruciais para o desenvolvimento rápido, teste e depuração em vários dispositivos.

## Créditos

* **Desenvolvido por**: Guilherme23x
* **Assistência de IA**: Google AI Studio com Gemini Flash 2.5
* **Ferramentas de Design**: Figma, Iconoir
* **Ferramentas de Desenvolvimento**: VS Code, Expo.dev, aplicativo Expo Go

## Licença

Este projeto é licenciado sob a **Licença MIT**. Isso significa que você é livre para usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender cópias do software, e para permitir que as pessoas a quem o software é fornecido o façam, sujeitas às seguintes condições:

O aviso de direitos autorais acima e este aviso de permissão devem ser incluídos em todas as cópias ou partes substanciais do Software.

**O SOFTWARE É FORNECIDO "COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO, EXPRESSA OU IMPLÍCITA, INCLUINDO, MAS NÃO SE LIMITANDO ÀS GARANTIAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM FIM ESPECÍFICO E NÃO VIOLAÇÃO. EM NENHUM CASO OS AUTORES OU DETENTORES DOS DIREITOS AUTORAIS SERÃO RESPONSÁVEIS POR QUALQUER RECLAMAÇÃO, DANOS OU OUTRA RESPONSABILIDADE, SEJA EM UMA AÇÃO DE CONTRATO, DELITO OU DE OUTRA FORMA, DECORRENTE DE, OU EM CONEXÃO COM O SOFTWARE OU O USO OU OUTRAS NEGOCIAÇÕES NO SOFTWARE.**

© 2025 Guilherme23x. Todos os direitos reservados.
