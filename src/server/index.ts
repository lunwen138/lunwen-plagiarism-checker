
// 后端模拟服务
// 在实际应用中，这里应该是一个真实的后端服务

// 数据库模型定义
export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
  createdAt: string;
}

export interface Class {
  id: number;
  name: string;
  teacherId: number;
  plagiarismThreshold: number;
  aiThreshold: number;
  createdAt: string;
}

export interface Paper {
  id: number;
  userId: number;
  title: string;
  fileName: string;
  fileUrl: string;
  language: string;
  plagiarismRate: number;
  aiRate: number;
  crossLanguageRate: number;
  submissionDate: string;
  reportUrl: string;
}

export interface DetectionResult {
  id: number;
  paperId: number;
  plagiarismRate: number;
  aiRate: number;
  crossLanguageRate: number;
  matches: Array<{
    source: string;
    similarity: number;
    text: string;
  }>;
  translatedMatches: Array<{
    source: string;
    translatedText: string;
    similarity: number;
  }>;
  detectionDate: string;
}

// 模拟数据库
const mockDatabase = {
  users: [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' as const, createdAt: '2024-01-01' },
    { id: 2, username: 'teacher', password: 'teacher123', role: 'teacher' as const, createdAt: '2024-01-01' },
    { id: 3, username: 'student', password: 'student123', role: 'student' as const, createdAt: '2024-01-01' }
  ],
  classes: [
    { id: 1, name: '计算机科学与技术1班', teacherId: 2, plagiarismThreshold: 20, aiThreshold: 30, createdAt: '2024-01-01' },
    { id: 2, name: '计算机科学与技术2班', teacherId: 2, plagiarismThreshold: 15, aiThreshold: 25, createdAt: '2024-01-01' }
  ],
  papers: [
    { 
      id: 1, 
      userId: 3, 
      title: '人工智能在教育中的应用', 
      fileName: 'ai_education.pdf', 
      fileUrl: '#', 
      language: 'zh', 
      plagiarismRate: 15.2, 
      aiRate: 22.5, 
      crossLanguageRate: 5.3, 
      submissionDate: '2024-01-15', 
      reportUrl: '#' 
    }
  ],
  detectionResults: [
    {
      id: 1,
      paperId: 1,
      plagiarismRate: 15.2,
      aiRate: 22.5,
      crossLanguageRate: 5.3,
      matches: [
        { source: '互联网', similarity: 25.5, text: '这是一段被检测为抄袭的文本' }
      ],
      translatedMatches: [
        { source: '英文文献', translatedText: '这是一段从英文翻译过来的抄袭文本', similarity: 12.3 }
      ],
      detectionDate: '2024-01-15'
    }
  ]
};

// 模拟API服务
export const mockApi = {
  // 用户相关
  users: {
    login: (username: string, password: string, role: string) => {
      const user = mockDatabase.users.find(u => u.username === username && u.password === password && u.role === role);
      return user ? { success: true, user } : { success: false, message: '用户名或密码错误' };
    },
    getById: (id: number) => {
      return mockDatabase.users.find(u => u.id === id);
    },
    getAll: () => {
      return mockDatabase.users;
    }
  },

  // 班级相关
  classes: {
    create: (classData: Omit<Class, 'id' | 'createdAt'>) => {
      const newClass = {
        id: mockDatabase.classes.length + 1,
        ...classData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      mockDatabase.classes.push(newClass);
      return newClass;
    },
    getAll: () => {
      return mockDatabase.classes;
    },
    getByTeacherId: (teacherId: number) => {
      return mockDatabase.classes.filter(c => c.teacherId === teacherId);
    }
  },

  // 论文相关
  papers: {
    create: (paperData: Omit<Paper, 'id' | 'submissionDate'>) => {
      const newPaper = {
        id: mockDatabase.papers.length + 1,
        ...paperData,
        submissionDate: new Date().toISOString().split('T')[0]
      };
      mockDatabase.papers.push(newPaper);
      return newPaper;
    },
    getAll: () => {
      return mockDatabase.papers;
    },
    getByUserId: (userId: number) => {
      return mockDatabase.papers.filter(p => p.userId === userId);
    },
    getById: (id: number) => {
      return mockDatabase.papers.find(p => p.id === id);
    }
  },

  // 检测结果相关
  detectionResults: {
    create: (resultData: Omit<DetectionResult, 'id' | 'detectionDate'>) => {
      const newResult = {
        id: mockDatabase.detectionResults.length + 1,
        ...resultData,
        detectionDate: new Date().toISOString().split('T')[0]
      };
      mockDatabase.detectionResults.push(newResult);
      return newResult;
    },
    getByPaperId: (paperId: number) => {
      return mockDatabase.detectionResults.find(r => r.paperId === paperId);
    },
    getAll: () => {
      return mockDatabase.detectionResults;
    }
  }
};

// 导出模拟数据库和API
export { mockDatabase };
