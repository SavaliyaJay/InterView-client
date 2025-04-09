"use client";

import "regenerator-runtime/runtime"; // Add this line
import { useState, useCallback, useRef, useEffect } from "react";
import pdfToText from "react-pdftotext";
import Papa from "papaparse";
import mammoth from "mammoth";
import {
  FiFile,
  FiFileText,
  FiGrid,
  FiUpload,
  FiX,
  FiGlobe,
  FiSend,
  FiInfo,
  FiCheckCircle,
  FiRefreshCw,
  FiStar,
  FiMic,
  FiMicOff
} from "react-icons/fi";
import Swal from "sweetalert2";
import Link from "next/link";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const FileIcon = ({ type, className = "w-5 h-5" }) => {
  const icons = {
    pdf: <FiFile className={`${className} text-red-400`} />,
    csv: <FiGrid className={`${className} text-green-400`} />,
    doc: <FiFileText className={`${className} text-blue-400`} />,
    text: <FiFileText className={`${className} text-gray-400`} />,
    web: <FiGlobe className={`${className} text-purple-400`} />
  };
  return icons[type] || <FiFile className={`${className} text-gray-400`} />;
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400" />
    <span className="ml-2 text-gray-400">Processing...</span>
  </div>
);

export default function FileExtractor() {
  const [fileResults, setFileResults] = useState([]);
  const [loadingStates, setLoadingStates] = useState({
    pdf: false,
    csv: false,
    doc: false,
    text: false,
    web: false
  });
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [url, setUrl] = useState("");
  const [isScrapingUrl, setIsScrapingUrl] = useState(false);
  const [selectedFilesForChat, setSelectedFilesForChat] = useState(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const fileInputRef = useRef(null);

  // Chat states
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isSending, setIsSending] = useState(false);

  // Interview states
  const [interviewMode, setInterviewMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [lastRating, setLastRating] = useState(null);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Toggle function for file selection
  const toggleFileForChat = (fileId) => {
    setSelectedFilesForChat((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  };

  const handleFiles = async (files) => {
    if (!files?.length) return;
    setError(null);

    for (const file of files) {
      try {
        const fileId = Date.now();
        let fileContent = null;
        let fileType = "";

        if (file.type === "application/pdf") {
          setLoadingStates((prev) => ({ ...prev, pdf: true }));
          const text = await pdfToText(file);
          fileContent = text;
          fileType = "pdf";
          setLoadingStates((prev) => ({ ...prev, pdf: false }));
        } else if (file.type === "text/csv" || file.type.includes("excel")) {
          setLoadingStates((prev) => ({ ...prev, csv: true }));
          fileType = "csv";
          await new Promise((resolve, reject) => {
            Papa.parse(file, {
              complete: (results) => {
                fileContent = results.data;
                setLoadingStates((prev) => ({ ...prev, csv: false }));
                resolve();
              },
              header: true,
              skipEmptyLines: true,
              error: (error) => {
                setError(`Failed to parse ${file.name}: ${error.message}`);
                setLoadingStates((prev) => ({ ...prev, csv: false }));
                reject(error);
              }
            });
          });
        } else if (file.type.includes("word") || file.type === "application/msword") {
          setLoadingStates((prev) => ({ ...prev, doc: true }));
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          fileContent = result.value;
          fileType = "doc";
          setLoadingStates((prev) => ({ ...prev, doc: false }));
        } else if (file.type === "text/plain") {
          setLoadingStates((prev) => ({ ...prev, text: true }));
          fileType = "text";
          await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              fileContent = e.target.result;
              setLoadingStates((prev) => ({ ...prev, text: false }));
              resolve();
            };
            reader.onerror = () => {
              setError(`Failed to read ${file.name}`);
              setLoadingStates((prev) => ({ ...prev, text: false }));
              reject("Failed to read file");
            };
            reader.readAsText(file);
          });
        }

        const newFile = {
          id: fileId,
          name: file.name,
          type: fileType,
          content: fileContent,
          metadata: {
            source: "upload",
            filename: file.name,
            filetype: file.type
          }
        };

        setFileResults((prev) => [...prev, newFile]);

        // Show success notification
        Swal.fire({
          icon: "success",
          title: "File Uploaded",
          text: `${file.name} has been successfully uploaded.`,
          timer: 2000,
          showConfirmButton: false,
          background: "#222",
          color: "#fff"
        });

        // After first file is uploaded, automatically start interview mode
        if (!interviewMode && !currentQuestion) {
          startInterviewMode();
        }
      } catch (err) {
        setError(`Failed to process ${file.name}: ${err.message}`);
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: `Failed to process ${file.name}: ${err.message}`,
          background: "#222",
          color: "#fff"
        });
      }
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const removeFile = (id) => {
    setFileResults((prev) => prev.filter((file) => file.id !== id));
    setSelectedFilesForChat((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const scrapeWebsite = async () => {
    if (!url) return;
    setIsScrapingUrl(true);
    setError(null);

    try {
      // Use a proxy API to avoid CORS issues
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch website content");
      }

      const data = await response.json();

      const newFile = {
        id: Date.now(),
        name: url,
        type: "web",
        content: data.content,
        metadata: {
          source: "web",
          title: data.title,
          description: data.description,
          url: url
        }
      };

      setFileResults((prev) => [...prev, newFile]);
      setUrl("");

      // Show success notification
      Swal.fire({
        icon: "success",
        title: "Website Scraped",
        text: `Content from ${url} has been successfully scraped.`,
        timer: 2000,
        showConfirmButton: false,
        background: "#222",
        color: "#fff"
      });

      // After first URL is scraped, automatically start interview mode
      if (!interviewMode && !currentQuestion) {
        startInterviewMode();
      }
    } catch (err) {
      setError(`Failed to scrape website: ${err.message}`);
      Swal.fire({
        icon: "error",
        title: "Scraping Failed",
        text: `Failed to scrape website: ${err.message}`,
        background: "#222",
        color: "#fff"
      });
    } finally {
      setIsScrapingUrl(false);
    }
  };

  const showFileContent = (file) => {
    let content = "";

    if (file.type === "csv" && Array.isArray(file.content)) {
      // Create an HTML table representation for CSV
      const headers = Object.keys(file.content[0] || {});
      content = `
        <table class="w-full border-collapse border border-gray-700">
          <thead>
            <tr>
              ${headers
                .map(
                  (header) => `<th class="border border-gray-700 p-2 bg-gray-800">${header}</th>`
                )
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${file.content
              .map(
                (row) => `
                <tr>
                  ${headers
                    .map((header) => `<td class="border border-gray-700 p-2">${row[header]}</td>`)
                    .join("")}
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      `;
    } else if (file.type === "web") {
      content = `
        <div class="mb-4 bg-gray-800 p-4 rounded">
          <h3 class="font-bold">${file.metadata.title || "No Title"}</h3>
          <p class="text-sm text-gray-400">${file.metadata.description || "No Description"}</p>
          <a href="${file.metadata.url}" target="_blank" class="text-blue-400 hover:underline">${
            file.metadata.url
          }</a>
        </div>
        <div>${file.content}</div>
      `;
    } else {
      // Simple text content for PDF, DOC, TXT
      content = `<pre class="whitespace-pre-wrap">${file.content}</pre>`;
    }

    Swal.fire({
      title: file.name,
      html: content,
      width: "80%",
      customClass: {
        container: "swal-wide",
        content: "max-h-screen overflow-auto"
      },
      background: "#222",
      color: "#fff"
    });
  };

  // Function to start interview mode
  const startInterviewMode = async () => {
    setInterviewMode(true);

    // If files are uploaded, select them all for the interview
    if (fileResults.length > 0) {
      const allFileIds = new Set(fileResults.map((file) => file.id));
      setSelectedFilesForChat(allFileIds);
    }

    // Generate the first question
    generateNewQuestion();
  };

  // Function to generate a new interview question
  const generateNewQuestion = async () => {
    setIsGeneratingQuestion(true);
    setCurrentQuestion(null);
    setLastRating(null);

    const selectedFiles = fileResults.filter((file) => selectedFilesForChat.has(file.id));

    if (selectedFiles.length === 0) {
      setError("Please upload or select at least one file to start the interview.");
      setIsGeneratingQuestion(false);
      return;
    }

    // Generate combined content from selected files
    let combinedContent = "";

    selectedFiles.forEach((file) => {
      let fileTypeTag = "unknown";
      switch (file.type) {
        case "pdf":
          fileTypeTag = "pdf";
          break;
        case "csv":
          fileTypeTag = "csv";
          break;
        case "doc":
          fileTypeTag = "doc";
          break;
        case "text":
          fileTypeTag = "text";
          break;
        case "web":
          fileTypeTag = "website";
          break;
        default:
          fileTypeTag = "unknown";
      }

      combinedContent += `<document>\n`;
      for (const key in file.metadata) {
        combinedContent += `  <${key}>${file.metadata[key]}</${key}>\n`;
      }

      combinedContent += `  <${fileTypeTag}>\n`;

      if (fileTypeTag === "csv") {
        if (Array.isArray(file.content)) {
          const headers = Object.keys(file.content[0]);
          const csvString = [
            headers.join(","),
            ...file.content.map((row) => headers.map((header) => row[header]).join(","))
          ].join("\n");
          combinedContent += `    ${csvString.replace(/[,]/g, " , ")}\n`;
        } else {
          combinedContent += "    CSV data is not in expected array format.\n";
        }
      } else {
        combinedContent += `    ${file.content}\n`;
      }

      combinedContent += `  </${fileTypeTag}>\n`;
      combinedContent += `</document>\n`;
    });

    try {
      const prompt = `Generate a single tailored interview question based on the provided [RESUME/DOCUMENT].

Here is the document data: 

${combinedContent}

Instructions:
1. Analyze the [RESUME/DOCUMENT] to identify key skills, experiences, projects, and credentials.
2. Generate ONE targeted interview question from one of these categories:
   - Technical knowledge question specific to their field
   - Experience-based question that probes deeper into a listed achievement
   - Scenario/behavioral question relevant to their background
   - Skills assessment question to verify a claimed competency
   - Culture fit question based on their career trajectory
3. For the question, include:
   - The specific part of the [RESUME/DOCUMENT] that prompted this question
   - The purpose of asking this question (what you're evaluating)
   - 1-2 potential follow-up questions

Format:
Category: [QUESTION CATEGORY]
Question: [THE INTERVIEW QUESTION]
Based on: [RELEVANT RESUME/DOCUMENT SECTION]
Purpose: [WHAT THIS QUESTION EVALUATES]
Follow-up: [FOLLOW-UP QUESTIONS]

Additional parameters:
- Difficulty level: [BASIC/INTERMEDIATE/ADVANCED]
- Interview stage: [SCREENING/TECHNICAL/FINAL]
- Position being interviewed for: [POSITION]
- Industry focus: [INDUSTRY]`;

      const apiContent = [{ type: "text", text: prompt }];
      const apiMessage = {
        role: "user",
        content: apiContent
      };

      console.log("Sending request to API...");

      const response = await fetch("/api/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [apiMessage]
        })
      });

      if (!response.ok) {
        let errorMessage = "Unknown error";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || "No specific error message";
          console.error("API Response Error:", errorData);
        } catch (jsonError) {
          errorMessage = "Could not parse error response";
          console.error("Error parsing error response:", jsonError);
        }

        throw new Error(`API request failed with status: ${response.status} - ${errorMessage}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      const questionText = Array.isArray(data.content)
        ? data.content.find((item) => item.type === "text")?.text
        : data.content;

      if (!questionText) {
        throw new Error("No question text found in the response");
      }

      setCurrentQuestion(questionText);

      // Add the question to chat history
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: [{ type: "text", text: questionText }],
          isQuestion: true
        }
      ]);
    } catch (err) {
      console.error("Question Generation Error:", err);
      setError(`Failed to generate question: ${err.message}`);

      // Show error notification
      Swal.fire({
        icon: "error",
        title: "Question Generation Failed",
        text: `Failed to generate interview question: ${err.message}`,
        background: "#222",
        color: "#fff"
      });
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() && selectedFilesForChat.size === 0) return;

    setIsSending(true);
    setError(null);

    const selectedFiles = fileResults.filter((file) => selectedFilesForChat.has(file.id));
    let combinedContent = "";

    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        let fileTypeTag = "unknown";
        switch (file.type) {
          case "pdf":
            fileTypeTag = "pdf";
            break;
          case "csv":
            fileTypeTag = "csv";
            break;
          case "doc":
            fileTypeTag = "doc";
            break;
          case "text":
            fileTypeTag = "text";
            break;
          case "web":
            fileTypeTag = "website";
            break;
          default:
            fileTypeTag = "unknown";
        }

        combinedContent += `<document>\n`;
        for (const key in file.metadata) {
          combinedContent += `  <${key}>${file.metadata[key]}</${key}>\n`;
        }

        combinedContent += `  <${fileTypeTag}>\n`;

        if (fileTypeTag === "csv") {
          if (Array.isArray(file.content)) {
            const headers = Object.keys(file.content[0]);
            const csvString = [
              headers.join(","),
              ...file.content.map((row) => headers.map((header) => row[header]).join(","))
            ].join("\n");
            combinedContent += `    ${csvString.replace(/[,]/g, " , ")}\n`;
          } else {
            combinedContent += "    CSV data is not in expected array format.\n";
          }
        } else {
          combinedContent += `    ${file.content}\n`;
        }

        combinedContent += `  </${fileTypeTag}>\n`;
        combinedContent += `</document>\n`;
      });
    }

    // Display user's message
    const displayContent = [{ type: "text", text: message }];

    const displayMessage = {
      role: "user",
      content: displayContent
    };

    // Add the user message to chat history
    setChatHistory((prev) => [...prev, displayMessage]);

    try {
      // Construct API message differently based on whether we're in interview mode
      let apiContent;
      let promptPrefix;

      if (interviewMode && currentQuestion) {
        // In interview mode, evaluate the answer more directly
        promptPrefix = `I've asked the following question:\n\n"${currentQuestion}"\n\nThe response was:\n\n"${message}"\n\nBased on the documents provided, evaluate this answer objectively. Provide specific, constructive feedback on the answer content only. End with a numerical rating from 1-10 formatted as "Rating: X/10". Here is the document data: \n\n`;
      } else {
        // Normal chat mode - simplified
        promptPrefix = `Using the information from the provided documents, answer this question: "${message}". Document data: \n\n`;
      }

      apiContent = [{ type: "text", text: promptPrefix + combinedContent }];

      const apiMessage = {
        role: "user",
        content: apiContent
      };

      const response = await fetch("/api/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [apiMessage]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API request failed with status: ${response.status} - ${
            errorData.message || "No message"
          }`
        );
      }

      const data = await response.json();
      const responseText = Array.isArray(data.content)
        ? data.content.find((item) => item.type === "text")?.text
        : data.content;

      // If we're in interview mode, try to extract the rating
      let rating = null;
      if (interviewMode && responseText) {
        const ratingMatch = responseText.match(/Rating:\s*(\d+)\/10/i);
        console.log("Rating Match:", ratingMatch);

        if (ratingMatch && ratingMatch[1]) {
          rating = parseInt(ratingMatch[1], 10);
          setLastRating(rating);
        }
      }

      // Add the AI response to chat history
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: [{ type: "text", text: responseText }],
          rating: rating
        }
      ]);

      setMessage("");
    } catch (err) {
      console.error("Send Message Error:", err);
      setError(`Failed to send message: ${err.message}`);
      Swal.fire({
        icon: "error",
        title: "Message Failed",
        text: `Failed to send message: ${err.message}`,
        background: "#222",
        color: "#fff"
      });
    } finally {
      setIsSending(false);
    }
  };

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const processedLengthRef = useRef(0);
  const [charCount, setCharCount] = useState(0);

  // Update character count when message changes
  useEffect(() => {
    setCharCount(message.length);
  }, [message]);

  // Handle speech recognition
  useEffect(() => {
    if (transcript.length > processedLengthRef.current) {
      const newTranscript = transcript.slice(processedLengthRef.current);
      setMessage((prev) => `${prev}${newTranscript}`.trim());
      processedLengthRef.current = transcript.length;

      const timeoutId = setTimeout(() => {
        setIsSpeaking(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [transcript]);

  const startListening = () => {
    setIsListening(true);
    setIsSpeaking(true);
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListening = () => {
    setIsListening(false);
    setIsSpeaking(false);
    SpeechRecognition.stopListening();
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.1),_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.1),_transparent_50%)]"></div>
      </div>

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white shadow-lg backdrop-blur-md"
        >
          <i className={`bi ${isSidebarOpen ? "bi-x-lg" : "bi-list"} text-xl`}></i>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 bottom-0 lg:left-0 w-[300px] overflow-y-auto z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 w-full h-full text-center bg-black/70 backdrop-blur-xl backdrop-filter border-r border-gray-800">
          <div className="p-2.5 mt-3 flex items-center justify-between px-4 duration-300 cursor-pointer">
            <span className="text-[15px] ml-4">
              <Link href="/" className="flex lg:ml-4 text-3xl font-bold">
                <span className="text-white">Interview</span>
                <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  .AI
                </div>
              </Link>
            </span>
          </div>

          <div className="my-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-[2px] opacity-70 rounded-full" />

          {/* File Upload Area */}
          <div className="p-4 border-b border-gray-800/50">
            <div
              className={`border-2 border-dashed rounded-lg p-4 mb-4 text-center cursor-pointer transition-all ${
                dragActive
                  ? "border-blue-500 bg-gray-800/50 shadow-lg shadow-blue-500/20"
                  : "border-gray-700 hover:bg-gray-800/50"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <FiUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-400">
                Drag resume, job description or click to upload
              </p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.csv,.xls,.xlsx,.doc,.docx,.txt"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter job posting URL..."
                  className="flex-1 p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 border-gray-700 text-gray-200"
                />
                <button
                  onClick={scrapeWebsite}
                  disabled={isScrapingUrl || !url}
                  className={`px-3 py-2 rounded flex items-center justify-center transition-all ${
                    isScrapingUrl || !url
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <FiGlobe className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* File List */}
          <div className="flex-1 overflow-y-auto p-1 bg-gray-900/30">
            <div className="p-3 border-b border-gray-800/50 bg-gray-800/30">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-300">Your Documents</h3>
                <span className="text-xs text-gray-500">{selectedFilesForChat.size} selected</span>
              </div>
            </div>

            {fileResults.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">No documents uploaded yet</div>
            ) : (
              fileResults.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center p-3 hover:bg-gray-800/50 border-b border-gray-800/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilesForChat.has(file.id)}
                    onChange={() => toggleFileForChat(file.id)}
                    className="mr-3 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <div
                    onClick={() => showFileContent(file)}
                    className="flex flex-1 items-center cursor-pointer"
                  >
                    <FileIcon type={file.type} />
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-300 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{file.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    className="ml-2 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}

            {Object.values(loadingStates).some((state) => state) && <LoadingSpinner />}
          </div>

          {/* Interview Controls - Modified to position at bottom left */}
          {fileResults.length > 0 && (
            <div className="fixed bottom-4 left-4 ml-5 z-40">
              <button
                onClick={interviewMode ? generateNewQuestion : startInterviewMode}
                className={`py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  isGeneratingQuestion
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg"
                }`}
                disabled={isGeneratingQuestion}
              >
                {isGeneratingQuestion ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <FiRefreshCw className="w-4 h-4" />
                    {interviewMode ? "Generate New Question" : "Start Interview"}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <main
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-[300px]" : "lg:ml-0"
        }`}
      >
        {/* Mode Indicator */}
        <div className="bg-gray-800/50 border-b border-gray-700/50 p-3 backdrop-blur-md">
          <div className="flex items-center">
            {interviewMode ? (
              <>
                <FiStar className="text-yellow-400 mr-2" />
                <span className="text-sm font-medium text-gray-300">Interview Mode</span>
                {lastRating !== null && (
                  <span className="ml-auto text-sm text-gray-300">
                    Last Rating: <span className="text-yellow-400 font-bold">{lastRating}/10</span>
                  </span>
                )}
              </>
            ) : (
              <>
                <FiInfo className="text-blue-400 mr-2" />
                <span className="text-sm text-gray-300">
                  {selectedFilesForChat.size > 0
                    ? `${selectedFilesForChat.size} ${
                        selectedFilesForChat.size === 1 ? "document" : "documents"
                      } selected`
                    : "Upload documents to start practicing interviews"}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-black/80 to-gray-900/80">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="bg-gray-900/70 p-8 rounded-lg shadow-lg max-w-md border border-gray-700/50 backdrop-blur-sm">
                <FiCheckCircle className="mx-auto h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-200 mb-2">
                  Welcome to Interview.AI
                </h3>
                <p className="text-gray-400 mb-4">
                  Upload your resume, job descriptions, or other relevant documents to practice
                  interview questions tailored to your profile and get AI feedback on your answers.
                </p>
                <div className="text-sm text-gray-500">
                  The AI will generate relevant questions, evaluate your responses, and provide a
                  rating out of 10.
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-3/4 rounded-lg p-4 backdrop-blur-sm ${
                      msg.role === "user"
                        ? "bg-blue-600/80 text-white"
                        : "bg-gray-800/70 text-gray-200"
                    } ${
                      msg.isQuestion
                        ? "border-l-4 border-yellow-500/80 shadow-lg shadow-yellow-500/10"
                        : ""
                    } transition-all duration-300`}
                  >
                    {Array.isArray(msg.content) ? (
                      msg.content.map((item, i) => (
                        <div key={i}>
                          {item.type === "text" && (
                            <div className="whitespace-pre-wrap">
                              {item.text}
                              {console.log("Text Item:", item.text)}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    )}
                    {msg.rating && (
                      <div className="mt-2 text-sm text-yellow-400">Rating: {msg.rating}/10</div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Input */}
        {/* <div className="p-4 border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-md">
          <div className="flex space-x-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                interviewMode && currentQuestion
                  ? "Type your answer..."
                  : "Type a message..."
              }
              className="flex-1 p-3 text-gray-200 bg-gray-800/70 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none backdrop-blur-sm"
              rows="3"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={
                isSending ||
                (!message.trim() && selectedFilesForChat.size === 0)
              }
              className={`px-4 self-end h-12 rounded-lg flex items-center justify-center transition-all ${isSending ||
                (!message.trim() && selectedFilesForChat.size === 0)
                ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                : "bg-blue-600/80 text-white hover:bg-blue-700/80 shadow-lg shadow-blue-500/20"
                }`}
            >
              {isSending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <FiSend className="w-5 h-5" />
              )}
            </button>
          </div>

          {error && (
            <div className="mt-2 text-red-400 text-sm animate-pulse">
              {error}
            </div>
          )}
        </div> */}

        {/* Message Input */}
        <div className="p-4 border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-md">
          <div className="flex space-x-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                interviewMode && currentQuestion ? "Type your answer..." : "Type a message..."
              }
              className="flex-1 p-3 text-gray-200 bg-gray-800/70 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none backdrop-blur-sm"
              rows="3"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="flex flex-col space-y-2">
              {browserSupportsSpeechRecognition && (
                <button
                  className={`flex items-center justify-center w-12 h-12 ${
                    isListening
                      ? "bg-red-500 text-white"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  } rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30 ${
                    isSpeaking ? "scale-110 ring-4 ring-purple-500/20" : "scale-100"
                  }`}
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? <FiMicOff className="w-5 h-5" /> : <FiMic className="w-5 h-5" />}
                </button>
              )}
              <button
                onClick={handleSendMessage}
                disabled={isSending || (!message.trim() && selectedFilesForChat.size === 0)}
                className={`px-4 h-12 rounded-lg flex items-center justify-center transition-all ${
                  isSending || (!message.trim() && selectedFilesForChat.size === 0)
                    ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                    : "text-white from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/20"
                }`}
              >
                {isSending ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <FiSend className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="text-gray-400 text-sm">{charCount} characters</div>
            {isListening && (
              <div className="flex items-center">
                <div className="flex gap-1 items-center mr-2">
                  <div className="bg-red-500 h-2 w-2 rounded-full animate-pulse"></div>
                  <div className="bg-red-500 h-3 w-3 rounded-full animate-pulse delay-75"></div>
                  <div className="bg-red-500 h-4 w-4 rounded-full animate-pulse delay-150"></div>
                </div>
                <span className="text-red-400 text-sm">Recording...</span>
              </div>
            )}
          </div>

          {error && <div className="mt-2 text-red-400 text-sm animate-pulse">{error}</div>}
        </div>
      </main>
    </div>
  );
}
