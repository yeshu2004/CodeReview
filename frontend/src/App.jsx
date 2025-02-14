import "prismjs/themes/prism-tomorrow.css";
import Prism, { highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";
import { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";

function App() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState(null); // New state for API response status

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function codeReview() {
    try {
      const res = await axios.post("http://localhost:3000/ai/code-review", {
        code,
      });
      console.log(res);
      setReview(res.data);
      setStatus(res.status); // Save response status
    } catch (error) {
      console.error("Error fetching review:", error);
      setStatus(500); // Assume error if request fails
    }
  }

  return (
    <>
      <main className="h-screen w-full bg-zinc-950 flex items-center p-2 overflow-hidden">
        <div className="left h-full w-[45vw] relative overflow-hidden bg-zinc-900 rounded-xl pl-1">
          <div className="code text-white w-full h-full overflow-y-auto">
            <Editor
              value={code}
              onValueChange={(code) => {
                setCode(code);
                Prism.highlightAll();
              }}
              highlight={(code) => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 13.5,
              }}
              className="w-full h-full leading-none overflow-y-auto"
            />
          </div>
          <div
            onClick={codeReview}
            className="review absolute bottom-5 right-5 px-5 py-2 rounded-full font-semibold bg-blue-500 text-white select-none cursor-pointer"
          >
            Review
          </div>
        </div>
        <div className="right h-full w-[55vw] text-white relative py-2 px-5">
          {review.length !== 0 ? (
            status !== 200 ? (
              <p className="text-red-500 font-semibold text-center font-semibold">
                Error: Unable to fetch review.
              </p>
            ) : (
              <div className=" font-semibold overflow-auto h-full">
                <Markdown>{review}</Markdown>
              </div>
            )
          ) : (
            <p className="flex items-center justify-center h-full text-center text-zinc-400 font-semibold">
              Don&apos;t be shy! Start coding, and I&apos;ll help you improve
              it.
            </p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
