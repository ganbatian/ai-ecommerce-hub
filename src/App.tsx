import { useState } from 'react'
import { Search, ExternalLink, Star, ChevronDown, ChevronUp, ShoppingCart, MessageSquare, BarChart3, Wand2, TrendingUp, Image, Tag, Zap, Bot, Globe, PenTool } from 'lucide-react'

interface Tool { id: string; name: string; description: string; category: string; features: string[]; pricing: string; url: string; icon: string; rating: number; featured?: boolean }

const tools: Tool[] = [
  { id: '1', name: 'Shopify Magic', description: 'Shopify AI tools for product descriptions, customer support, and personalized marketing.', category: 'platform', features: ['AI Product Descriptions', 'Smart Replies', 'Personalized Marketing', 'Store Insights'], pricing: 'Included', url: 'https://www.shopify.com/tools/magic', icon: '🛒', rating: 5, featured: true },
  { id: '2', name: 'Shopify Sidekick', description: 'Shopify AI assistant for store management in natural language.', category: 'assistant', features: ['Natural Language', 'Order Management', 'Analytics'], pricing: 'Shopify Plus', url: 'https://www.shopify.com/sidekick', icon: '🤖', rating: 5, featured: true },
  { id: '3', name: 'Flair AI', description: 'AI product photography - drag and drop products onto beautiful lifestyle scenes.', category: 'image', features: ['Lifestyle Scenes', 'Product Mockups', 'Brand Kit', 'Batch Generation'], pricing: 'Free Beta', url: 'https://flair.air', icon: '📷', rating: 4, featured: true },
  { id: '4', name: 'Zendesk AI', description: 'Enterprise customer service platform with AI agents for e-commerce.', category: 'chatbot', features: ['AI Agents', 'Smart Triage', 'Self-service Portal'], pricing: 'Suite Team', url: 'https://www.zendesk.com/ai', icon: '💬', rating: 5 },
  { id: '5', name: 'Copy.ai', description: 'AI copywriting for product pages, email sequences, and social media.', category: 'copywriting', features: ['Product Copy', 'Email Sequences', 'Social Captions', 'SEO Content'], pricing: 'Free + Pro', url: 'https://www.copy.ai', icon: '📝', rating: 4 },
  { id: '6', name: 'Jasper AI', description: 'Enterprise AI content platform with e-commerce templates for Amazon listings.', category: 'copywriting', features: ['Amazon Listing', 'Campaign Templates', 'Brand Voice', 'Multi-language'], pricing: 'Business', url: 'https://www.jasper.ai', icon: '⚙️', rating: 5 },
  { id: '7', name: 'Midjourney', description: 'AI image generation for product photography and brand visuals.', category: 'image', features: ['Product Photography', 'Lifestyle Images', 'Brand Visuals'], pricing: '10-120/mo', url: 'https://www.midjourney.com', icon: '🖼️', rating: 5 },
  { id: '8', name: 'Octane AI', description: 'AI-powered quiz and personalization platform for Shopify.', category: 'marketing', features: ['Quiz Builder', 'Product Recommender', 'SMS Automation'], pricing: '99-499/mo', url: 'https://www.octaneai.com', icon: '🤝', rating: 4 },
  { id: '9', name: 'Lighthouse', description: 'AI SEO platform for e-commerce technical audits and content optimization.', category: 'seo', features: ['Technical Audit', 'Keyword Tracking', 'Content Suggestions'], pricing: '99-499/mo', url: 'https://lumar.io/lighthouse', icon: '🏠', rating: 4 },
  { id: '10', name: 'Pimaxal', description: 'AI-powered Amazon listing optimization and PPC automation.', category: 'amazon', features: ['Keyword Research', 'Competitor Spy', 'PPC Automation'], pricing: '49-199/mo', url: 'https://www.pimaxal.com', icon: '👟', rating: 4 },
  { id: '11', name: 'Sellergy', description: 'AI-driven e-commerce growth with predictive analytics.', category: 'analytics', features: ['Sales Prediction', 'Inventory Optimization', 'Segmentation'], pricing: 'Custom', url: 'https://sellergy.com', icon: '📊', rating: 4 },
  { id: '12', name: 'Google Merchant Next', description: 'Google AI-powered product feed management and optimization.', category: 'platform', features: ['AI Feed Optimization', 'Performance Insights', 'Shopping Ads'], pricing: 'Free', url: 'https://merchants.google.com', icon: '🌐', rating: 4 },
  { id: '13', name: 'Shopify Flow', description: 'Free e-commerce automation for task workflows.', category: 'automation', features: ['Workflow Builder', 'App Integrations', 'Order Automation'], pricing: 'Free', url: 'https://shopify.com/flow', icon: '⚡', rating: 4 },
  { id: '14', name: 'Yaguara', description: 'AI growth operating system for cross-channel attribution.', category: 'analytics', features: ['Attribution', 'Forecasting', 'KPI Dashboards'], pricing: '149/mo+', url: 'https://yaguara.co', icon: '📈', rating: 4 },
  { id: '15', name: 'Reconvert Upsells', description: 'AI-driven post-purchase upsell and cross-sell for Shopify.', category: 'marketing', features: ['Post-purchase Upsells', 'Thank-you Page', 'AOV Boost'], pricing: '49-299/mo', url: 'https://reconvert.io', icon: '📦', rating: 4 },
  { id: '16', name: 'Pinterest AI', description: 'AI-powered ad creative tools for visual commerce.', category: 'ads', features: ['AI Ad Creatives', 'Smart Audiences', 'Auto Bidding'], pricing: 'Performance', url: 'https://ads.pinterest.com', icon: '📌', rating: 4 },
  { id: '17', name: 'Coral AI', description: 'AI customer service chatbot with personalization.', category: 'chatbot', features: ['24/7 Support', 'Order Tracking', 'Recommendations'], pricing: 'Custom', url: 'https://coral.ai', icon: '🤖', rating: 4 },
  { id: '18', name: 'Shopify Inbox', description: 'Free Shopify chat with AI automated replies.', category: 'chatbot', features: ['Automated Replies', 'Shop Sessions Chat', 'Quick Replies'], pricing: 'Free', url: 'https://apps.shopify.com/shopify-inbox', icon: '📨', rating: 3 }
]

