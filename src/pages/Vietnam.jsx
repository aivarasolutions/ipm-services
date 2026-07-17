import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe, TrendingUp, Users, ShieldCheck, Sparkles, CheckCircle2,
  BadgeCheck, Building2, KeyRound, Eye, Wifi, Wind, Droplets,
  Sofa, UtensilsCrossed, Bath, Lock, Star, HeartHandshake, Laptop,
  Briefcase, CalendarClock, MapPin, Phone, Mail, Home
} from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: '🇺🇸 English' },
  { code: 'vi', label: '🇻🇳 Tiếng Việt' },
];

const content = {
  en: {
    metaTitle: 'Property Management Da Nang | Vacation Rental Management Vietnam | IPM',
    metaDescription:
      'International Property Management offers professional Airbnb and short-term rental management in Da Nang, Vietnam. Listing promotion, full property management, and the IPM Verified quality program for Vietnamese property owners.',
    hero: {
      badge: 'Now Expanding to Da Nang, Vietnam',
      title: 'Expand Your Property to International Travelers',
      subtitle:
        'International Property Management helps Vietnamese property owners increase bookings, improve guest experience, and professionally manage short-term rentals for travelers from around the world.',
      ctaPrimary: 'Schedule a Consultation',
      ctaSecondary: 'Become a Partner',
    },
    alts: {
      interior: 'Bright luxury apartment living room with ocean view — professionally managed by IPM',
      bedroom: 'Pristine, professionally prepared bedroom with fresh linens',
      danang: 'Da Nang, Vietnam — Dragon Bridge and city skyline over the Han River',
      pool: 'Resort pool illuminated at night with palm trees',
    },
    whyIpm: {
      title: 'Why IPM',
      subtitle:
        'IPM is an international hospitality and property management company. We market properties across multiple booking channels and our own platforms — reaching international travelers that many local owners never reach.',
      items: [
        { icon: TrendingUp, title: 'Increased Occupancy', text: 'Multi-channel distribution and pricing strategy designed to keep your calendar full year-round.' },
        { icon: Sparkles, title: 'Increased Revenue', text: 'Dynamic pricing and revenue optimization based on demand, seasonality, and international travel trends.' },
        { icon: HeartHandshake, title: 'Better Guest Experiences', text: 'Professional communication and hospitality standards that earn five-star reviews and repeat guests.' },
        { icon: ShieldCheck, title: 'Higher Property Standards', text: 'Inspections and quality controls that keep your property competitive with international hotels.' },
        { icon: Globe, title: 'International Marketing', text: 'Your property promoted to travelers in North America, Europe, Korea, Japan, and beyond.' },
        { icon: Building2, title: 'Professional Operations', text: 'Systems for check-in, cleaning, maintenance, and reporting — run like a hospitality business.' },
      ],
    },
    pricing: {
      title: 'Our Management Options',
      subtitle: 'Two simple plans. No hidden fees. Choose the level of support that fits how you want to operate.',
      plans: [
        {
          name: 'Listing Promotion',
          rate: '10%',
          rateLabel: 'Commission',
          tagline: 'Perfect for owners who manage their own property but want more bookings.',
          features: [
            'Professional listing optimization',
            'International marketing',
            'Pricing optimization',
            'Booking management',
            'Guest communication support',
            'No long-term contracts',
          ],
          cta: 'Start with Listing Promotion',
          featured: false,
        },
        {
          name: 'Full Property Management',
          rate: '20%',
          rateLabel: 'Commission',
          tagline: 'Everything included — we run your property like a professional hospitality operation.',
          features: [
            'Guest communications',
            'Check-in coordination',
            'Cleaning coordination',
            'Maintenance coordination',
            'Property inspections',
            'Revenue optimization',
            'Multi-platform distribution',
            'Owner reporting',
            'Operational management',
          ],
          cta: 'Get Full Management',
          featured: true,
          featuredLabel: 'Most Popular',
        },
      ],
    },
    verified: {
      badge: 'IPM Quality Assurance Program',
      title: 'IPM Verified™',
      subtitle:
        'Every verified property is personally inspected by our team before earning the IPM Verified badge. If a property meets our standards, it earns the IPM Verified seal — a trust symbol that differentiates our listings from many unverified rentals.',
      inspectionTitle: 'Our Inspection Covers',
      items: [
        { icon: Sparkles, label: 'Cleanliness' },
        { icon: ShieldCheck, label: 'Safety' },
        { icon: Wifi, label: 'Internet Quality' },
        { icon: Wind, label: 'Air Conditioning' },
        { icon: Droplets, label: 'Water Pressure' },
        { icon: Sofa, label: 'Furniture Condition' },
        { icon: UtensilsCrossed, label: 'Kitchen Equipment' },
        { icon: Bath, label: 'Bathroom Quality' },
        { icon: Lock, label: 'Security' },
        { icon: Star, label: 'Overall Guest Experience' },
      ],
      trust: 'Guests can book with confidence knowing the property has been professionally inspected.',
      disclaimer:
        'IPM Verified™ is an internal quality assurance program by International Property Management. It is not a government certification or official regulatory approval.',
    },
    whyMatters: {
      title: 'Why This Matters',
      subtitle: 'Many international travelers worry about:',
      concerns: [
        'Misleading photos',
        'Poor cleanliness',
        'Broken amenities',
        'Communication barriers',
        'Unexpected issues after arrival',
      ],
      resolution:
        'IPM reduces these concerns through professional standards, personal inspections, and consistent quality. When guests trust the property, they book faster, pay better rates, and leave better reviews.',
    },
    whyVietnam: {
      title: 'Why Vietnam',
      subtitle:
        'Vietnam is one of the fastest-growing tourism markets in Southeast Asia — and Da Nang is at the center of it. Our goal is to help Vietnamese property owners access these international markets while maintaining full ownership of their property.',
      items: [
        { icon: Globe, title: 'Growing International Tourism', text: 'Record international arrivals with strong growth from Korea, Japan, Europe, and North America.' },
        { icon: Laptop, title: 'Digital Nomads', text: 'Da Nang is a top destination for remote workers seeking beach living, fast internet, and affordability.' },
        { icon: Users, title: 'Families', text: 'Safe beaches, resorts, and attractions make Da Nang increasingly popular for family travel.' },
        { icon: Briefcase, title: 'Business Travelers', text: 'A growing tech and business hub attracting professional travelers who prefer serviced stays.' },
        { icon: CalendarClock, title: 'Long-Term Stays', text: 'Monthly stays are rising fast — stable income for owners beyond nightly bookings.' },
        { icon: TrendingUp, title: 'Rising Global Interest in Da Nang', text: 'International media and travel platforms consistently rank Da Nang among Asia\u2019s must-visit destinations.' },
      ],
    },
    ownership: {
      title: 'You Keep Ownership. Always.',
      points: [
        { icon: KeyRound, title: 'You Remain the Legal Owner', text: 'Owners always remain the legal owners of their property. Nothing about ownership changes — ever.' },
        { icon: Building2, title: 'IPM Manages Operations', text: 'IPM simply manages bookings and operations under the management plan you select.' },
        { icon: Eye, title: 'Full Visibility', text: 'Monitor performance through owner reporting and maintain complete visibility into your property.' },
      ],
    },
    vision: {
      title: 'Our Future Vision',
      subtitle:
        'We want to build one of Vietnam\u2019s most trusted international property management networks by combining:',
      pillars: [
        'Professional inspections',
        'International marketing',
        'Technology',
        'Transparent communication',
        'High hospitality standards',
        'Reliable owner support',
      ],
    },
    form: {
      title: 'Schedule Your Consultation',
      subtitle:
        'Tell us about your property and we\u2019ll show you what international management can do for it. No obligation.',
      fields: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        address: 'Property Address',
        bedrooms: 'Number of Bedrooms',
        platform: 'Current Rental Platform',
        platformPlaceholder: 'e.g. Airbnb, Booking.com, none',
        message: 'Message',
        messagePlaceholder: 'Tell us about your property and your goals…',
      },
      submit: 'Schedule My Consultation',
      sending: 'Sending…',
      successTitle: 'Thank You!',
      successText: 'We\u2019ve received your request. Our team will contact you shortly to schedule your consultation.',
      error: 'Something went wrong. Please try again or email us directly.',
      required: 'Please fill in your name, email, and phone.',
    },
  },
  vi: {
    metaTitle: 'Quản Lý Bất Động Sản Đà Nẵng | Quản Lý Căn Hộ Cho Thuê Việt Nam | IPM',
    metaDescription:
      'International Property Management cung cấp dịch vụ quản lý Airbnb và cho thuê ngắn hạn chuyên nghiệp tại Đà Nẵng, Việt Nam. Quảng bá chỗ nghỉ, quản lý toàn diện và chương trình chất lượng IPM Verified dành cho chủ nhà Việt Nam.',
    hero: {
      badge: 'Chính thức mở rộng đến Đà Nẵng, Việt Nam',
      title: 'Đưa Bất Động Sản Của Bạn Đến Với Du Khách Quốc Tế',
      subtitle:
        'International Property Management giúp chủ nhà Việt Nam tăng lượt đặt phòng, nâng cao trải nghiệm khách lưu trú và quản lý chuyên nghiệp căn hộ cho thuê ngắn hạn dành cho du khách từ khắp nơi trên thế giới.',
      ctaPrimary: 'Đặt Lịch Tư Vấn',
      ctaSecondary: 'Trở Thành Đối Tác',
    },
    alts: {
      interior: 'Phòng khách căn hộ sang trọng, sáng sủa với tầm nhìn ra biển — được IPM quản lý chuyên nghiệp',
      bedroom: 'Phòng ngủ được chuẩn bị chuyên nghiệp với ga giường sạch sẽ',
      danang: 'Đà Nẵng, Việt Nam — Cầu Rồng và đường chân trời thành phố bên sông Hàn',
      pool: 'Hồ bơi khu nghỉ dưỡng lung linh về đêm với hàng dừa',
    },
    whyIpm: {
      title: 'Vì Sao Chọn IPM',
      subtitle:
        'IPM là công ty quản lý bất động sản và dịch vụ lưu trú quốc tế. Chúng tôi quảng bá chỗ nghỉ trên nhiều kênh đặt phòng và nền tảng riêng của mình — tiếp cận du khách quốc tế mà nhiều chủ nhà trong nước chưa từng tiếp cận được.',
      items: [
        { icon: TrendingUp, title: 'Tăng Tỷ Lệ Lấp Đầy', text: 'Phân phối đa kênh và chiến lược giá giúp lịch đặt phòng của bạn luôn kín quanh năm.' },
        { icon: Sparkles, title: 'Tăng Doanh Thu', text: 'Định giá linh hoạt và tối ưu doanh thu dựa trên nhu cầu, mùa vụ và xu hướng du lịch quốc tế.' },
        { icon: HeartHandshake, title: 'Trải Nghiệm Khách Tốt Hơn', text: 'Giao tiếp chuyên nghiệp và tiêu chuẩn dịch vụ giúp nhận đánh giá 5 sao và khách quay lại.' },
        { icon: ShieldCheck, title: 'Tiêu Chuẩn Cao Hơn', text: 'Kiểm tra và kiểm soát chất lượng giúp chỗ nghỉ của bạn cạnh tranh với khách sạn quốc tế.' },
        { icon: Globe, title: 'Tiếp Thị Quốc Tế', text: 'Chỗ nghỉ của bạn được quảng bá đến du khách Bắc Mỹ, Châu Âu, Hàn Quốc, Nhật Bản và nhiều nơi khác.' },
        { icon: Building2, title: 'Vận Hành Chuyên Nghiệp', text: 'Hệ thống nhận phòng, dọn dẹp, bảo trì và báo cáo — vận hành như một doanh nghiệp lưu trú.' },
      ],
    },
    pricing: {
      title: 'Các Gói Quản Lý',
      subtitle: 'Hai gói đơn giản. Không phí ẩn. Chọn mức hỗ trợ phù hợp với cách bạn muốn vận hành.',
      plans: [
        {
          name: 'Quảng Bá Chỗ Nghỉ',
          rate: '10%',
          rateLabel: 'Hoa Hồng',
          tagline: 'Phù hợp với chủ nhà tự quản lý nhưng muốn có thêm lượt đặt phòng.',
          features: [
            'Tối ưu hóa tin đăng chuyên nghiệp',
            'Tiếp thị quốc tế',
            'Tối ưu hóa giá',
            'Quản lý đặt phòng',
            'Hỗ trợ giao tiếp với khách',
            'Không ràng buộc hợp đồng dài hạn',
          ],
          cta: 'Bắt Đầu Với Gói Quảng Bá',
          featured: false,
        },
        {
          name: 'Quản Lý Toàn Diện',
          rate: '20%',
          rateLabel: 'Hoa Hồng',
          tagline: 'Bao gồm tất cả — chúng tôi vận hành chỗ nghỉ của bạn như một cơ sở lưu trú chuyên nghiệp.',
          features: [
            'Giao tiếp với khách lưu trú',
            'Điều phối nhận phòng',
            'Điều phối dọn dẹp',
            'Điều phối bảo trì',
            'Kiểm tra định kỳ chỗ nghỉ',
            'Tối ưu hóa doanh thu',
            'Phân phối đa nền tảng',
            'Báo cáo cho chủ nhà',
            'Quản lý vận hành',
          ],
          cta: 'Chọn Quản Lý Toàn Diện',
          featured: true,
          featuredLabel: 'Phổ Biến Nhất',
        },
      ],
    },
    verified: {
      badge: 'Chương Trình Đảm Bảo Chất Lượng IPM',
      title: 'IPM Verified™',
      subtitle:
        'Mỗi chỗ nghỉ được xác minh đều do đội ngũ của chúng tôi trực tiếp kiểm tra trước khi nhận huy hiệu IPM Verified. Nếu chỗ nghỉ đạt tiêu chuẩn, nó sẽ nhận được dấu IPM Verified — biểu tượng niềm tin giúp phân biệt với nhiều chỗ nghỉ chưa được kiểm chứng.',
      inspectionTitle: 'Nội Dung Kiểm Tra',
      items: [
        { icon: Sparkles, label: 'Vệ sinh sạch sẽ' },
        { icon: ShieldCheck, label: 'An toàn' },
        { icon: Wifi, label: 'Chất lượng Internet' },
        { icon: Wind, label: 'Điều hòa không khí' },
        { icon: Droplets, label: 'Áp lực nước' },
        { icon: Sofa, label: 'Tình trạng nội thất' },
        { icon: UtensilsCrossed, label: 'Thiết bị nhà bếp' },
        { icon: Bath, label: 'Chất lượng phòng tắm' },
        { icon: Lock, label: 'An ninh' },
        { icon: Star, label: 'Trải nghiệm tổng thể của khách' },
      ],
      trust: 'Khách có thể yên tâm đặt phòng vì chỗ nghỉ đã được kiểm tra chuyên nghiệp.',
      disclaimer:
        'IPM Verified™ là chương trình đảm bảo chất lượng nội bộ của International Property Management. Đây không phải là chứng nhận của chính phủ hay phê duyệt pháp lý chính thức.',
    },
    whyMatters: {
      title: 'Vì Sao Điều Này Quan Trọng',
      subtitle: 'Nhiều du khách quốc tế thường lo lắng về:',
      concerns: [
        'Hình ảnh không đúng thực tế',
        'Vệ sinh kém',
        'Tiện nghi hư hỏng',
        'Rào cản ngôn ngữ',
        'Sự cố bất ngờ sau khi nhận phòng',
      ],
      resolution:
        'IPM giảm thiểu những lo lắng này thông qua tiêu chuẩn chuyên nghiệp, kiểm tra trực tiếp và chất lượng ổn định. Khi khách tin tưởng chỗ nghỉ, họ đặt nhanh hơn, trả giá tốt hơn và để lại đánh giá tốt hơn.',
    },
    whyVietnam: {
      title: 'Vì Sao Là Việt Nam',
      subtitle:
        'Việt Nam là một trong những thị trường du lịch phát triển nhanh nhất Đông Nam Á — và Đà Nẵng là trung tâm của sự phát triển đó. Mục tiêu của chúng tôi là giúp chủ nhà Việt Nam tiếp cận thị trường quốc tế trong khi vẫn giữ toàn quyền sở hữu bất động sản của mình.',
      items: [
        { icon: Globe, title: 'Du Lịch Quốc Tế Tăng Trưởng', text: 'Lượng khách quốc tế đạt kỷ lục với mức tăng mạnh từ Hàn Quốc, Nhật Bản, Châu Âu và Bắc Mỹ.' },
        { icon: Laptop, title: 'Digital Nomad', text: 'Đà Nẵng là điểm đến hàng đầu cho người làm việc từ xa: biển đẹp, internet nhanh, chi phí hợp lý.' },
        { icon: Users, title: 'Gia Đình', text: 'Bãi biển an toàn, khu nghỉ dưỡng và điểm tham quan khiến Đà Nẵng ngày càng thu hút khách gia đình.' },
        { icon: Briefcase, title: 'Khách Công Tác', text: 'Trung tâm công nghệ và kinh doanh đang phát triển, thu hút khách công tác ưa chuộng lưu trú có dịch vụ.' },
        { icon: CalendarClock, title: 'Lưu Trú Dài Hạn', text: 'Thuê theo tháng tăng nhanh — nguồn thu ổn định cho chủ nhà ngoài đặt phòng theo đêm.' },
        { icon: TrendingUp, title: 'Đà Nẵng Được Thế Giới Chú Ý', text: 'Truyền thông và các nền tảng du lịch quốc tế liên tục xếp Đà Nẵng vào nhóm điểm đến hàng đầu châu Á.' },
      ],
    },
    ownership: {
      title: 'Bạn Luôn Giữ Quyền Sở Hữu.',
      points: [
        { icon: KeyRound, title: 'Bạn Vẫn Là Chủ Sở Hữu Hợp Pháp', text: 'Chủ nhà luôn là chủ sở hữu hợp pháp của bất động sản. Quyền sở hữu không bao giờ thay đổi.' },
        { icon: Building2, title: 'IPM Quản Lý Vận Hành', text: 'IPM chỉ quản lý đặt phòng và vận hành theo gói quản lý mà bạn lựa chọn.' },
        { icon: Eye, title: 'Minh Bạch Hoàn Toàn', text: 'Theo dõi hiệu quả qua báo cáo dành cho chủ nhà và luôn nắm rõ tình trạng bất động sản của bạn.' },
      ],
    },
    vision: {
      title: 'Tầm Nhìn Tương Lai',
      subtitle:
        'Chúng tôi muốn xây dựng một trong những mạng lưới quản lý bất động sản quốc tế đáng tin cậy nhất Việt Nam bằng cách kết hợp:',
      pillars: [
        'Kiểm tra chuyên nghiệp',
        'Tiếp thị quốc tế',
        'Công nghệ',
        'Giao tiếp minh bạch',
        'Tiêu chuẩn dịch vụ cao',
        'Hỗ trợ chủ nhà tận tâm',
      ],
    },
    form: {
      title: 'Đặt Lịch Tư Vấn',
      subtitle:
        'Hãy cho chúng tôi biết về bất động sản của bạn và chúng tôi sẽ cho bạn thấy quản lý quốc tế có thể mang lại điều gì. Hoàn toàn không ràng buộc.',
      fields: {
        name: 'Họ và Tên',
        phone: 'Số Điện Thoại',
        email: 'Email',
        address: 'Địa Chỉ Bất Động Sản',
        bedrooms: 'Số Phòng Ngủ',
        platform: 'Nền Tảng Cho Thuê Hiện Tại',
        platformPlaceholder: 'VD: Airbnb, Booking.com, chưa có',
        message: 'Lời Nhắn',
        messagePlaceholder: 'Chia sẻ về bất động sản và mục tiêu của bạn…',
      },
      submit: 'Đặt Lịch Tư Vấn Của Tôi',
      sending: 'Đang gửi…',
      successTitle: 'Cảm Ơn Bạn!',
      successText: 'Chúng tôi đã nhận được yêu cầu. Đội ngũ IPM sẽ liên hệ với bạn sớm để sắp xếp buổi tư vấn.',
      error: 'Đã có lỗi xảy ra. Vui lòng thử lại hoặc gửi email trực tiếp cho chúng tôi.',
      required: 'Vui lòng điền họ tên, email và số điện thoại.',
    },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: 'easeOut' },
};

