
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [result, setResult] = useState<{
    plagiarismRate: number
    aiRate: number
    reportUrl: string
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsLoading(true)
    setResult(null)

    // 模拟文件上传和检测过程
    setTimeout(() => {
      // 模拟检测结果
      const mockResult = {
        plagiarismRate: Math.random() * 50, // 0-50%的查重率
        aiRate: Math.random() * 60, // 0-60%的AI率
        reportUrl: '#'
      }
      setResult(mockResult)
      setIsLoading(false)
    }, 3000)
  }

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">学生端仪表盘</h2>
        <div className="dashboard-nav">
          <button className="btn-secondary" onClick={handleLogout}>
            退出登录
          </button>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="card">
          <h3 className="card-title">上传论文</h3>
          <div className="upload-area" onClick={() => document.getElementById('fileInput')?.click()}>
            <input 
              id="fileInput" 
              type="file" 
              className="file-input" 
              accept=".doc,.docx,.pdf" 
              onChange={handleFileChange}
            />
            {fileName ? (
              <p>已选择文件: {fileName}</p>
            ) : (
              <p>点击或拖拽文件到此处上传</p>
            )}
            <p className="text-sm text-gray-500">支持 Word (.doc, .docx) 和 PDF 格式</p>
          </div>
          <button 
            className="btn-primary" 
            onClick={handleUpload}
            disabled={!file || isLoading}
          >
            {isLoading ? '检测中...' : '开始检测'}
          </button>
        </div>

        {isLoading && (
          <div className="loading">
            <div className="loading-spinner"></div>
          </div>
        )}

        {result && (
          <div className="result-card">
            <h3 className="card-title">检测报告</h3>
            <div className="result-item">
              <span className="result-label">查重率</span>
              <span className="result-value">{result.plagiarismRate.toFixed(2)}%</span>
            </div>
            <div className="result-item">
              <span className="result-label">AI生成率</span>
              <span className="result-value">{result.aiRate.toFixed(2)}%</span>
            </div>
            <div className="result-item">
              <span className="result-label">报告</span>
              <a href={result.reportUrl} className="text-blue-600 hover:underline">
                查看详细报告
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentDashboard
