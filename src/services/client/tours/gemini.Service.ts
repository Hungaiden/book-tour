// services/geminiService.js
import axios from 'axios'

// eslint-disable-next-line no-undef
const GROQ_API_KEY = process.env.GROQ_API_KEY
// eslint-disable-next-line no-undef
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function getTourRecommendations(userInput, tours) {
  const prompt = `
Người dùng muốn đặt tour với yêu cầu như sau:
${JSON.stringify(userInput, null, 2)}

Dưới đây là danh sách các tour có trong hệ thống:
${JSON.stringify(tours, null, 2)}

Hãy tìm những tour phù hợp nhất với yêu cầu của người dùng. Ưu tiên hàng đầu là các tour có điểm đến (destination) giống với yêu cầu. Sau đó, xét thêm các yếu tố như thời gian đi (duration), ngày khởi hành (startDate), hoặc giá cả nếu cần. Trả lại danh sách các tour phù hợp nhất dưới dạng mảng JSON các id. Không giải thích, không dùng markdown.

Ví dụ: ["id1", "id2", "id3"]
Chỉ trả lại mảng JSON các id, không cần giải thích.
`

  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: GROQ_MODEL,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const rawText = response.data.choices[0]?.message?.content
    
    // Clean the response text
    const cleanText = rawText
      .replace(/```json\s*/g, '') // Remove ```json
      .replace(/```\s*/g, '') // Remove remaining ```
      .trim() // Remove extra whitespace

    // Parse the cleaned JSON
    const tourIds = JSON.parse(cleanText)
    return tourIds

  } catch (error) {
    console.error('Groq API error:', error.message)
    console.error('Raw response:', error.response?.data)
    return []
  }
}
