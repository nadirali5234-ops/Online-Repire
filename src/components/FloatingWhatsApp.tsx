import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Clock, 
  Tag, 
  CheckCircle2, 
  Phone, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/servicesData';
import { useCurrency } from '../context/CurrencyContext';
import { useServices } from '../context/ServicesContext';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  serviceId?: string;
  options?: { label: string; action: string; payload?: string }[];
}

export const FloatingWhatsApp: React.FC = () => {
  const { services } = useServices();
  const { currentCurrency, formatPriceRange } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'generator'>('chat');
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Message Generator Form State
  const [genName, setGenName] = useState('');
  const [genPhone, setGenPhone] = useState('');
  const [genServiceId, setGenServiceId] = useState(services[0]?.id || SERVICES_DATA[0].id);
  const [genAddress, setGenAddress] = useState('');
  const [genNote, setGenNote] = useState('');

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const initialGreeting: ChatMessage = {
    id: 'msg-1',
    sender: 'bot',
    text: `👋 Assalam-o-Alaikum! Welcome to Sayad Handyman WhatsApp Assistant.\n\nI can help you check service prices, repair & delivery times, or generate a formatted WhatsApp message to send directly to 03030352137.`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    options: [
      { label: '💰 Check All Prices & Rates', action: 'show_prices' },
      { label: '⏱️ Check Repair & Delivery Times', action: 'show_times' },
      { label: '🛠️ Select a Specific Service', action: 'show_services' },
      { label: '📱 Generate WhatsApp Message', action: 'open_generator' }
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (activeTab === 'generator' && previewRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight;
    }
  }, [genName, genPhone, genServiceId, genAddress, genNote, activeTab]);

  const handleSendUserMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      generateBotResponse(text);
      setIsTyping(false);
    }, 700);
  };

  const generateBotResponse = (userQuery: string) => {
    const q = userQuery.toLowerCase();
    let replyText = '';
    let options: { label: string; action: string; payload?: string }[] = [];

    // Match service keywords
    const matchedService = services.find(s => 
      q.includes(s.id) || 
      s.name.toLowerCase().includes(q) || 
      (q.includes('fridge') && s.id === 'appliance-fridge') ||
      (q.includes('washer') || q.includes('washing') && s.id === 'appliance-washer') ||
      (q.includes('ac') || q.includes('aircond') && s.id === 'aircond-service') ||
      (q.includes('computer') || q.includes('laptop') && s.id === 'computer-repair') ||
      (q.includes('awning') || q.includes('canvas') && s.id === 'canvas-awning') ||
      (q.includes('waterproof') || q.includes('leak') && s.id === 'waterproofing-leak') ||
      (q.includes('plumbing') || q.includes('pipe') && s.id === 'general-plumbing')
    );

    if (matchedService) {
      const priceFormatted = formatPriceRange(matchedService.usdMin, matchedService.usdMax);
      replyText = `🛠️ *${matchedService.name}*\n\n` +
        `💵 *Estimated Rate:* ${priceFormatted} (${currentCurrency.code})\n` +
        `⏱️ *Delivery / Completion Time:* ${matchedService.duration}\n` +
        `🛡️ *Warranty:* 90-Day Written Warranty\n` +
        `🚚 *Dispatch:* Same-Day Technician Visit Available!\n\n` +
        `Would you like to send a direct WhatsApp message to 03030352137 for this service?`;

      options = [
        { label: `📲 Chat on WhatsApp (03030352137)`, action: 'wa_direct', payload: matchedService.name },
        { label: '📝 Fill Booking Details', action: 'open_generator_service', payload: matchedService.id },
        { label: '🔍 Check Other Services', action: 'show_services' }
      ];
    } else if (q.includes('price') || q.includes('rate') || q.includes('cost') || q.includes('kitne') || q.includes('kitna') || q.includes('paisa')) {
      replyText = `💰 *Sayad Handyman Service Rates (${currentCurrency.code}):*\n\n` +
        services.map(s => `• *${s.name}:* ${formatPriceRange(s.usdMin, s.usdMax)}`).join('\n') +
        `\n\nAll prices include 90-day written warranty & diagnostic check!`;

      options = [
        { label: '⏱️ View Delivery / Repair Times', action: 'show_times' },
        { label: '📱 Create WhatsApp Order Msg', action: 'open_generator' }
      ];
    } else if (q.includes('time') || q.includes('deliver') || q.includes('duration') || q.includes('der') || q.includes('waqt')) {
      replyText = `⏱️ *Estimated Service & Delivery Times:*\n\n` +
        services.map(s => `• *${s.name}:* ${s.duration}`).join('\n') +
        `\n\n⚡ Technician arrival within 30 - 45 minutes for emergency requests!`;

      options = [
        { label: '💰 View Price Rates', action: 'show_prices' },
        { label: '📱 Create WhatsApp Order Msg', action: 'open_generator' }
      ];
    } else if (q.includes('number') || q.includes('phone') || q.includes('contact') || q.includes('whatsapp') || q.includes('call')) {
      replyText = `📞 *Sayad Handyman Direct Contact:*
WhatsApp: *03030352137* / *+92 303 0352137*
Hotline: *+92 303 0352137*
Hours: 24/7 Emergency Dispatch Available!`;

      options = [
        { label: '📲 Open WhatsApp App (03030352137)', action: 'wa_direct', payload: 'General Inquiry' },
        { label: '📝 Fill Booking Details', action: 'open_generator' }
      ];
    } else {
      replyText = `Thank you for your message! Our Master Tech Sayad is online at WhatsApp *03030352137*.\n\nYou can select a service below to check instant rates (${currentCurrency.code}) and delivery times, or generate an automated order message.`;

      options = [
        { label: '💰 Check Price Rates', action: 'show_prices' },
        { label: '⏱️ Check Repair Times', action: 'show_times' },
        { label: '🛠️ Select Service', action: 'show_services' },
        { label: '📱 Open WhatsApp (03030352137)', action: 'wa_direct', payload: userQuery }
      ];
    }

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options
    };

    setMessages(prev => [...prev, botMsg]);
  };

  const handleActionClick = (action: string, payload?: string) => {
    if (action === 'show_prices') {
      handleSendUserMessage('Show me all service prices and rates');
    } else if (action === 'show_times') {
      handleSendUserMessage('Show me repair and delivery times');
    } else if (action === 'show_services') {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Please tap any service below to inspect live rates in *${currentCurrency.code}* and turnaround time:`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: services.map(s => ({
          label: `🛠️ ${s.name}`,
          action: 'select_service',
          payload: s.id
        }))
      };
      setMessages(prev => [...prev, botMsg]);
    } else if (action === 'select_service' && payload) {
      const selected = services.find(s => s.id === payload);
      if (selected) {
        handleSendUserMessage(selected.name);
      }
    } else if (action === 'open_generator' || action === 'open_generator_service') {
      if (payload) setGenServiceId(payload);
      setActiveTab('generator');
    } else if (action === 'wa_direct') {
      const msg = payload || 'Hello Sayad Handyman, I want to inquire about repair service prices and technician visit.';
      const url = `https://wa.me/923030352137?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    }
  };

  // Generate complete structured WhatsApp message
  const getGeneratedWhatsAppText = () => {
    const srv = services.find(s => s.id === genServiceId) || services[0];
    const priceText = formatPriceRange(srv.usdMin, srv.usdMax);

    return `Hello Sayad Handyman (03030352137)! 👋%0A%0A` +
      `I would like to book a repair service:%0A` +
      `🛠️ *Service:* ${srv.name}%0A` +
      `💵 *Estimated Rate:* ${priceText} (${currentCurrency.code})%0A` +
      `⏱️ *Delivery/Repair Time:* ${srv.duration}%0A` +
      `👤 *Customer Name:* ${genName || 'Customer'}%0A` +
      `📞 *Phone Number:* ${genPhone || '03030352137'}%0A` +
      `📍 *Address/Location:* ${genAddress || 'City Center'}%0A` +
      (genNote ? `💬 *Issue Details:* ${genNote}%0A%0A` : '%0A') +
      `Please confirm technician arrival time. Thank you!`;
  };

  const handleOpenWhatsAppFromGenerator = () => {
    setIsSending(true);
    setSendSuccess(false);

    setTimeout(() => {
      const text = getGeneratedWhatsAppText();
      const url = `https://wa.me/923030352137?text=${text}`;
      window.open(url, '_blank');
      setIsSending(false);
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 3000);
    }, 600);
  };

  const copyGeneratedTextToClipboard = () => {
    const text = decodeURIComponent(getGeneratedWhatsAppText()).replace(/%0A/g, '\n');
    navigator.clipboard.writeText(text);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  const selectedGenService = services.find(s => s.id === genServiceId) || services[0];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      
      {/* Tooltip on floating button */}
      {showTooltip && !isOpen && (
        <div className="mb-3 max-w-xs rounded-2xl bg-slate-900 p-3.5 text-xs text-white shadow-2xl transition-all duration-300 border border-slate-700 animate-bounce sm:text-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-extrabold text-emerald-400 flex items-center gap-1">
                🤖 Master Tech WhatsApp Bot
              </p>
              <p className="mt-1 text-slate-300 text-xs">
                Check prices, repair times & chat on <strong>03030352137</strong>!
              </p>
            </div>
            <button 
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Close tooltip"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-slate-900 border-r border-b border-slate-700"></div>
        </div>
      )}

      {/* WhatsApp Chatbot Modal Container */}
      {isOpen ? (
        <div className="w-[360px] sm:w-[420px] h-[580px] bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-emerald-700 text-white p-4 flex items-center justify-between shadow-md relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-emerald-400 flex items-center justify-center font-bold text-emerald-400 text-sm">
                  S
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1">
                  Sayad Handyman Bot
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-medium">
                  WhatsApp: <span className="font-bold text-white">03030352137</span> • Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-emerald-600/60 text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Bar Switcher */}
          <div className="bg-slate-950 p-1.5 border-b border-slate-800 flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-1.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Chat & Rates</span>
            </button>

            <button
              onClick={() => setActiveTab('generator')}
              className={`flex-1 py-1.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'generator'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Msg Creator</span>
            </button>
          </div>

          {/* TAB 1: INTERACTIVE CHAT */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0 bg-slate-900">
              
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {messages.map((msg) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-1 mb-1 text-[10px] text-slate-400 px-1">
                        {isBot ? (
                          <>
                            <Bot className="w-3 h-3 text-emerald-400" />
                            <span>Sayad Bot • {msg.time}</span>
                          </>
                        ) : (
                          <>
                            <span>You • {msg.time}</span>
                            <User className="w-3 h-3 text-amber-400" />
                          </>
                        )}
                      </div>

                      <div
                        className={`max-w-[88%] p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed shadow-sm ${
                          isBot
                            ? 'bg-slate-800 border border-slate-700 text-slate-100 rounded-tl-none'
                            : 'bg-emerald-600 text-white rounded-tr-none font-medium'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Interactive Options Buttons */}
                      {msg.options && msg.options.length > 0 && (
                        <div className="mt-2.5 space-y-1.5 w-full max-w-[88%]">
                          {msg.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleActionClick(opt.action, opt.payload)}
                              className="w-full text-left px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 font-semibold transition-all flex items-center justify-between group text-[11px]"
                            >
                              <span>{opt.label}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2.5 bg-slate-800/90 px-3.5 py-2.5 rounded-2xl rounded-tl-none border border-slate-700/60 max-w-fit shadow-md animate-in fade-in slide-in-from-bottom-1 duration-200">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse [animation-delay:200ms]"></span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse [animation-delay:400ms]"></span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-300 tracking-wide">
                      Sayad Bot is typing...
                    </span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Footer */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendUserMessage()}
                  placeholder="Ask price, repair time, or service..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => handleSendUserMessage()}
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition-colors shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: WHATSAPP MESSAGE CREATOR */}
          {activeTab === 'generator' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-slate-900">
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-2xl text-emerald-200 text-[11px] leading-relaxed">
                📲 <strong>WhatsApp Order Builder:</strong> Fill out your service request details below. We will format a ready-to-send WhatsApp message that opens directly with number <strong>03030352137</strong>!
              </div>

              {/* Service Choice */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Select Repair Service:
                </label>
                <select
                  value={genServiceId}
                  onChange={(e) => setGenServiceId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {services.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} ({formatPriceRange(srv.usdMin, srv.usdMax)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Time & Rate Preview */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Estimated Rate:</span>
                  <span className="font-bold text-amber-400">{formatPriceRange(selectedGenService.usdMin, selectedGenService.usdMax)}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Completion / Delivery Time:</span>
                  <span className="font-bold text-emerald-400">{selectedGenService.duration}</span>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">Your Name:</label>
                  <input
                    type="text"
                    value={genName}
                    onChange={(e) => setGenName(e.target.value)}
                    placeholder="e.g. Ali Raza"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">Phone Number:</label>
                  <input
                    type="text"
                    value={genPhone}
                    onChange={(e) => setGenPhone(e.target.value)}
                    placeholder="e.g. 03030352137"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">City / Location Address:</label>
                <input
                  type="text"
                  value={genAddress}
                  onChange={(e) => setGenAddress(e.target.value)}
                  placeholder="Street / Area / City"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Issue Note */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Issue Description (Optional):</label>
                <textarea
                  rows={2}
                  value={genNote}
                  onChange={(e) => setGenNote(e.target.value)}
                  placeholder="e.g. Refrigerator not cooling properly..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Generated Message Live Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Generated WhatsApp Message Preview:
                  </label>
                  <button
                    type="button"
                    onClick={copyGeneratedTextToClipboard}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                  >
                    {copiedMsg ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMsg ? 'Copied' : 'Copy Text'}</span>
                  </button>
                </div>

                <div ref={previewRef} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto scroll-smooth">
                  {decodeURIComponent(getGeneratedWhatsAppText()).replace(/%0A/g, '\n')}
                </div>
              </div>

              {/* Main Action Button */}
              <button
                type="button"
                onClick={handleOpenWhatsAppFromGenerator}
                disabled={isSending}
                className={`w-full py-3.5 font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs relative overflow-hidden ${
                  sendSuccess
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30 scale-[0.99]'
                    : isSending
                    ? 'bg-emerald-700 text-white cursor-wait opacity-90'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 hover:scale-[1.01]'
                }`}
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                    <span className="animate-pulse">Formatting Message & Opening WhatsApp...</span>
                  </>
                ) : sendSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                    <span>WhatsApp Opened! Opening Direct Chat...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp (03030352137)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </div>
          )}

        </div>
      ) : (
        /* Floating Round WhatsApp Button */
        <button
          onClick={() => {
            setIsOpen(true);
            setShowTooltip(false);
          }}
          aria-label="Open Sayad Handyman WhatsApp Assistant"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:shadow-emerald-500/40 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-400"></span>
          </span>
          <MessageCircle className="h-7 w-7 transition-transform group-hover:scale-110" />
        </button>
      )}

    </div>
  );
};
