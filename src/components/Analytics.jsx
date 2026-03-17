import ReactECharts from 'echarts-for-react';
import { calculateAnalytics, getTopTopics } from '../utils/analytics';

export default function Analytics({ chats, onClose }) {
  const analytics = calculateAnalytics(chats);
  const topTopics = getTopTopics(chats);

  // Pie Chart - Topic Coverage
  const pieOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Topic Coverage',
      left: 'center',
      textStyle: { color: '#fff', fontSize: 16 }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: { color: '#9ca3af' },
      icon: 'circle', 
    },
    series: [{
      type: 'pie',
      radius: '70%',
      center: ['50%', '50%'],
      itemStyle: {
        borderRadius: 2,
        borderColor: '#fff',
        borderWidth: 1
      },
      label: {
        show: true,
        color: '#fff',
        formatter: '{b}\n{d}%'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      data: [
        { value: analytics.topicDistribution.DSA, name: 'DSA', itemStyle: { color: '#F6D4CC' } },
        { value: analytics.topicDistribution.JavaScript, name: 'JavaScript', itemStyle: { color: '#B7D1F1' } },
        { value: analytics.topicDistribution.React, name: 'React', itemStyle: { color: '#E89B9C' } }
      ]
    }]
  };

  // Bar Chart - Top Topics
  const barOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Most Discussed Topics',
      left: 'center',
      textStyle: { color: '#fff', fontSize: 16 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: topTopics.map(t => t[0].slice(0, 20) + '...'),
      axisLabel: { color: '#9ca3af', rotate: 45 }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#9ca3af' }
    },
    series: [{
      type: 'bar',
      data: topTopics.map(t => t[1]),
      itemStyle: {
        color: '#B7D1F1',
        borderRadius: [4, 4, 0, 0]
      }
    }]
  };

  // Line Chart - Session Lengths
  const lineOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Chat Session Lengths',
      left: 'center',
      textStyle: { color: '#fff', fontSize: 16 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: analytics.sessionLengths.map((_, i) => `Chat ${i + 1}`),
      axisLabel: { color: '#9ca3af' }
    },
    yAxis: {
      type: 'value',
      name: 'Messages',
      axisLabel: { color: '#9ca3af' }
    },
    series: [{
      type: 'line',
      data: analytics.sessionLengths,
      smooth: true,
      itemStyle: { color: '#fff' },
      areaStyle: { color: '#C9FFBD' }
    }]
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 rounded-lg w-full max-w-6xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/10 border-b border-white/20 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Performance Analytics</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-[#1F3E6A]/60 p-4 rounded-lg">
              <div className="text-gray-300 text-sm">Total Chats</div>
              <div className="text-3xl font-bold text-white">{analytics.totalChats}</div>
            </div>
            <div className="bg-[#1F3E6A]/60 p-4 rounded-lg">
              <div className="text-gray-300 text-sm">Total Messages</div>
              <div className="text-3xl font-bold text-white">{analytics.totalMessages}</div>
            </div>
            <div className="bg-[#1F3E6A]/60 p-4 rounded-lg">
              <div className="text-gray-300 text-sm">Avg Response Time</div>
              <div className="text-3xl font-bold text-white">{analytics.avgResponseTime}s</div>
            </div>
            <div className="bg-[#1F3E6A]/60 p-4 rounded-lg">
              <div className="text-gray-300 text-sm">Avg Session Length</div>
              <div className="text-3xl font-bold text-white">
                {analytics.sessionLengths.length > 0 
                  ? Math.round(analytics.sessionLengths.reduce((a, b) => a + b, 0) / analytics.sessionLengths.length)
                  : 0}
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#1F3E6A]/60 p-4 rounded-lg">
              <ReactECharts option={pieOption} style={{ height: '300px' }} />
            </div>
            <div className="bg-[#1F3E6A]/60 p-4 rounded-lg">
              <ReactECharts option={barOption} style={{ height: '300px' }} />
            </div>
            <div className="bg-[#1F3E6A]/60 p-4 rounded-lg col-span-2">
              <ReactECharts option={lineOption} style={{ height: '300px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
