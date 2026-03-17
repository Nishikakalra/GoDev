export function calculateAnalytics(chats) {
  const analytics = {
    totalChats: chats.length,
    totalMessages: 0,
    avgResponseTime: 0,
    sessionLengths: [],
    topicDistribution: { DSA: 0, JavaScript: 0, React: 0 },
    activityByHour: Array(24).fill(0),
    chatsByDate: {}
  };

  chats.forEach(chat => {
    analytics.totalMessages += chat.messages.length;
    analytics.sessionLengths.push(chat.messages.length);
    
    // Topic detection
    const title = chat.title.toLowerCase();
    if (title.includes('array') || title.includes('tree') || title.includes('sort') || title.includes('algorithm') || title.includes('dsa')) {
      analytics.topicDistribution.DSA++;
    } else if (title.includes('javascript') || title.includes('closure') || title.includes('promise') || title.includes('async')) {
      analytics.topicDistribution.JavaScript++;
    } else if (title.includes('react') || title.includes('hook') || title.includes('component') || title.includes('state')) {
      analytics.topicDistribution.React++;
    }
    
    // Activity by date and hour
    const date = new Date(chat.createdAt);
    const dateKey = date.toISOString().split('T')[0];
    const hour = date.getHours();
    
    analytics.activityByHour[hour]++;
    analytics.chatsByDate[dateKey] = (analytics.chatsByDate[dateKey] || 0) + 1;
    
    // Response times
    for (let i = 0; i < chat.messages.length - 1; i++) {
      if (chat.messages[i].role === 'user' && chat.messages[i + 1].role === 'assistant') {
        const responseTime = chat.messages[i + 1].timestamp - chat.messages[i].timestamp;
        analytics.avgResponseTime += responseTime;
      }
    }
  });

  const responseCount = chats.reduce((acc, chat) => 
    acc + chat.messages.filter(m => m.role === 'assistant').length, 0);

  analytics.avgResponseTime = responseCount > 0 
    ? (analytics.avgResponseTime / responseCount / 1000).toFixed(2) 
    : 0;

  return analytics;
}

export function getTopTopics(chats, limit = 5) {
  const topics = {};
  
  chats.forEach(chat => {
    if (chat.title !== 'New Chat') {
      topics[chat.title] = (topics[chat.title] || 0) + chat.messages.length;
    }
  });

  return Object.entries(topics)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}
