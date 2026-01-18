
import axios from 'axios'

// API基础配置
const api = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 查重API服务
export const plagiarismCheckService = {
  // 使用Copyleaks API进行查重
  checkWithCopyleaks: async (file: File, language: string) => {
    // 在实际应用中，这里应该调用Copyleaks API
    // 由于是模拟环境，我们返回模拟数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          plagiarismRate: Math.random() * 50,
          matches: [
            {
              source: '互联网',
              similarity: Math.random() * 30 + 10,
              text: '这是一段被检测为抄袭的文本'
            }
          ]
        })
      }, 2000)
    })
  },

  // 使用其他开源API进行查重
  checkWithOtherAPI: async (file: File, language: string) => {
    // 模拟其他API的调用
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          plagiarismRate: Math.random() * 45,
          matches: [
            {
              source: '学术数据库',
              similarity: Math.random() * 25 + 5,
              text: '这是另一段被检测为抄袭的文本'
            }
          ]
        })
      }, 1500)
    })
  }
}

// AI检测API服务
export const aiCheckService = {
  // 使用GPTZero API进行AI检测
  checkWithGPTZero: async (file: File) => {
    // 在实际应用中，这里应该调用GPTZero API
    // 由于是模拟环境，我们返回模拟数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          aiRate: Math.random() * 60,
          confidence: Math.random() * 30 + 70
        })
      }, 1800)
    })
  }
}

// 跨语种检测服务
export const crossLanguageCheckService = {
  // 检测跨语种抄袭
  checkCrossLanguage: async (file: File, sourceLanguage: string, targetLanguage: string) => {
    // 模拟跨语种检测
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          crossLanguagePlagiarismRate: Math.random() * 40,
          translatedMatches: [
            {
              source: '英文文献',
              translatedText: '这是一段从英文翻译过来的抄袭文本',
              similarity: Math.random() * 20 + 10
            }
          ]
        })
      }, 2500)
    })
  }
}

// 文件处理服务
export const fileService = {
  // 上传文件
  uploadFile: async (file: File) => {
    // 模拟文件上传
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          fileId: `file_${Date.now()}`,
          fileName: file.name,
          fileSize: file.size
        })
      }, 1000)
    })
  },

  // 提取文件内容
  extractContent: async (fileId: string) => {
    // 模拟文件内容提取
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          content: '这是提取的文件内容，包含论文的主要部分...',
          wordCount: 1500,
          paragraphs: 10
        })
      }, 1200)
    })
  }
}

export default api
