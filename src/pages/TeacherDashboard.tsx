
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

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate()
  const [className, setClassName] = useState<string>('')
  const [plagiarismThreshold, setPlagiarismThreshold] = useState<number>(20)
  const [aiThreshold, setAiThreshold] = useState<number>(30)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Student[]>([])
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const [activeClass, setActiveClass] = useState<Class | null>(null)
  const [showClassDetails, setShowClassDetails] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')

  // 模拟学生数据
  const mockStudents: Student[] = [
    { id: 1, username: 'student1', name: '张三', email: 'zhangsan@example.com' },
    { id: 2, username: 'student2', name: '李四', email: 'lisi@example.com' },
    { id: 3, username: 'student3', name: '王五', email: 'wangwu@example.com' },
    { id: 4, username: 'student4', name: '赵六', email: 'zhaoliu@example.com' },
    { id: 5, username: 'student5', name: '钱七', email: 'qianqi@example.com' }
  ]

  // 模拟班级数据
  const [classes, setClasses] = useState<Class[]>([
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
  ])

  const handleSearchStudents = () => {
    if (!searchQuery) {
      setSearchResults([])
      return
    }
    
    const results = mockStudents.filter(student => 
      student.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSearchResults(results)
  }

  const handleToggleStudentSelection = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const handleAddClass = () => {
    if (!className) return

    const selectedStudentsData = mockStudents.filter(student => 
      selectedStudents.includes(student.id)
    )

    const newClass: Class = {
      id: classes.length + 1,
      name: className,
      plagiarismThreshold,
      aiThreshold,
      students: selectedStudentsData,
      papers: []
    }

    setClasses([...classes, newClass])
    setClassName('')
    setSelectedStudents([])
    setSuccessMessage('班级创建成功')

    // 3秒后清除成功消息
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  const handleViewClassDetails = (cls: Class) => {
    setActiveClass(cls)
    setShowClassDetails(true)
  }

  const isPaperPassing = (paper: Paper, cls: Class) => {
    return paper.plagiarismRate <= cls.plagiarismThreshold && paper.aiRate <= cls.aiThreshold
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
        {!showClassDetails ? (
          <>
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
              
              <div className="form-group">
                <label className="form-label">搜索并添加学生</label>
                <div className="search-container">
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="输入学生用户名" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn-secondary" onClick={handleSearchStudents}>
                    搜索
                  </button>
                </div>
              </div>
              
              {searchResults.length > 0 && (
                <div className="search-results">
                  <h4>搜索结果</h4>
                  <ul>
                    {searchResults.map(student => (
                      <li key={student.id} className="search-result-item">
                        <div>
                          <strong>{student.username}</strong> - {student.name} ({student.email})
                        </div>
                        <input 
                          type="checkbox" 
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleToggleStudentSelection(student.id)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedStudents.length > 0 && (
                <div className="selected-students">
                  <p>已选择 {selectedStudents.length} 名学生</p>
                </div>
              )}
              
              {successMessage && <div className="success-message">{successMessage}</div>}
              
              <button className="btn-primary" onClick={handleAddClass}>
                创建班级
              </button>
            </div>
            
            <div className="card">
              <h3 className="card-title">班级列表</h3>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>班级名称</th>
                      <th>查重率要求 (%)</th>
                      <th>AI率要求 (%)</th>
                      <th>学生人数</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((cls) => (
                      <tr key={cls.id}>
                        <td>{cls.name}</td>
                        <td>{cls.plagiarismThreshold}</td>
                        <td>{cls.aiThreshold}</td>
                        <td>{cls.students.length}</td>
                        <td>
                          <button 
                            className="btn-secondary" 
                            onClick={() => handleViewClassDetails(cls)}
                          >
                            查看详情
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          activeClass && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">{activeClass.name} - 班级详情</h3>
                <button className="btn-secondary" onClick={() => setShowClassDetails(false)}>
                  返回
                </button>
              </div>
              
              <div className="class-info">
                <p><strong>查重率要求:</strong> {activeClass.plagiarismThreshold}%</p>
                <p><strong>AI率要求:</strong> {activeClass.aiThreshold}%</p>
                <p><strong>学生人数:</strong> {activeClass.students.length}</p>
              </div>
              
              <h4 className="section-title">班级学生</h4>
              <ul className="student-list">
                {activeClass.students.map(student => (
                  <li key={student.id} className="student-item">
                    <strong>{student.username}</strong> - {student.name} ({student.email})
                  </li>
                ))}
              </ul>
              
              <h4 className="section-title">学生论文</h4>
              {activeClass.papers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>学生姓名</th>
                        <th>论文标题</th>
                        <th>查重率 (%)</th>
                        <th>AI率 (%)</th>
                        <th>提交日期</th>
                        <th>状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeClass.papers.map((paper) => (
                        <tr key={paper.id} className={isPaperPassing(paper, activeClass) ? 'passing' : 'failing'}>
                          <td>{paper.studentName}</td>
                          <td>{paper.title}</td>
                          <td>{paper.plagiarismRate}</td>
                          <td>{paper.aiRate}</td>
                          <td>{paper.submittedAt}</td>
                          <td>
                            <span className={`status-badge ${isPaperPassing(paper, activeClass) ? 'passing' : 'failing'}`}>
                              {isPaperPassing(paper, activeClass) ? '合格' : '不合格'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-data">暂无学生提交论文</p>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default TeacherDashboard
