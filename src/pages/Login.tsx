
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState<string>('student')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 简单的表单验证
    if (!username || !password) {
      setError('请填写用户名和密码')
      return
    }

    // 模拟登录验证
    // 在实际应用中，这里应该调用后端API进行验证
    const mockUsers = {
      admin: { username: 'admin', password: 'admin123' },
      teacher: { username: 'teacher', password: 'teacher123' },
      student: { username: 'student', password: 'student123' }
    }

    if (mockUsers[role as keyof typeof mockUsers]?.username === username && 
        mockUsers[role as keyof typeof mockUsers]?.password === password) {
      // 登录成功，跳转到对应的仪表盘
      navigate(`/${role}`)
    } else {
      setError('用户名或密码错误')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="auth-card">
        <h1 className="auth-title">论文查重系统</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">登录端口</label>
            <select 
              className="form-select" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">学生端</option>
              <option value="teacher">教师端</option>
              <option value="admin">管理端</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">用户名</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="请输入用户名" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">密码</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="请输入密码" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="btn-primary">
            登录
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