const categories = [
  { id: 'all', name: 'All', icon: <ShoppingCart className="w-4 h-4" /> },
  { id: 'platform', name: 'Platform', icon: <Globe className="w-4 h-4" /> },
  { id: 'assistant', name: 'AI Assistant', icon: <Bot className="w-4 h-4" /> },
  { id: 'chatbot', name: 'Customer Service', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'image', name: 'Product Images', icon: <Image className="w-4 h-4" /> },
  { id: 'copywriting', name: 'Copywriting', icon: <PenTool className="w-4 h-4" /> },
  { id: 'marketing', name: 'Marketing', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'automation', name: 'Automation', icon: <Zap className="w-4 h-4" /> },
  { id: 'seo', name: 'SEO', icon: <Wand2 className="w-4 h-4" /> },
  { id: 'amazon', name: 'Amazon Seller', icon: <Tag className="w-4 h-4" /> },
  { id: 'ads', name: 'Ads', icon: <TrendingUp className="w-4 h-4" /> },
]

const pricingOptions = [
  { id: 'all', name: 'All' },
  { id: 'free', name: 'Free' },
  { id: 'paid', name: 'Paid' }
]

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPricing, setSelectedPricing] = useState('all')
  const [expandedTool, setExpandedTool] = useState(null)

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    const matchesPricing = selectedPricing === 'all' ||
                          (selectedPricing === 'free' && tool.pricing.toLowerCase().includes('free')) ||
                          (selectedPricing === 'paid' && !tool.pricing.toLowerCase().includes('free'))
    return matchesSearch && matchesCategory && matchesPricing
  })

  const featuredTools = tools.filter(t => t.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900">
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50 bg-amber-950/80">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI E-commerce Hub</h1>
              <p className="text-xs text-amber-300">AI&#x7535;&#x5546;&#x8FD0;&#x8425;&#x5DE5;&#x5177;&#x5BFC;&#x822A;</p>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Power Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">E-commerce</span> with AI
          </h2>
          <p className="text-amber-200/70 max-w-2xl mx-auto">18+ AI tools for product images, customer service, copywriting, analytics, and marketing automation</p>
        </div>
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /> Editor Picks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTools.map(tool => (
              <a key={tool.id} href={tool.url} target="_blank" rel="noopener noreferrer"
                className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/50 transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white group-hover:text-orange-400 transition-colors truncate">{tool.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tool.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search tools..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${selectedCategory === cat.id ? 'bg-orange-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                {cat.icon}{cat.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {pricingOptions.map(p => (
              <button key={p.id} onClick={() => setSelectedPricing(p.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${selectedPricing === p.id ? 'bg-amber-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map(tool => (
            <div key={tool.id} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/30 transition-all">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{tool.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white truncate">{tool.name}</h4>
                    {tool.featured && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded">{categories.find(c => c.id === tool.category)?.name}</span>
                    <span className="text-xs text-gray-500">{tool.pricing}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{tool.description}</p>
              <button onClick={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
                className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 mb-2">
                {expandedTool === tool.id ? <><ChevronUp className="w-3 h-3" /> Collapse</> : <><ChevronDown className="w-3 h-3" /> See Details</>}
              </button>
              {expandedTool === tool.id && (
                <div className="mb-3 p-2 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Key Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {tool.features.map((f, i) => <span key={i} className="text-xs px-2 py-1 bg-white/5 text-gray-300 rounded">{f}</span>)}
                  </div>
                </div>
              )}
              <a href={tool.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm rounded-lg hover:opacity-90 transition-opacity">
                Visit <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
        <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div><div className="text-3xl font-bold text-white">{tools.length}+</div><div className="text-sm text-gray-400">Total Tools</div></div>
            <div><div className="text-3xl font-bold text-white">{categories.length - 1}</div><div className="text-sm text-gray-400">Categories</div></div>
            <div><div className="text-3xl font-bold text-white">{tools.filter(t => t.pricing.toLowerCase().includes('free')).length}</div><div className="text-sm text-gray-400">Free Tools</div></div>
            <div><div className="text-3xl font-bold text-white">2026</div><div className="text-sm text-gray-400">Updated</div></div>
          </div>
        </div>
      </main>
      <footer className="border-t border-white/10 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">AI E-commerce Hub - Curated AI Tools for Online Retailers</div>
      </footer>
    </div>
  )
}

export default App
