
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const [data,  _setData] = useState<Array<{
    id: number;
    username: string;
    role: string;
    paperTitle: string;
    plagiarismRate: number;
    aiRate: number;
    submissionDate: string;
  }>>([
    {
      id: 1,
      username: 'student1',
      role: '学生',
      paperTitle: '人工智能在教育中的应用',
      plagiarismRate: 15.2,
      aiRate: 22.5,
      submissionDate: '2024-01-15'
    },
    {
      id: 2,
      username: 'student2',
      role: '学生',
      paperTitle: '区块链技术的发展与应用',
      plagiarismRate: 8.7,
      aiRate: 15.3,
      submissionDate: '2024-01-16'
    },
    {
      id: 3,
      username: 'teacher1',
      role: '教师',
      paperTitle: '计算机科学教育方法研究',
      plagiarismRate: 5.1,
      aiRate: 10.2,
      submissionDate: '2024-01-17'
    }
  ])

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">管理端仪表盘</h2>
        <div className="dashboard-nav">
          <button className="btn-secondary" onClick={handleLogout}>
            退出登录
          </button>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="card">
          <h3 className="card-title">所有检测数据</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用户名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    角色
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    论文标题
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    查重率 (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AI率 (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    提交日期
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.paperTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.plagiarismRate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.aiRate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.submissionDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
