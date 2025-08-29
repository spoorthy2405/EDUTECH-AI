EDU-TECH is an **AI-powered platform** for generating and evaluating mock exams. It supports **online and offline exam modes**, integrates **YouTube for learning**, and provides access to **previous exam papers**. The system is designed to help students prepare more efficiently by offering **personalized mock tests** and automated evaluation using **AI and OCR**.
---

## 🚀 Features

* 🎯 **AI-powered Mock Test Generation** using Gemini 1.5 Pro API.
* 📝 **Offline Accessibility**: Download question papers, write answers on paper, and re-upload for evaluation.
* 🔍 **OCR-based Evaluation** with Google Vision API for handwritten answers.
* 📊 **Automated Scoring & Feedback** displayed instantly on the frontend.
* 🎥 **YouTube Integration** for topic-based learning.
* 📚 **Previous Papers Repository** for practice.
* 🌎 Supports **students across 40+ countries** and multiple exam categories.

---

## 🛠 Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Cloud Storage:** Google Cloud Buckets
* **AI Models:** Gemini 1.5 Pro (question generation), Google Vision API (OCR evaluation)
* **APIs:** YouTube API (video integration)

---

## ⚙️ How It Works

1. **Mock Test Generation**

   * User selects exam → backend requests Gemini 1.5 Pro → AI generates a unique question paper.
2. **Online Mode**

   * Student answers online → answers are compared with correct solutions → score displayed.
3. **Offline Mode**

   * Student downloads paper → writes answers → uploads scanned sheet.
   * Google Vision API extracts text → compared with stored answers → score generated.
4. **Learning Support**

   * Students can refer to previous papers or access relevant YouTube videos for help.

---

## 📊 Results / Impact

* Saves time by combining **mock tests, evaluation, and learning** in one platform.
* Provides **personalized question papers** every time.
* Supports **students with low internet connectivity** through offline mode.
* Encourages **efficient preparation and self-assessment** for competitive exams.

---

## 🔮 Future Enhancements

* 🧠 **Adaptive Personalized Learning** based on student performance.
* 🌐 **Multilingual Support** for regional inclusivity.
* 🕹 **Gamification** with badges, levels, and rewards.
* 📱 **Full Offline Mode** for the entire application.

---

## ⚡ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/edutech-ai.git
cd edutech-ai
```

### 2. Backend Setup

```bash
cd backend
npm install
```

* Create a `.env` file in `/backend` and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLOUD_BUCKET=your_google_bucket_name
GOOGLE_APPLICATION_CREDENTIALS=path_to_your_service_account.json
YOUTUBE_API_KEY=your_youtube_api_key
```

* Run the backend:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

* Create a `.env` file in `/frontend` and add:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
```

* Run the frontend:

```bash
npm start
```

### 4. Access the App

* Open your browser and go to:

```
http://localhost:3000
```

---

## 👩‍💻 Team & Contributions

* **Frontend & UI:** Built with React.js for interactivity and responsiveness.
* **Backend & APIs:** Node.js + Express.js + Gemini 1.5 Pro + Google Vision API.
* **Database:** MongoDB for user data and test history.
* **Cloud:** Google Cloud Buckets for secure storage.

---

