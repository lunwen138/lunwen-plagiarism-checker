
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Student {
  id: number
  username: string
  name: string
  email: string
}

interface Paper {
  id: number
  studentId: number
  studentName: string
  title: string
  plagiarismRate: number
  aiRate: number
  submittedAt: string
}

interface Class {
  id: number
  name: string
  plagiarismThreshold: number
  aiThreshold: number
  students: Student[]
  papers: Paper[]
}

interface User {
  id: number
  username: string
  name: string
  email: string
  role: string
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)

  // 模拟学生数据
  const mockStudents: Student[] = [
    { id: 1, username: 'student1', name: '张三', email: 'zhangsan@example.com' },
    { id: 2, username: 'student2', name: '李四', email: 'lisi@example.com' },
    { id: 3, username: 'student3', name: '王五', email: 'wangwu@example.com' },
    { id: 4, username: 'student4', name: '赵六', email: 'zhaoliu@example.com' },
    { id: 5, username: 'student5', name: '钱七', email: 'qianqi@example.com' }
  ]

  // 模拟班级数据
  const mockClasses: Class[] = [
    { 
      id: 1, 
      name: '计算机科学与技术1班', 
      plagiarismThreshold: 20, 
      aiThreshold: 30,
      students: [mockStudents[0], mockStudents[1]],
      papers: [
        { 
          id: 1, 
          studentId: 1, 
          studentName: '张三', 
          title: '人工智能发展现状', 
          plagiarismRate: 15, 
          aiRate: 25, 
          submittedAt: '2024-01-15' 
        },
        { 
          id: 2, 
          studentId: 2, 
          studentName: '李四', 
          title: '机器学习算法研究', 
          plagiarismRate: 22, 
          aiRate: 35, 
          submittedAt: '2024-01-16' 
        }
      ]
    },
    { 
      id: 2, 
      name: '计算机科学与技术2班', 
      plagiarismThreshold: 15, 
      aiThreshold: 25,
      students: [mockStudents[2], mockStudents[3]],
      papers: [
        { 
          id: 3, 
          studentId: 3, 
          studentName: '王五', 
          title: '深度学习应用', 
          plagiarismRate: 12, 
          aiRate: 20, 
          submittedAt: '2024-01-14' 
        }
      ]
    }
  ]

  // 模拟用户数据
  const mockUsers: User[] = [
    { id: 1, username: 'admin1', name: '管理员', email: 'admin@example.com', role: '管理员' },
    { id: 2, username: 'teacher1', name: '李老师', email: 'teacher1@example.com', role: '教师' },
    { id: 3, username: 'teacher2', name: '王老师', email: 'teacher2@example.com', role: '教师' },
    ...mockStudents.map(student => ({
      id: student.id + 3,
      username: student.username,
      name: student.name,
      email: student.email,
      role: '学生'
    }))
  ]

  // 所有论文数据
  const allPapers: Paper[] = mockClasses.flatMap(cls => cls.papers)

  const isPaperPassing = (paper: Paper, cls: Class) => {
    return paper.plagiarismRate <= cls.plagiarismThreshold && paper.aiRate <= cls.aiThreshold
  }

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
        {/* 导航标签 */}
        <div className="card">
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              概览
            </button>
            <button 
              className={`tab-btn ${activeTab === 'classes' ? 'active' : ''}`}
              onClick={() => setActiveTab('classes')}
            >
              班级管理
            </button>
            <button 
              className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              用户管理
            </button>
            <button 
              className={`tab-btn ${activeTab === 'papers' ? 'active' : ''}`}
              onClick={() => setActiveTab('papers')}
            >
              论文检测
            </button>
          </div>
        </div>

        {/* 概览标签 */}
        {activeTab === 'overview' && (
          <div className="card">
            <h3 className="card-title">系统概览</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{mockUsers.length}</div>
                <div className="stat-label">总用户数</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{mockClasses.length}</div>
                <div className="stat-label">总班级数</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{allPapers.length}</div>
                <div className="stat-label">检测论文数</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {mockStudents.length}
                </div>
                <div className="stat-label">学生数</div>
              </div>
            </div>

            <h4 className="section-title">最近检测论文</h4>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>论文标题</th>
                    <th>学生姓名</th>
                    <th>查重率 (%)</th>
                    <th>AI率 (%)</th>
                    <th>提交日期</th>
                  </tr>
                </thead>
                <tbody>
                  {allPapers.slice(0, 5).map(paper => (
                    <tr key={paper.id}>
                      <td>{paper.title}</td>
                      <td>{paper.studentName}</td>
                      <td>{paper.plagiarismRate}</td>
                      <td>{paper.aiRate}</td>
                      <td>{paper.submittedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 班级管理标签 */}
        {activeTab === 'classes' && (
          <div className="card">
            <h3 className="card-title">班级管理</h3>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>班级ID</th>
                    <th>班级名称</th>
                    <th>查重率要求 (%)</th>
                    <th>AI率要求 (%)</th>
                    <th>学生人数</th>
                    <th>论文数量</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {mockClasses.map(cls => (
                    <tr key={cls.id}>
                      <td>{cls.id}</td>
                      <td>{cls.name}</td>
                      <td>{cls.plagiarismThreshold}</td>
                      <td>{cls.aiThreshold}</td>
                      <td>{cls.students.length}</td>
                      <td>{cls.papers.length}</td>
                      <td>
                        <button 
                          className="btn-secondary"
                          onClick={() => setSelectedClass(cls)}
                        >
                          查看详情
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 班级详情 */}
            {selectedClass && (
              <div className="class-details">
                <h4 className="section-title">{selectedClass.name} - 班级详情</h4>
                <div className="class-info">
                  <p><strong>查重率要求:</strong> {selectedClass.plagiarismThreshold}%</p>
                  <p><strong>AI率要求:</strong> {selectedClass.aiThreshold}%</p>
                  <p><strong>学生人数:</strong> {selectedClass.students.length}</p>
                </div>
                
                <h5 className="subsection-title">班级学生</h5>
                <ul className="student-list">
                  {selectedClass.students.map(student => (
                    <li key={student.id} className="student-item">
                      <strong>{student.username}</strong> - {student.name} ({student.email})
                    </li>
                  ))}
                </ul>
                
                <h5 className="subsection-title">学生论文</h5>
                <div className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>论文标题</th>
                        <th>学生姓名</th>
                        <th>查重率 (%)</th>
                        <th>AI率 (%)</th>
                        <th>提交日期</th>
                        <th>状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedClass.papers.map(paper => (
                        <tr key={paper.id} className={isPaperPassing(paper, selectedClass) ? 'passing' : 'failing'}>
                          <td>{paper.title}</td>
                          <td>{paper.studentName}</td>
                          <td>{paper.plagiarismRate}</td>
                          <td>{paper.aiRate}</td>
                          <td>{paper.submittedAt}</td>
                          <td>
                            <span className={`status-badge ${isPaperPassing(paper, selectedClass) ? 'passing' : 'failing'}`}>
                              {isPaperPassing(paper, selectedClass) ? '合格' : '不合格'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <button 
                  className="btn-secondary"
                  onClick={() => setSelectedClass(null)}
                >
                  关闭详情
                </button>
              </div>
            )}
          </div>
        )}

        {/* 用户管理标签 */}
        {activeTab === 'users' && (
          <div className="card">
            <h3 className="card-title">用户管理</h3>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>用户ID</th>
                    <th>用户名</th>
                    <th>姓名</th>
                    <th>邮箱</th>
                    <th>角色</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 论文检测标签 */}
        {activeTab === 'papers' && (
          <div className="card">
            <h3 className="card-title">论文检测记录</h3>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>论文ID</th>
                    <th>论文标题</th>
                    <th>学生姓名</th>
                    <th>查重率 (%)</th>
                    <th>AI率 (%)</th>
                    <th>提交日期</th>
                    <th>班级</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  {mockClasses.map(cls => 
                    cls.papers.map(paper => (
                      <tr key={paper.id} className={isPaperPassing(paper, cls) ? 'passing' : 'failing'}>
                        <td>{paper.id}</td>
                        <td>{paper.title}</td>
                        <td>{paper.studentName}</td>
                        <td>{paper.plagiarismRate}</td>
                        <td>{paper.aiRate}</td>
                        <td>{paper.submittedAt}</td>
                        <td>{cls.name}</td>
                        <td>
                          <span className={`status-badge ${isPaperPassing(paper, cls) ? 'passing' : 'failing'}`}>
                            {isPaperPassing(paper, cls) ? '合格' : '不合格'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
