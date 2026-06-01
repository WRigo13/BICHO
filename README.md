# 🎲 Jogo do Bicho — App Expo

App mobile para Android e iOS feito com React Native + Expo.

---

## 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior) → https://nodejs.org
- **Expo Go** no celular → Play Store ou App Store (gratuito)
- Celular e computador na **mesma rede Wi-Fi**

---

## 🚀 Como rodar

### 1. Instalar dependências
```bash
cd jogo-do-bicho
npm install
```

### 2. Iniciar o projeto
```bash
npx expo start
```

### 3. Abrir no celular
- Abra o app **Expo Go** no seu celular
- Escaneie o **QR code** que aparecer no terminal
- O app abre na hora! ✅

---

## 📦 Gerar APK (Android)

### Instalar EAS CLI
```bash
npm install -g eas-cli
eas login
```

### Configurar build
```bash
eas build:configure
```

### Gerar APK para instalar direto
```bash
eas build --platform android --profile preview
```
> Isso gera um APK que você pode baixar e instalar em qualquer Android.

### Enviar para a Play Store
```bash
eas build --platform android --profile production
eas submit --platform android
```

---

## 🍎 Gerar para iOS

> Requer conta Apple Developer (US$ 99/ano)

```bash
eas build --platform ios
eas submit --platform ios
```

---

## 📁 Estrutura do projeto

```
jogo-do-bicho/
├── App.js                        # Entrada principal, navegação, header
├── app.json                      # Config do Expo (nome, ícone, splash)
├── package.json
├── src/
│   ├── data.js                   # Dados dos animais, modalidades, lógica
│   └── screens/
│       ├── ApostarScreen.js      # Tela principal de apostas
│       ├── BichosScreen.js       # Tabela de bichos e multiplicadores
│       └── HistoricoScreen.js    # Histórico de apostas
└── assets/
    ├── icon.png                  # Ícone do app (1024x1024)
    ├── splash.png                # Splash screen
    └── adaptive-icon.png         # Ícone adaptativo Android
```

---

## 🎨 Personalizar

### Mudar nome do app
Em `app.json`, altere:
```json
"name": "Jogo do Bicho",
"slug": "jogo-do-bicho"
```

### Mudar saldo inicial
Em `App.js`, linha:
```js
const [saldo, setSaldo] = useState(100);
```

### Adicionar ícone real
Substitua os arquivos em `assets/`:
- `icon.png` → 1024×1024 px
- `splash.png` → 1284×2778 px  
- `adaptive-icon.png` → 1024×1024 px (Android)

---

## 🛠️ Problemas comuns

**"Metro bundler não conecta"**
→ Verifique se celular e PC estão na mesma rede Wi-Fi
→ Tente `npx expo start --tunnel` (usa ngrok)

**"expo: command not found"**
→ Use `npx expo start` (com npx na frente)

**Tela preta no celular**
→ Feche e reabra o Expo Go
→ Sacuda o celular para abrir o menu de debug

---

## 📞 Suporte
Documentação oficial: https://docs.expo.dev
