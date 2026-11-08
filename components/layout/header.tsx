import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Drawer } from '../ui/drawer';
import {
  Phone,
  Clock,
  Globe,
  Menu,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Building2,
  CreditCard,
  PiggyBank,
  HeartPulse,
  Calculator,
  BookOpen,
  User,
  X,
} from 'lucide-react';
import { getFinazenSettings } from '../../lib/settings';

export interface HeaderProps {
  locale?: 'vi' | 'en';
  onLocaleChange?: (locale: 'vi' | 'en') => void;
  onLoginClick?: () => void;
  onRequestAdviceClick?: () => void;
  onNavigate?: (path: string) => void;
  showMobileStickyCta?: boolean;
  className?: string;
}

export function Header({
  locale = 'vi',
  onLocaleChange,
  onLoginClick,
  onRequestAdviceClick,
  onNavigate,
  showMobileStickyCta = true,
  className,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = React.useState<string | null>(null);
  const settings = getFinazenSettings();
  const isEn = locale === 'en';

  const megaMenuItems = [
    {
      id: 'loans',
      label: isEn ? 'Loans' : 'Vay vốn',
      icon: <Building2 className="w-4 h-4 text-[#0F8B8D]" />,
      topLinks: [
        { label: isEn ? 'Home Purchase Loans' : 'Vay mua nhà thế chấp', desc: isEn ? 'From 5.8%/yr, tenure up to 35 years' : 'Lãi suất từ 5,8%/năm, vay đến 35 năm', href: '/loans?cat=home' },
        { label: isEn ? 'Car Loans' : 'Vay mua ô tô', desc: isEn ? 'Finance up to 85% vehicle value' : 'Hạn mức đến 85% giá trị xe mới', href: '/loans?cat=car' },
        { label: isEn ? 'Consumer Loans' : 'Vay tiêu dùng tín chấp', desc: isEn ? 'Unsecured credit up to 500M VND' : 'Không thế chấp tài sản đến 500 triệu', href: '/loans?cat=consumer' },
      ],
    },
    {
      id: 'savings',
      label: isEn ? 'Savings' : 'Tiết kiệm',
      icon: <PiggyBank className="w-4 h-4 text-[#0F8B8D]" />,
      topLinks: [
        { label: isEn ? 'Term Deposit Rates' : 'Lãi suất gửi tại quầy', desc: isEn ? 'Compare terms 1M to 36M' : 'So sánh kỳ hạn 1 tháng - 36 tháng', href: '/savings' },
        { label: isEn ? 'Online Savings' : 'Tiền gửi trực tuyến (+0.3%)', desc: isEn ? 'Preferential online yield bonus' : 'Cộng biên độ lãi suất khi mở online', href: '/savings?online=true' },
        { label: isEn ? 'Certificates of Deposit' : 'Chứng chỉ tiền gửi linh hoạt', desc: isEn ? 'High yield institutional liquidity' : 'Lãi suất hấp dẫn, dễ chuyển nhượng', href: '/savings?cd=true' },
      ],
    },
    {
      id: 'cards',
      label: isEn ? 'Credit Cards' : 'Thẻ tín dụng',
      icon: <CreditCard className="w-4 h-4 text-[#0F8B8D]" />,
      topLinks: [
        { label: isEn ? 'Cashback Credit Cards' : 'Thẻ hoàn tiền chi tiêu', desc: isEn ? 'Up to 15% supermarket cashback' : 'Hoàn tiền đến 15% siêu thị, ăn uống', href: '/loans?cat=cards_cashback' },
        { label: isEn ? 'Travel & Airline Miles' : 'Thẻ tích dặm bay & du lịch', desc: isEn ? 'Airport VIP lounge access' : 'Quyền lợi phòng chờ sân bay hạng thương gia', href: '/loans?cat=cards_miles' },
        { label: isEn ? 'Zero Annual Fee' : 'Thẻ miễn phí thường niên', desc: isEn ? 'Lifetime annual fee waiver' : 'Miễn phí thường niên trọn đời theo điều kiện', href: '/loans?cat=cards_free' },
      ],
    },
    {
      id: 'insurance',
      label: isEn ? 'Insurance' : 'Bảo hiểm',
      icon: <HeartPulse className="w-4 h-4 text-[#0F8B8D]" />,
      topLinks: [
        { label: isEn ? 'Life & Investment-Linked' : 'Bảo hiểm nhân thọ & đầu tư', desc: isEn ? 'Comprehensive family risk protection' : 'Bảo vệ gia đình kết hợp sinh lời tích lũy', href: '/insurance?cat=life' },
        { label: isEn ? 'Comprehensive Health' : 'Bảo hiểm sức khoẻ toàn diện', desc: isEn ? 'Direct billing at top hospitals' : 'Bảo lãnh viện phí bệnh viện quốc tế', href: '/insurance?cat=health' },
        { label: isEn ? 'Motor Vehicle Insurance' : 'Bảo hiểm vật chất xe ô tô', desc: isEn ? 'Flooding and towing coverage' : 'Bồi thường thuỷ kích ngập nước, cứu hộ 24/7', href: '/insurance?cat=car' },
      ],
    },
    {
      id: 'tools',
      label: isEn ? 'Calculators' : 'Công cụ',
      icon: <Calculator className="w-4 h-4 text-[#0F8B8D]" />,
      topLinks: [
        { label: isEn ? 'Loan Payment Schedule' : 'Lập lịch trả nợ vay mua nhà', desc: isEn ? 'Reducing balance method calculation' : 'Tính chi tiết gốc + lãi hàng tháng', href: '/calculators' },
        { label: isEn ? 'Borrowing Capacity' : 'Ước tính hạn mức vay tối đa', desc: isEn ? 'DTI based on household monthly income' : 'Dựa trên tổng thu nhập thực tế của gia đình', href: '/calculators?tab=capacity' },
        { label: isEn ? 'Savings Interest Calculator' : 'Bảng tính tiền gửi tích luỹ', desc: isEn ? 'Compound interest comparison' : 'Tính lãi kép cuối kỳ và định kỳ hàng tháng', href: '/calculators?tab=savings' },
      ],
    },
    {
      id: 'guides',
      label: isEn ? 'Guides' : 'Cẩm nang',
      icon: <BookOpen className="w-4 h-4 text-[#0F8B8D]" />,
      topLinks: [
        { label: isEn ? 'First-Time Home Buyer Guide' : 'Kinh nghiệm vay mua nhà lần đầu', desc: isEn ? 'Avoid post-promotional rate traps' : 'Tránh bẫy lãi suất thả nổi sau ưu đãi', href: '/guides/first-time-home' },
        { label: isEn ? 'Income Proof Requirements' : 'Hồ sơ chứng minh thu nhập vay vốn', desc: isEn ? 'Standard checklist for credit approval' : 'Bộ chứng từ chuẩn giúp duyệt hồ sơ nhanh', href: '/guides/income-proof' },
        { label: isEn ? 'Credit Score Check (CIC)' : 'Tra cứu điểm tín dụng CIC cá nhân', desc: isEn ? 'Prevent blacklists & bad debt' : 'Kiểm tra nợ xấu trước khi nộp hồ sơ vay', href: '/guides/cic-check' },
      ],
    },
  ];

  return (
    <>
      <header className={cn('sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E3E7ED]', className)}>
        {/* 1. Thin Utility Bar Above Header */}
        <div className="bg-[#0B2545] text-[#D9DEE5] text-[11px] py-1.5 px-4 border-b border-[#13315C]">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a
                href={`tel:${settings.hotline.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 font-semibold text-white hover:text-[#0F8B8D] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#0F8B8D]" />
                <span>Hotline: {settings.hotline}</span>
              </a>
              <span className="text-[#5B6576] hidden sm:inline">|</span>
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-[#A3ACB9]">
                <Clock className="w-3.5 h-3.5 text-[#0F8B8D]" />
                <span>
                  {isEn ? 'Rates updated on: ' : 'Lãi suất cập nhật: '}
                  <strong className="text-white num">{settings.lastRateUpdate}</strong>
                </span>
              </div>
            </div>

            {/* Language switch VI / EN */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#13315C] px-2 py-0.5 rounded-[4px] border border-[#13315C]">
                <Globe className="w-3 h-3 text-[#A3ACB9]" />
                <button
                  type="button"
                  onClick={() => onLocaleChange?.('vi')}
                  className={cn(
                    'text-[11px] font-bold cursor-pointer transition-colors',
                    locale === 'vi' ? 'text-[#0F8B8D]' : 'text-[#A3ACB9] hover:text-white'
                  )}
                >
                  VIE
                </button>
                <span className="text-[#5B6576]">/</span>
                <button
                  type="button"
                  onClick={() => onLocaleChange?.('en')}
                  className={cn(
                    'text-[11px] font-bold cursor-pointer transition-colors',
                    locale === 'en' ? 'text-[#0F8B8D]' : 'text-[#A3ACB9] hover:text-white'
                  )}
                >
                  ENG
                </button>
              </div>

              <div className="hidden md:flex items-center gap-1 text-[11px] text-[#A3ACB9]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F8B8D]" />
                <span>Luật số 91/2025/QH15</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => onNavigate?.('/')}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-[8px] bg-[#0B2545] flex items-center justify-center text-white font-extrabold text-lg shadow-xs group-hover:bg-[#13315C] transition-colors">
                F
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-[#0B2545] leading-none">
                  FINAZEN
                </span>
                <span className="text-[10px] font-bold text-[#0F8B8D] tracking-wider uppercase mt-0.5">
                  Vietnam Financial Intel
                </span>
              </div>
            </button>

            {/* Desktop Mega-Menu Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {megaMenuItems.map((item) => {
                const isOpen = activeMegaMenu === item.id;
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setActiveMegaMenu(item.id)}
                    onMouseLeave={() => setActiveMegaMenu(null)}
                  >
                    <button
                      type="button"
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 text-xs font-bold text-[#0B2545] rounded-[6px] hover:bg-[#EEF1F5] hover:text-[#0F8B8D] transition-colors cursor-pointer select-none',
                        isOpen && 'bg-[#EEF1F5] text-[#0F8B8D]'
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn('w-3.5 h-3.5 transition-transform duration-180', isOpen && 'rotate-180')}
                      />
                    </button>

                    {/* Mega-menu dropdown panel */}
                    {isOpen && (
                      <div className="absolute top-full left-0 w-80 rounded-[8px] border border-[#E3E7ED] bg-white p-3 shadow-xl z-50 animate-in fade-in-50 duration-150 space-y-1">
                        <div className="flex items-center gap-2 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#5B6576] border-b border-[#E3E7ED] pb-2 mb-1">
                          {item.icon}
                          <span>3 Gói nổi bật nhất</span>
                        </div>
                        {item.topLinks.map((link, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setActiveMegaMenu(null);
                              onNavigate?.(link.href);
                            }}
                            className="w-full text-left p-2 rounded-[6px] hover:bg-[#F7F8FA] transition-colors cursor-pointer group flex flex-col"
                          >
                            <span className="text-xs font-bold text-[#0B2545] group-hover:text-[#0F8B8D] transition-colors">
                              {link.label}
                            </span>
                            <span className="text-[11px] text-[#5B6576]">{link.desc}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-3">
            {/* Login button (secondary) */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onLoginClick}
              className="hidden sm:inline-flex text-xs font-bold text-[#0B2545]"
            >
              <User className="w-3.5 h-3.5 mr-1 text-[#5B6576]" />
              {isEn ? 'Sign In' : 'Đăng nhập'}
            </Button>

            {/* Primary Action CTA (Action Teal #0F8B8D) */}
            <Button
              variant="primary"
              size="md"
              onClick={onRequestAdviceClick}
              className="text-xs sm:text-sm font-bold shadow-sm"
            >
              <span>{isEn ? 'Free Advisory' : 'Nhận tư vấn miễn phí'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Mở thực đơn"
              className="lg:hidden w-10 h-10 rounded-[8px] border border-[#E3E7ED] flex items-center justify-center text-[#0B2545] hover:bg-[#EEF1F5] cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <Drawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Danh mục Tài chính Finazen"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-[8px] bg-[#EEF1F5] flex items-center justify-between text-xs font-bold">
            <span className="text-[#0B2545]">Ngôn ngữ:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onLocaleChange?.('vi')}
                className={cn('px-2 py-1 rounded text-xs', locale === 'vi' ? 'bg-white font-bold text-[#0F8B8D]' : 'text-[#5B6576]')}
              >
                Tiếng Việt
              </button>
              <button
                type="button"
                onClick={() => onLocaleChange?.('en')}
                className={cn('px-2 py-1 rounded text-xs', locale === 'en' ? 'bg-white font-bold text-[#0F8B8D]' : 'text-[#5B6576]')}
              >
                English
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {megaMenuItems.map((menu) => (
              <div key={menu.id} className="space-y-2 border-b border-[#E3E7ED] pb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                  {menu.icon}
                  <span>{menu.label}</span>
                </div>
                <div className="pl-6 space-y-2">
                  {menu.topLinks.map((link, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate?.(link.href);
                      }}
                      className="block text-left text-xs text-[#1F2933] hover:text-[#0F8B8D] font-medium"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                onLoginClick?.();
              }}
              className="w-full text-xs font-bold"
            >
              Đăng nhập tài khoản
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestAdviceClick?.();
              }}
              className="w-full text-xs font-bold"
            >
              Nhận tư vấn miễn phí
            </Button>
          </div>
        </div>
      </Drawer>

      {/* Sticky Bottom CTA for Mobile */}
      {showMobileStickyCta && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E3E7ED] p-3 shadow-lg flex items-center gap-3">
          <div className="flex-1">
            <span className="text-[10px] text-[#5B6576] block font-mono">So sánh độc lập</span>
            <span className="text-xs font-bold text-[#0B2545] block">Không thu phí người dùng</span>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={onRequestAdviceClick}
            className="text-xs font-bold px-4 shrink-0 shadow-md"
          >
            Nhận tư vấn miễn phí
          </Button>
        </div>
      )}
    </>
  );
}
