
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const handlePortalClick = (portal: string) => {
    navigate(`/${portal}`)
  }

  return (
    <div className="min-h-screen">
      <div className="auth-card">
        <h1 className="auth-title">论文查重系统</h1>
        <div className="portal-selector">
          <button 
            className="portal-btn"
            onClick={() => handlePortalClick('student')}
          >
            学生端
          </button>
          <button 
            className="portal-btn"
            onClick={() => handlePortalClick('teacher')}
          >
            教师端
          </button>
          <button 
            className="portal-btn"
            onClick={() => handlePortalClick('admin')}
          >
            管理端
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
