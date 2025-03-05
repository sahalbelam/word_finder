import { YoutubeTranscript } from 'youtube-transcript';

const ytLink = 'https://www.youtube.com/watch?v=oE3yG1KIJHk';
const transcript = await YoutubeTranscript.fetchTranscript(ytLink);

const check = "elon musk";
const regex = new RegExp(`\\b${check}\\b`, "i"); // Case-insensitive, whole-word match

const foundEntries = transcript.filter(i => regex.test(i.text));
let a = []
if (foundEntries.length > 0) {
  foundEntries.forEach(i =>
    console.log(`${i.text} at ${i.offset}`)
  );
} else {
  console.log("Not found");
  a = transcript
  console.log(a)
}
