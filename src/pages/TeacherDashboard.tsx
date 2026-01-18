
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate()
  const [className, setClassName] = useState<string>('')
  const [plagiarismThreshold, setPlagiarismThreshold] = useState<number>(20)
  const [aiThreshold, setAiThreshold] = useState<number>(30)
  const [classes, setClasses] = useState<Array<{ id: number; name: string; plagiarismThreshold: number; aiThreshold: number }>>([
    { id: 1, name: '计算机科学与技术1班', plagiarismThreshold: 20, aiThreshold: 30 },
    { id: 2, name: '计算机科学与技术2班', plagiarismThreshold: 15, aiThreshold: 25 }
  ])
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleAddClass = () => {
    if (!className) return

    const newClass = {
      id: classes.length + 1,
      name: className,
      plagiarismThreshold,
      aiThreshold
    }

    setClasses([...classes, newClass])
    setClassName('')
    setSuccessMessage('班级创建成功')

    // 3秒后清除成功消息
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">教师端仪表盘</h2>
        <div className="dashboard-nav">
          <button className="btn-secondary" onClick={handleLogout}>
            退出登录
          </button>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="card">
          <h3 className="card-title">创建班级</h3>
          <div className="form-group">
            <label className="form-label">班级名称</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="请输入班级名称" 
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">查重率要求 (%)</label>
            <input 
              type="number" 
              className="form-input" 
              min="0" 
              max="100" 
              value={plagiarismThreshold}
              onChange={(e) => setPlagiarismThreshold(Number(e.target.value))}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">AI率要求 (%)</label>
            <input 
              type="number" 
              className="form-input" 
              min="0" 
              max="100" 
              value={aiThreshold}
              onChange={(e) => setAiThreshold(Number(e.target.value))}
            />
          </div>
          
          {successMessage && <div className="success-message">{successMessage}</div>}
          
          <button className="btn-primary" onClick={handleAddClass}>
            创建班级
          </button>
        </div>
        
        <div className="card">
          <h3 className="card-title">班级列表</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    班级名称
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    查重率要求 (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AI率要求 (%)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {classes.map((cls) => (
                  <tr key={cls.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cls.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cls.plagiarismThreshold}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cls.aiThreshold}
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

export default TeacherDashboard
