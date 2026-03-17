import { useState } from 'react';
import { TOPICS } from '../utils/topics';

export default function TopicSelector({ onSelectTopic }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleTopicClick = (category, subtopic) => {
    const prompt = `I want to learn about ${subtopic} in ${TOPICS[category].name}. Please explain it with examples.`;
    onSelectTopic(prompt);
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#1E406D] via-[#A395AC] to-[#FFDBD0]">
      <div className="max-w-5xl w-full p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Developer Interview Assistant</h1>
          <p className="text-white">Select a topic to start practicing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(TOPICS).map(([key, topic]) => (
            <div
              key={key}
              className="bg-[#1E406D]/40 rounded-lg p-6  transition cursor-pointer"
              onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
            >
              <div className="text-4xl mb-3">{topic.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4">{topic.name}</h3>
              
              {selectedCategory === key && (
                <div className="space-y-2 mt-4">
                  {topic.subtopics.map((subtopic, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTopicClick(key, subtopic);
                      }}
                      className="w-full text-left px-3 py-2 text-sm bg-[#1E406D]/60 text-white rounded-lg transition"
                    >
                      {subtopic}
                    </button>
                  ))}
                </div>
              )}
              
              {selectedCategory !== key && (
                <p className="text-white text-sm">Click to see topics</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
