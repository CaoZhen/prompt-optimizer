# AI Prompt Optimizer (图片提示词优化)

A professional AI image prompt optimization tool designed to help creators generate high-quality Midjourney, Stable Diffusion, DALL-E, and Kling prompts. This application mimics the workflow of professional prompt engineers, allowing for bi-directional optimization between natural language and structured prompts.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38bdf8)

## ✨ Key Features

### 🚀 Quick Mode (快速模式)
- **Natural Language Input**: Describe your idea in simple sentences (Chinese or English).
- **DeepSeek Integration**: Uses DeepSeek AI to analyze and restructure your input into a professional format.
- **Client-Side API Key**: Securely configure your own DeepSeek API key (stored locally) for privacy.

### 🛠️ Standard Mode (标准模式)
- **Structured Editing**: Fine-tune every aspect of your prompt using specialized fields:
  - **Core Elements**: Subject, Action, Environment, Theme.
  - **Visual Modifiers**: Style, Lighting, Effects, Color, Mood, Composition.
  - **Technical Specs**: Quality, Aspect Ratio, Model Versions.
- **Multi-Platform Support**: Tailored output for Midjourney, Stable Diffusion, and DALL-E/Kling.
- **Visual Feedback**: Real-time prompt preview and easy copy functionality.

### 🌐 Internationalization (i18n) & Localization
- **Bilingual Interface**: Fully supported **Chinese** and **English** UI.
- **Dual-Language System Prompts**: The AI logic is natively localized. Switching to Chinese in the UI ensures the AI receives robust system instructions in Chinese (not just translation), strictly enforcing Chinese output for better nuance and control.
- **Smart Style Suggester**: Dynamic AI suggestions for visual styles based on your input, automatically adapting to your selected language.
- **One-Click Toggle**: Switch languages instantly from the settings menu.
- **Localized Placeholders**: Context-aware examples and descriptions for each language.

### 📚 Templates
- **Curated Library**: Built-in professional templates for Characters, Scenes, Products, and Art styles.
- **One-Click Apply**: Load a template and immediately start refining in Standard Mode.

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + `tailwindcss-animate`
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Logic**: Custom prompt engineering logic + DeepSeek API integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- A DeepSeek API Key (optional, for Quick Mode AI features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CaoZhen/prompt-optimizer.git
   cd prompt-optimizer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Privacy

- **Local Storage**: Your custom API keys are stored **only in your browser's local storage**. They are never sent to our servers.
- **Direct Connection**: Quick Mode communicates directly with the DeepSeek API from the server-side proxy (or using your client key), ensuring minimal latency.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
