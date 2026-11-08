'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Accordion, AccordionItemData } from '../ui/accordion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  HelpCircle,
  ShieldCheck,
  Star,
  Quote,
  CheckCircle2,
  Lock,
  ArrowRight,
  UserCheck,
  Building2,
  Clock,
} from 'lucide-react';

export interface HomeFaqAndTestimonialsProps {
  locale?: 'vi' | 'en';
  className?: string;
  onRequestAdvice?: () => void;
}

export function HomeFaqAndTestimonials({
  locale = 'vi',
  className,
  onRequestAdvice,
}: HomeFaqAndTestimonialsProps) {
  const isEn = locale === 'en';

  const faqItems: AccordionItemData[] = [
    {
      id: 'faq-pdp-consent',
      title: isEn
        ? 'How is my personal data protected under Vietnam Law No. 91/2025/QH15?'
        : 'Dữ liệu cá nhân của tôi được bảo vệ thế nào theo Luật Bảo vệ Dữ liệu Cá nhân số 91/2025/QH15?',
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-[#5B6576] leading-relaxed">
          <p>
            Finazen tuân thủ nghiêm ngặt <strong>Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15</strong> và <strong>Nghị định 356/2025/NĐ-CP</strong> của Chính phủ:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#1F2933]">
            <li>
              <strong>Đồng thuận chủ động, không tích sẵn:</strong> Mọi ô xác nhận chuyển tiếp thông tin mặc định <em>KHÔNG ĐƯỢC CHỌN TRƯỚC</em>. Quý khách hoàn toàn tự nguyện quyết định.
            </li>
            <li>
              <strong>Giới hạn mục đích rõ ràng:</strong> Thông tin của Quý khách chỉ được gửi duy nhất đến tổ chức tài chính/ngân hàng mà Quý khách đã chỉ định để nhận tư vấn gói tài chính tương ứng. Finazen cam kết không bán dữ liệu cho bên thứ ba.
            </li>
            <li>
              <strong>Nhật ký kiểm toán mã hoá (Audit Trail):</strong> Mỗi hành động cấp quyền hoặc rút lại đồng thuận đều được hệ thống ghi vết với timestamp, IP và mã hoá bất biến.
            </li>
            <li>
              <strong>Thời hạn lưu trữ có hạn:</strong> Dữ liệu yêu cầu tư vấn được lưu trữ tối đa 12 tháng kể từ ngày hoàn tất chuyển tiếp, hoặc theo quy định lưu trữ chứng từ tài chính hiện hành.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'faq-loan-workflow',
      title: isEn
        ? 'What is the step-by-step loan application & advisory process?'
        : 'Quy trình tư vấn và thẩm định khoản vay qua Finazen diễn ra như thế nào?',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-[#5B6576] leading-relaxed">
          <p>
            Quy trình được thiết kế chuẩn hoá, minh bạch và bảo mật theo 4 bước khép kín:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-[6px] bg-[#F7F8FA] border border-[#E3E7ED]">
              <span className="font-bold text-[#0F8B8D] block text-xs">Bước 1: So sánh độc lập</span>
              <p className="text-[11px] text-[#5B6576] mt-0.5">
                Tra cứu lãi suất, hạn mức và công cụ tính lịch trả nợ dư nợ giảm dần trên website Finazen hoàn toàn ẩn danh.
              </p>
            </div>
            <div className="p-3 rounded-[6px] bg-[#F7F8FA] border border-[#E3E7ED]">
              <span className="font-bold text-[#0F8B8D] block text-xs">Bước 2: Gửi yêu cầu & Đồng thuận PDP</span>
              <p className="text-[11px] text-[#5B6576] mt-0.5">
                Điền nhu cầu vay, chủ động tích chọn đồng thuận bảo vệ dữ liệu theo Luật 91/2025/QH15 và bấm gửi.
              </p>
            </div>
            <div className="p-3 rounded-[6px] bg-[#F7F8FA] border border-[#E3E7ED]">
              <span className="font-bold text-[#0F8B8D] block text-xs">Bước 3: Ngân hàng liên hệ trong 24h</span>
              <p className="text-[11px] text-[#5B6576] mt-0.5">
                Cán bộ tín dụng chính thức của ngân hàng đối tác liên hệ xác minh hồ sơ, nguồn thu nhập và pháp lý tài sản thế chấp.
              </p>
            </div>
            <div className="p-3 rounded-[6px] bg-[#F7F8FA] border border-[#E3E7ED]">
              <span className="font-bold text-[#0F8B8D] block text-xs">Bước 4: Phê duyệt & Giải ngân trực tiếp</span>
              <p className="text-[11px] text-[#5B6576] mt-0.5">
                Ký hợp đồng tín dụng và thực hiện giải ngân trực tiếp tại chi nhánh hoặc phòng giao dịch ngân hàng đối tác.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-free-service',
      title: isEn
        ? 'Does Finazen charge any consultation fees or commissions from borrowers?'
        : 'Finazen có thu bất kỳ khoản phí tư vấn hay hoa hồng nào từ tôi không?',
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-[#5B6576] leading-relaxed">
          <p>
            <strong>Tuyệt đối KHÔNG.</strong> Dịch vụ so sánh và kết nối tư vấn của Finazen dành cho khách hàng cá nhân là <strong>hoàn toàn miễn phí 100%</strong>.
          </p>
          <p>
            Finazen duy trì hoạt động thông qua phí dịch vụ công nghệ tiêu chuẩn từ các tổ chức tín dụng đối tác. Chúng tôi cam kết không thu bất kỳ khoản phụ phí hồ sơ, phí xem hợp đồng hay hoa hồng môi giới nào từ người dùng.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-non-bank-role',
      title: isEn
        ? 'Is Finazen a bank or direct lender? Who approves my loan application?'
        : 'Finazen có phải là ngân hàng không? Đơn vị nào trực tiếp phê duyệt và giải ngân khoản vay?',
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-[#5B6576] leading-relaxed">
          <p>
            <strong>Finazen KHÔNG PHẢI là ngân hàng</strong>, tổ chức tín dụng hay công ty bảo hiểm. Chúng tôi là nền tảng công nghệ so sánh thông tin tài chính độc lập.
          </p>
          <p>
            Mọi quyết định về điều kiện cấp tín dụng, thẩm định khả năng chi trả, định giá tài sản bảo đảm và quyết định phê duyệt hạn mức vay đều thuộc <strong>thẩm quyền độc quyền của ngân hàng thương mại được cấp phép</strong> (như Vietcombank, Techcombank, BIDV, MB Bank...).
          </p>
        </div>
      ),
    },
    {
      id: 'faq-withdraw-consent',
      title: isEn
        ? 'How can I exercise my data-subject rights (access, delete, or withdraw consent)?'
        : 'Làm thế nào để tôi rút lại sự đồng thuận hoặc yêu cầu xoá vĩnh viễn dữ liệu của mình?',
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-[#5B6576] leading-relaxed">
          <p>
            Theo Điều 9 Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15, Quý khách có 4 quyền cơ bản của chủ thể dữ liệu và có thể thực thi tự động bất kỳ lúc nào:
          </p>
          <p>
            Quý khách chỉ cần truy cập vào mục <strong>Tài khoản &rarr; Cổng Thực thi Quyền Dữ liệu (PDP Portal)</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#1F2933]">
            <li>Bấm <strong>"Xuất file dữ liệu (JSON)"</strong> để tải toàn bộ bản sao hồ sơ cá nhân và lịch sử chuyển tiếp.</li>
            <li>Bấm <strong>"Rút lại đồng thuận"</strong>: Hệ thống lập tức thu hồi quyền chuyển tiếp và đối tác sẽ ngưng xử lý hồ sơ mới.</li>
            <li>Bấm <strong>"Yêu cầu xoá dữ liệu"</strong>: Dữ liệu cá nhân sẽ được xóa vĩnh viễn theo thời hạn quy định.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'faq-rates-difference',
      title: isEn
        ? 'What is the difference between preferential and floating interest rates?'
        : 'Lãi suất ưu đãi và lãi suất thả nổi sau thời gian ưu đãi khác nhau như thế nào?',
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-[#5B6576] leading-relaxed">
          <p>
            Khi vay mua nhà hoặc vay sản xuất kinh doanh tại Việt Nam, các ngân hàng thường áp dụng 2 giai đoạn lãi suất:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#1F2933]">
            <li>
              <strong>Lãi suất ưu đãi:</strong> Mức lãi cố định hấp dẫn trong thời gian đầu (thường 6, 12, 18, 24 hoặc 36 tháng), hiện dao động từ <strong>5,8% - 7,5%/năm</strong>.
            </li>
            <li>
              <strong>Lãi suất sau ưu đãi (thả nổi):</strong> Sau thời gian ưu đãi, lãi suất sẽ điều chỉnh định kỳ (3 hoặc 6 tháng/lần) theo công thức: <code className="bg-[#EEF1F5] px-1.5 py-0.5 rounded font-mono font-bold text-[#0B2545]">Lãi suất cơ sở + Biên độ (3,0% - 4,0%/năm)</code>.
            </li>
          </ul>
          <p>
            Finazen luôn công khai minh bạch cả lãi suất ưu đãi và lãi suất sau ưu đãi ước tính để Quý khách chủ động lên kế hoạch tài chính dài hạn.
          </p>
        </div>
      ),
    },
  ];

  const testimonials = [
    {
      id: 'test-1',
      author: 'Anh Hoàng Minh Tuấn',
      title: 'Kỹ sư phần mềm cao cấp',
      location: 'Cầu Giấy, Hà Nội',
      avatarText: 'HT',
      bankName: 'Vietcombank',
      bankCode: 'VCB',
      productType: 'Vay mua nhà căn hộ chung cư',
      loanAmount: '1.800.000.000 ₫',
      interestRate: '5,8%/năm cố định',
      savedAmount: 'Tiết kiệm ~45.000.000 ₫ lãi năm đầu',
      quote:
        'Nhờ bảng so sánh lãi suất và công cụ tính lịch trả nợ dư nợ giảm dần trên Finazen, tôi thấy rõ sự khác biệt giữa gói ưu đãi 12 tháng của VCB và 24 tháng của Techcombank. Tôi chọn được gói vay tối ưu cho dòng tiền của gia đình và được nhân viên ngân hàng hỗ trợ giải ngân chỉ sau 3 ngày.',
      rating: 5,
    },
    {
      id: 'test-2',
      author: 'Chị Lê Thảo Nguyên',
      title: 'Chủ chuỗi cửa hàng thời trang',
      location: 'Quận 1, TP. Hồ Chí Minh',
      avatarText: 'TN',
      bankName: 'VPBank',
      bankCode: 'VPB',
      productType: 'Vay vốn hộ kinh doanh cá thể',
      loanAmount: '600.000.000 ₫',
      interestRate: '7,2%/năm',
      savedAmount: 'Giải ngân nhanh kịp mở thêm điểm bán',
      quote:
        'Điều tôi thích nhất ở Finazen là sự tôn trọng quyền riêng tư. Ô đồng thuận dữ liệu không bao giờ tự tích sẵn như các trang khác, chỉ đúng chi nhánh ngân hàng tôi chọn mới được liên hệ. Không hề bị các bên môi giới lạ gọi điện làm phiền.',
      rating: 5,
    },
    {
      id: 'test-3',
      author: 'Bác Phạm Quốc Dũng',
      title: 'Cán bộ hưu trí ngành bưu điện',
      location: 'Hải Châu, Đà Nẵng',
      avatarText: 'QD',
      bankName: 'BIDV',
      bankCode: 'BIDV',
      productType: 'Gửi tiết kiệm có kỳ hạn 12 tháng',
      loanAmount: '1.200.000.000 ₫',
      interestRate: '4,7%/năm trả lãi cuối kỳ',
      savedAmount: 'Lãi cao hơn 0,4%/năm so với chi nhánh cũ',
      quote:
        'Tôi lớn tuổi nên rất ngại việc phải đi từng phòng giao dịch hỏi biểu lãi suất tiết kiệm. Nhờ cháu chỉ cho trang Finazen, biểu lãi suất của hơn 20 ngân hàng được xếp rõ ràng, có cả số tiền lãi nhận được từng tháng. Rất minh bạch và dễ tra cứu.',
      rating: 5,
    },
    {
      id: 'test-4',
      author: 'Anh Vũ Đức Trọng',
      title: 'Giám đốc Điều hành Doanh nghiệp Vận tải',
      location: 'Thuận An, Bình Dương',
      avatarText: 'DT',
      bankName: 'Techcombank',
      bankCode: 'TCB',
      productType: 'Vay mua xe ô tô phục vụ công việc',
      loanAmount: '750.000.000 ₫',
      interestRate: '6,2%/năm',
      savedAmount: 'Ân hạn nợ gốc 12 tháng đầu',
      quote:
        'Tôi đánh giá rất cao tính chính xác của công cụ tính lãi Finazen. Từng khoản gốc, lãi tháng đầu và các tháng sau đều trùng khớp 100% với phụ lục hợp đồng tín dụng mà chuyên viên ngân hàng mang đến ký kết.',
      rating: 5,
    },
  ];

  return (
    <div className={cn('space-y-12', className)}>
      {/* SECTION 1: ACCORDION FAQ */}
      <section aria-labelledby="faq-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E3E7ED] pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F5F5] border border-[#0F8B8D]/30 text-[#085658] text-xs font-bold mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#0F8B8D]" />
              <span>{isEn ? 'Transparency & Legal Guidance' : 'Minh bạch Thông tin & Hướng dẫn Pháp lý'}</span>
            </div>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B2545]">
              {isEn
                ? 'Frequently Asked Questions about Advisory & Data Consent'
                : 'Câu Hỏi Thường Gặp về Quy Trình Tư Vấn & Bảo Vệ Dữ Liệu'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6576] mt-1 max-w-2xl">
              {isEn
                ? 'Clear answers regarding your rights under Vietnam Law No. 91/2025/QH15 and how our partner banking network handles your application.'
                : 'Giải đáp chi tiết về quyền của chủ thể dữ liệu theo Luật số 91/2025/QH15 và các bước tiếp nhận hồ sơ từ hệ thống ngân hàng đối tác.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#5B6576] shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Nghị định 356/2025/NĐ-CP</span>
          </div>
        </div>

        {/* The Accordion Component */}
        <Accordion items={faqItems} defaultOpenId="faq-pdp-consent" />
      </section>

      {/* SECTION 2: USER TESTIMONIALS */}
      <section aria-labelledby="testimonials-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E3E7ED] pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FDF9EA] border border-[#C9A227]/40 text-[#8F6C0E] text-xs font-bold mb-2">
              <Star className="w-3.5 h-3.5 text-[#C9A227] fill-[#C9A227]" />
              <span>{isEn ? 'Verified Customer Stories' : 'Khách Hàng Thực Tế Tại Việt Nam'}</span>
            </div>
            <h2 id="testimonials-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B2545]">
              {isEn
                ? 'What Our Users Say About Finazen Comparison'
                : 'Khách Hàng Nói Gì Về Trải Nghiệm So Sánh Tại Finazen'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6576] mt-1 max-w-2xl">
              {isEn
                ? 'Over 45,000 households and individuals across Vietnam have made well-informed financial decisions without harassment or unexpected fees.'
                : 'Hơn 45.000 cá nhân và hộ kinh doanh trên toàn quốc đã lựa chọn được phương án vay và gửi tiền tối ưu, minh bạch và an tâm về dữ liệu.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#0F8B8D] shrink-0">
            <UserCheck className="w-4 h-4" />
            <span>100% Khách hàng xác thực</span>
          </div>
        </div>

        {/* 4 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {testimonials.map((t) => (
            <Card
              key={t.id}
              className="card-elevation rounded-[8px] bg-white p-6 flex flex-col justify-between hover:border-[#D9DEE5] transition-all space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Author & Verified Bank Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs font-mono shadow-xs shrink-0">
                      {t.avatarText}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-[#0B2545] leading-none">{t.author}</h3>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-label="Khách hàng đã xác thực" />
                      </div>
                      <p className="text-[11px] text-[#5B6576] mt-0.5">
                        {t.title} • <span className="text-[#A3ACB9]">{t.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Partner Bank Tag */}
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#EEF1F5] text-[11px] font-mono font-bold text-[#0B2545] shrink-0">
                    <Building2 className="w-3 h-3 text-[#0F8B8D]" />
                    <span>{t.bankCode}</span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#C9A227]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C9A227] text-[#C9A227]" />
                  ))}
                  <span className="text-[11px] font-mono text-[#5B6576] font-semibold ml-1">5.0</span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-[#1F2933] leading-relaxed italic relative pl-4 border-l-2 border-[#0F8B8D]/40">
                  "{t.quote}"
                </p>
              </div>

              {/* Financial Metrics Strip */}
              <div className="pt-3 border-t border-[#E3E7ED] bg-[#F7F8FA] -mx-6 -mb-6 p-4 rounded-b-[8px] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5B6576] block">Gói tài chính:</span>
                  <span className="font-semibold text-[#0B2545] text-[11px] block">{t.productType}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#5B6576] block">Giá trị / Lãi suất:</span>
                  <span className="font-mono font-bold text-[#0F8B8D] text-[11px] block">
                    {t.loanAmount} ({t.interestRate})
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust summary strip */}
        <div className="p-4 rounded-[8px] bg-[#0B2545] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0F8B8D] flex items-center justify-center text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Bạn đang cần phương án tài chính tối ưu cho riêng mình?</h3>
              <p className="text-xs text-[#D9DEE5]">
                Đội ngũ chuyên viên được cấp phép của đối tác sẵn sàng hỗ trợ tư vấn miễn phí trong 24 giờ.
              </p>
            </div>
          </div>

          {onRequestAdvice && (
            <button
              type="button"
              onClick={onRequestAdvice}
              className="px-5 py-2.5 rounded-[8px] bg-[#0F8B8D] hover:bg-[#0B6E70] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
            >
              Nhận tư vấn ngay
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
