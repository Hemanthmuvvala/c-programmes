import { useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface VideoLesson {
  id: number;
  title: string;
  videoUrl: string;
}

export const MutualFundsLearning = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos: VideoLesson[] = [
    {
      id: 1,
      title: "What are Mutual Funds?",
      videoUrl: "https://www.youtube.com/watch?v=7f5WlRN8yps", // Replace with actual embed links
    },
    {
      id: 2,
      title: "Types of Mutual Funds",
      videoUrl: "https://www.youtube.com/watch?v=AQucLFFa-v8",
    },
    {
      id: 3,
      title: "Benefits of Mutual Funds",
      videoUrl: "https://www.youtube.com/watch?v=AQucLFFa-v8",
    },
    {
      id: 4,
      title: "How to Invest in Mutual Funds",
      videoUrl: "https://www.youtube.com/watch?v=Gd8LXUn9E6U",
    },
    {
      id: 5,
      title: "Risks and Considerations",
      videoUrl: "https://www.youtube.com/watch?v=thOejbtcBjo",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      {/* Main Video Player */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">{videos[currentVideo].title}</h2>
        <div className="relative aspect-video mb-6 rounded-lg overflow-hidden bg-black">
          <ReactPlayer
            url={videos[currentVideo].videoUrl}
            width="100%"
            height="100%"
            controls
          />
        </div>
      </div>

      {/* Video List (Sidebar) */}
      <div className="w-full md:w-1/3">
        <h3 className="text-lg font-semibold mb-3">More Videos</h3>
        <div className="flex flex-col gap-3">
          {videos.map((video, index) => (
            <button
              key={video.id}
              className={`flex items-center gap-3 p-2 rounded-lg transition ${
                currentVideo === index ? "bg-primary text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setCurrentVideo(index)}
            >
              {/* YouTube Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${video.videoUrl.split("/embed/")[1]}/hqdefault.jpg`}
                alt={video.title}
                className="w-24 h-16 rounded-md"
              />
              <span className="text-sm font-medium">{video.title}</span>
              <PlayCircle className="ml-auto h-5 w-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