export default function Vietnam() {
  const [lang, setLang] = useState('en');
  const t = content[lang];

  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', bedrooms: '', platform: '', message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | invalid

  useEffect(() => {
    document.title = t.metaTitle;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', t.metaDescription);
  }, [t]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const scrollToForm = () => {
    document.getElementById('vn-consult')?.scrollIntoView({ behavior: 'smooth' });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setStatus('invalid');
      return;
    }
    setStatus('sending');
    try {
      const details = [
        `Property Address: ${form.address.trim() || '—'}`,
        `Bedrooms: ${form.bedrooms.trim() || '—'}`,
        `Current Platform: ${form.platform.trim() || '—'}`,
        '',
        form.message.trim() || '(no message)',
      ].join('\n');
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: 'Vietnam Owner Consultation Request (Da Nang)',
          message: details,
          propertyType: 'Vietnam Property Owner',
          source: 'Vietnam Owners Page — Contact Consultation',
        }),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      if (typeof gtag === 'function') gtag('event', 'book_click', {});
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="bg-[#06121F] text-[#C9D2DE]">
      {/* Language Toggle */}
      <div className="sticky top-16 z-40 flex justify-end px-4 sm:px-8 pt-4 pointer-events-none">
        <div className="pointer-events-auto inline-flex rounded-full border border-[#D4AF37]/40 bg-[#0A1A30]/95 backdrop-blur-sm p-1 shadow-lg shadow-[#06121F]/60">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              aria-pressed={lang === l.code}
              onClick={() => setLang(l.code)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                lang === l.code
                  ? 'bg-[#D4AF37] text-[#06121F]'
                  : 'text-[#C9D2DE] hover:text-[#F2D98D]'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A30] via-[#06121F] to-[#0F2440]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#0F2440] px-4 py-1.5 text-sm font-semibold text-[#F2D98D]">
              <MapPin className="w-4 h-4" /> {t.hero.badge}
            </span>
            <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {t.hero.title}
            </h1>
            <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 rounded-lg bg-[#D4AF37] text-[#06121F] font-bold text-lg hover:bg-[#F2D98D] transition-colors shadow-lg shadow-[#D4AF37]/20"
              >
                {t.hero.ctaPrimary}
              </button>
              <button
                onClick={scrollToForm}
                className="px-8 py-4 rounded-lg border-2 border-[#D4AF37] text-[#F2D98D] font-bold text-lg hover:bg-[#D4AF37]/10 transition-colors"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why IPM */}
      <section className="py-20 bg-[#0A1A30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">{t.whyIpm.title}</h2>
              <p className="mt-4 text-lg leading-relaxed">{t.whyIpm.subtitle}</p>
            </div>
            <img
              src="/images/vietnam/luxury-interior.jpg"
              alt={t.alts.interior}
              loading="lazy"
              className="rounded-2xl border border-[#D4AF37]/25 shadow-xl shadow-[#06121F]/60 w-full h-64 sm:h-72 object-cover"
            />
          </motion.div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.whyIpm.items.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="rounded-xl border border-[#D4AF37]/15 bg-[#0F2440] p-7 hover:border-[#D4AF37]/40 transition-colors"
              >
                <item.icon className="w-9 h-9 text-[#D4AF37]" />
                <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">{t.pricing.title}</h2>
            <p className="mt-4 text-lg">{t.pricing.subtitle}</p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-2 gap-8 items-stretch">
            {t.pricing.plans.map((plan, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.featured
                    ? 'bg-[#0F2440] border-2 border-[#D4AF37] shadow-xl shadow-[#D4AF37]/10'
                    : 'bg-[#0A1A30] border border-[#D4AF37]/20'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#D4AF37] px-4 py-1 text-sm font-bold text-[#06121F]">
                    {plan.featuredLabel}
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-[#D4AF37]">{plan.rate}</span>
                  <span className="text-lg text-[#C9D2DE]">{plan.rateLabel}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed">{plan.tagline}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToForm}
                  className={`mt-8 w-full py-3.5 rounded-lg font-bold transition-colors ${
                    plan.featured
                      ? 'bg-[#D4AF37] text-[#06121F] hover:bg-[#F2D98D]'
                      : 'border-2 border-[#D4AF37] text-[#F2D98D] hover:bg-[#D4AF37]/10'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IPM Verified */}
      <section className="py-20 bg-[#0A1A30]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#0F2440] px-4 py-1.5 text-sm font-semibold text-[#F2D98D]">
              <BadgeCheck className="w-4 h-4" /> {t.verified.badge}
            </span>
            <h2 className="font-display mt-5 text-3xl sm:text-4xl font-bold text-white">{t.verified.title}</h2>
            <p className="mt-4 text-lg leading-relaxed">{t.verified.subtitle}</p>
          </motion.div>

          <motion.div {...fadeUp} className="mt-12 max-w-4xl mx-auto">
            <img
              src="/images/vietnam/pristine-bedroom.jpg"
              alt={t.alts.bedroom}
              loading="lazy"
              className="rounded-2xl border border-[#D4AF37]/25 shadow-xl shadow-[#06121F]/60 w-full h-64 sm:h-80 object-cover"
            />
          </motion.div>

          <motion.div {...fadeUp} className="mt-10 rounded-2xl border border-[#D4AF37]/25 bg-[#0F2440] p-8 sm:p-10">
            <h3 className="text-center font-display text-xl font-bold text-[#F2D98D]">{t.verified.inspectionTitle}</h3>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {t.verified.items.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 rounded-lg bg-[#0A1A30] px-3 py-5 text-center">
                  <item.icon className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-sm font-medium text-white">{item.label}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]/70" />
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-base font-medium text-[#F2D98D]">{t.verified.trust}</p>
            <p className="mt-4 text-center text-xs text-[#C9D2DE]/70 max-w-2xl mx-auto">{t.verified.disclaimer}</p>
          </motion.div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">{t.whyMatters.title}</h2>
            <p className="mt-4 text-lg">{t.whyMatters.subtitle}</p>
          </motion.div>
          <motion.div {...fadeUp} className="mt-10 grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {t.whyMatters.concerns.map((c, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-[#D4AF37]/15 bg-[#0A1A30] px-5 py-4 text-sm">
                <span className="text-[#D4AF37] text-lg leading-none">✕</span>
                <span>{c}</span>
              </div>
            ))}
          </motion.div>
          <motion.p {...fadeUp} className="mt-10 text-center text-lg leading-relaxed max-w-3xl mx-auto">
            {t.whyMatters.resolution}
          </motion.p>
        </div>
      </section>

      {/* Why Vietnam */}
      <section className="py-20 bg-gradient-to-b from-[#0A1A30] to-[#0F2440]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">{t.whyVietnam.title}</h2>
            <p className="mt-4 text-lg leading-relaxed">{t.whyVietnam.subtitle}</p>
          </motion.div>
          <motion.div {...fadeUp} className="mt-12 max-w-5xl mx-auto">
            <img
              src="/images/vietnam/danang-skyline.jpg"
              alt={t.alts.danang}
              loading="lazy"
              className="rounded-2xl border border-[#D4AF37]/25 shadow-xl shadow-[#06121F]/60 w-full h-64 sm:h-96 object-cover"
            />
          </motion.div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.whyVietnam.items.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="rounded-xl border border-[#D4AF37]/15 bg-[#06121F]/60 p-7 hover:border-[#D4AF37]/40 transition-colors"
              >
                <item.icon className="w-9 h-9 text-[#D4AF37]" />
                <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Keep Ownership */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 {...fadeUp} className="font-display text-center text-3xl sm:text-4xl font-bold text-white">
            {t.ownership.title}
          </motion.h2>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {t.ownership.points.map((p, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="rounded-xl border border-[#D4AF37]/20 bg-[#0A1A30] p-8 text-center"
              >
                <p.icon className="w-10 h-10 text-[#D4AF37] mx-auto" />
                <h3 className="mt-4 text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section
        className="relative py-24 bg-[#0A1A30] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/vietnam/resort-pool-night.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#06121F]/80" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">{t.vision.title}</h2>
            <p className="mt-4 text-lg leading-relaxed">{t.vision.subtitle}</p>
          </motion.div>
          <motion.div {...fadeUp} className="mt-10 flex flex-wrap justify-center gap-3">
            {t.vision.pillars.map((p, i) => (
              <span
                key={i}
                className="rounded-full border border-[#D4AF37]/40 bg-[#0F2440] px-5 py-2.5 text-sm font-semibold text-[#F2D98D]"
              >
                {p}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="vn-consult" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">{t.form.title}</h2>
            <p className="mt-4 text-lg">{t.form.subtitle}</p>
          </motion.div>

          <motion.div {...fadeUp} className="mt-12 rounded-2xl border border-[#D4AF37]/25 bg-[#0F2440] p-8 sm:p-10">
            {status === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-[#D4AF37] mx-auto" />
                <h3 className="font-display mt-5 text-2xl font-bold text-white">{t.form.successTitle}</h3>
                <p className="mt-3 leading-relaxed">{t.form.successText}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label={t.form.fields.name} name="name" value={form.name} onChange={onChange} icon={Users} required />
                  <Field label={t.form.fields.phone} name="phone" type="tel" value={form.phone} onChange={onChange} icon={Phone} required />
                </div>
                <Field label={t.form.fields.email} name="email" type="email" value={form.email} onChange={onChange} icon={Mail} required />
                <Field label={t.form.fields.address} name="address" value={form.address} onChange={onChange} icon={Home} />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label={t.form.fields.bedrooms} name="bedrooms" type="number" value={form.bedrooms} onChange={onChange} icon={Building2} />
                  <Field label={t.form.fields.platform} name="platform" value={form.platform} onChange={onChange} icon={Globe} placeholder={t.form.fields.platformPlaceholder} />
                </div>
                <div>
                  <label htmlFor="vn-message" className="block text-sm font-semibold text-[#F2D98D] mb-1.5">{t.form.fields.message}</label>
                  <textarea
                    id="vn-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={onChange}
                    placeholder={t.form.fields.messagePlaceholder}
                    className="w-full rounded-lg border border-[#D4AF37]/25 bg-[#0A1A30] px-4 py-3 text-white placeholder-[#C9D2DE]/40 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>
                <div aria-live="polite">
                  {status === 'invalid' && <p className="text-sm text-[#F2D98D]">{t.form.required}</p>}
                  {status === 'error' && <p className="text-sm text-red-400">{t.form.error}</p>}
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 rounded-lg bg-[#D4AF37] text-[#06121F] font-bold text-lg hover:bg-[#F2D98D] transition-colors disabled:opacity-60"
                >
                  {status === 'sending' ? t.form.sending : t.form.submit}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, value, onChange, icon: Icon, type = 'text', required = false, placeholder = '' }) {
  const id = `vn-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#F2D98D] mb-1.5">
        {label} {required && <span className="text-[#D4AF37]">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60 pointer-events-none" />
        <input
          id={id}
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-[#D4AF37]/25 bg-[#0A1A30] pl-11 pr-4 py-3 text-white placeholder-[#C9D2DE]/40 focus:border-[#D4AF37] focus:outline-none transition-colors"
        />
      </div>
    </div>
  );
}
