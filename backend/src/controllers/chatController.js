import https from 'https';

// Pakistan travel knowledge base for fallback
const knowledgeBase = [
  { keywords: ['hunza', 'karimabad', 'baltit'], reply: 'Hunza Valley is a breathtaking destination in Gilgit-Baltistan. Best time: April–October. Must-see: Baltit Fort, Attabad Lake, Eagle\'s Nest viewpoint. Avg cost: PKR 80–150/night.' },
  { keywords: ['skardu', 'deosai', 'k2', 'shigar'], reply: 'Skardu is the gateway to K2 and stunning Deosai Plains. Best time: May–September. Highlights: Shangrila Resort, Satpara Lake, Deosai National Park. Avg cost: PKR 90–200/night.' },
  { keywords: ['fairy meadows', 'nanga parbat', 'raikot'], reply: 'Fairy Meadows offers stunning views of Nanga Parbat (8,126m). Best time: June–September. Accessible by jeep + 3hr trek. Camping available. Cost: PKR 40–80/night.' },
  { keywords: ['swat', 'mingora', 'malam jabba'], reply: 'Swat Valley is called the Switzerland of Pakistan. Best time: April–October. Highlights: Malam Jabba ski resort, Mahodand Lake, Kalam Valley. Cost: PKR 60–120/night.' },
  { keywords: ['lahore', 'badshahi', 'mughal', 'food street'], reply: 'Lahore is Pakistan\'s cultural capital. Must-visit: Badshahi Mosque, Lahore Fort, Walled City, Food Street. Best time: Oct–Feb. Budget: PKR 3,000–8,000/day.' },
  { keywords: ['islamabad', 'faisal mosque', 'margalla'], reply: 'Islamabad is a clean, modern capital. Highlights: Faisal Mosque, Margalla Hills, Daman-e-Koh, Pakistan Monument. Best time: Year-round. Budget: PKR 4,000–10,000/day.' },
  { keywords: ['naran', 'kaghan', 'saif ul malook', 'lulusar'], reply: 'Naran Kaghan Valley is famous for Lake Saif-ul-Malook. Best time: June–September. Highlights: Lulusar Lake, Babusar Pass. Cost: PKR 50–100/night.' },
  { keywords: ['chitral', 'kalash', 'tirich mir'], reply: 'Chitral is home to the unique Kalash people and Tirich Mir peak. Best time: May–October. Highlights: Kalash Valleys, Chitral Fort. Cost: PKR 60–120/night.' },
  { keywords: ['mohenjo', 'indus', 'sindh', 'heritage'], reply: 'Mohenjo-Daro in Sindh is a UNESCO World Heritage Site from the Indus Valley Civilization (2500 BCE). Entry: PKR 500. Best time: Nov–Feb.' },
  { keywords: ['book', 'booking', 'tour', 'package', 'price', 'cost'], reply: 'We offer 3 packages: Basic (PKR 55,000/person, 3 days), Standard (PKR 97,000/person, 5 days), Premium (PKR 167,000/person, 7 days). Click "Book Now" to start your booking!' },
  { keywords: ['visa', 'passport', 'entry'], reply: 'Pakistan offers visa-on-arrival for 50+ countries. E-visa available at visa.nadra.gov.pk. Processing: 2–5 business days. Fee: $25–50 depending on nationality.' },
  { keywords: ['weather', 'climate', 'season', 'best time'], reply: 'Best time to visit Pakistan: North (Apr–Oct), Punjab/Sindh (Oct–Mar), Balochistan (Mar–May, Sep–Nov). Monsoon: July–August in most areas.' },
];

const getFallbackReply = (message) => {
  const lower = message.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      return entry.reply;
    }
  }
  return 'Pakistan is an amazing destination! Ask me about Hunza, Skardu, Swat, Lahore, Fairy Meadows, Naran, or Chitral. I can help with prices, best time to visit, and activities. 🇵🇰';
};

// POST /api/chat
export const chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, message: 'Message is required' });

    // Use Groq API if key is available
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here') {
      const body = JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful Pakistan travel assistant. Answer questions about Pakistani tourist destinations, travel tips, costs, best times to visit, and tour packages. Keep answers concise (2-4 sentences). Focus only on Pakistan tourism.'
          },
          { role: 'user', content: message }
        ],
        max_tokens: 200
      });

      const options = {
        hostname: 'api.groq.com',
        path: '/openai/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Length': Buffer.byteLength(body)
        }
      };

      const groqReply = await new Promise((resolve, reject) => {
        const reqGroq = https.request(options, (groqRes) => {
          let data = '';
          groqRes.on('data', chunk => data += chunk);
          groqRes.on('end', () => {
            try {
              const parsed = JSON.parse(data);
              resolve(parsed.choices?.[0]?.message?.content || getFallbackReply(message));
            } catch {
              resolve(getFallbackReply(message));
            }
          });
        });
        reqGroq.on('error', () => resolve(getFallbackReply(message)));
        reqGroq.write(body);
        reqGroq.end();
      });

      return res.json({ success: true, data: { reply: groqReply } });
    }

    // Fallback to local knowledge base
    res.json({ success: true, data: { reply: getFallbackReply(message) } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
