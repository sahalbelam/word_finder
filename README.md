# YouTube WordFinder

A web application that helps users find specific words in YouTube videos by searching through video transcripts and jumping directly to those moments.

## Features

- 🔍 Search for specific words within YouTube video transcripts
- ⌚ Jump directly to the exact timestamp where the word appears
- 📝 View all occurrences of the searched word with context
- 🎯 Click on any result to navigate to that specific moment in the video
- 💨 Fast and efficient search using regex pattern matching
- 📱 Responsive design that works on desktop and mobile devices

## Technologies Used

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- YouTube Transcript API

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn package manager
- A YouTube Data API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/youtube-wordfinder.git
cd youtube-wordfinder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Paste a YouTube video URL into the first input field
2. Enter the word you want to search for in the second input field
3. Click the "Search" button
4. Browse through the results showing all occurrences of your word
5. Click on any result to jump to that moment in the video

## API Routes

The application uses the following API endpoint:

- `POST /api/yt`
  - Accepts a YouTube video ID
  - Returns the video transcript with timestamps

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact

Sahal Belam - [https://www.linkedin.com/in/sahal-belam-11531b232/]

Project Link: [https://github.com/sahalbelam/youtube-wordfinder](https://github.com/yourusername/youtube-wordfinder)

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/)
- [Next.js Documentation](https://nextjs.org/docs)
