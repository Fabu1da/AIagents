# ✨ AI Assistant

A modern, professionally-designed AI chat application built with React, TypeScript, and Tailwind CSS. Chat with OpenAI's GPT-4 model with a beautiful dark neon theme, persistent chat history, and smooth animations.

## 🎨 Features

- **Modern Dark Theme** - Sleek dark UI with neon cyan and pink accents
- **OpenAI Integration** - Powered by GPT-4o-mini for intelligent responses
- **Chat Persistence** - Automatically saves chat history to browser localStorage
- **Copy to Clipboard** - Quick copy button for assistant responses with visual feedback
- **New Chat** - Clear conversation with confirmation dialog
- **Smooth Animations** - Elegant slide-in, fade, and typing animations
- **Responsive Design** - Works beautifully on desktop and tablet devices
- **Type-Safe** - Built with TypeScript for reliability and better developer experience
- **Error Handling** - Graceful error messages for API failures

## 🛠 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS v4 with custom dark theme
- **Build Tool**: Vite 7.3.1
- **API**: OpenAI GPT-4o-mini
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: Browser localStorage API

## 📋 Prerequisites

- Node.js 18+ and npm
- OpenAI API key (get one at [platform.openai.com](https://platform.openai.com/account/api-keys))

## 🚀 Getting Started

### 1. Clone or Download the Project

```bash
cd Agent
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root:

```
VITE_REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```

**How to get your OpenAI API Key:**
1. Go to [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
2. Sign up or log in to your OpenAI account
3. Click "Create new secret key"
4. Copy the key and paste it into your `.env.local` file
5. ⚠️ **DO NOT** commit this file to GitHub (it's in `.gitignore`)

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy.

## 💻 Usage

1. Type your message in the input field
2. Press Enter or click the send button (📤)
3. Wait for the AI assistant to respond
4. Hover over assistant messages to see the copy button (📋)
5. Click "New Chat" to clear the conversation
6. Your chat history is automatically saved and restored when you visit again

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🌍 Deployment

### Deploy to Vercel (Recommended - 5 minutes)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and select your repository
4. Add environment variable:
   - Name: `VITE_REACT_APP_OPENAI_API_KEY`
   - Value: Your OpenAI API key
5. Click "Deploy"

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repo to [netlify.com](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_REACT_APP_OPENAI_API_KEY`
6. Deploy



## 🎨 Design System

### Colors

- **Primary Accent**: Neon Cyan (#00d9ff)
- **Secondary Accent**: Neon Pink (#ff006e)
- **Dark Background**: #0a0e27 - #1a2847 (dark-950 to dark-800)

### Animations

- Slide-up entrance animation
- Smooth message slide-in with staggered delay
- Typing indicator bounce animation
- Hover glow effects on interactive elements

## 🔐 Security Notes

- Never commit your `.env.local` file
- The API key is sent directly from the browser to OpenAI
- Consider using a backend service for production for better security
- Monitor your OpenAI API usage to avoid unexpected charges

## 📊 API Usage

The app uses OpenAI's `gpt-4o-mini` model with:
- Temperature: 0.7 (creative but coherent)
- Max tokens: 500 (reasonable response length)
- Cost: ~$0.00015 per message (very cheap)

## 🚧 Future Enhancements

- [ ] Markdown rendering for code blocks
- [ ] Multiple conversation history sidebar
- [ ] Model selection dropdown (GPT-4 vs GPT-4o-mini)
- [ ] Temperature and token slider controls
- [ ] Export chat as JSON or PDF
- [ ] Dark/Light theme toggle
- [ ] Mobile app version
- [ ] Voice input/output
- [ ] Conversation search

## 📝 License

MIT License - feel free to use this project for your portfolio!

## 🤝 Contributing

Feel free to fork, modify, and improve! This is a great starting point for learning React, TypeScript, Tailwind CSS, and API integration.

## 📧 Support

For issues or questions:
1. Check your OpenAI API key is set correctly
2. Ensure you have sufficient API credits
3. Check browser console for error messages (F12 → Console tab)

---

**Made with ❤️ for portfolio showcase**
```
# AIagents
