import * as React from 'react';
import { cn } from '../../lib/utils';
import { colors, typography, grid } from '../../lib/tokens';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { SliderNumberInput } from '../ui/slider-number-input';
import { OTPInput } from '../ui/otp-input';
import { Stepper } from '../ui/stepper';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Accordion } from '../ui/accordion';
import { Dialog } from '../ui/dialog';
import { Drawer } from '../ui/drawer';
import { ToastProvider, useToast } from '../ui/toast';
import { Badge } from '../ui/badge';
import { Breadcrumbs } from '../ui/breadcrumbs';
import { Skeleton } from '../ui/skeleton';
import { EmptyState } from '../ui/empty-state';
import { DisclosureBox } from '../ui/disclosure-box';
import { RateCard } from '../finance/rate-card';
import { RateTable, RateTableItem } from '../finance/rate-table';
import { ComparisonTable, ComparisonProduct } from '../finance/comparison-table';
import { PaymentChart } from '../finance/payment-chart';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Layers,
  Sparkles,
  Info,
  Palette,
  Type,
  Maximize2,
  Bell,
  Eye,
} from 'lucide-react';

export function StyleguideView() {
  return (
    <ToastProvider>
      <StyleguideContent />
    </ToastProvider>
  );
}

function StyleguideContent() {
  const { addToast } = useToast();

  // Dialog & Drawer state
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerPosition, setDrawerPosition] = React.useState<'right' | 'bottom'>('right');

  // Slider & NumberInput state
  const [sliderVal, setSliderVal] = React.useState<number>(1_500_000_000);

  // OTP state
  const [otpVal, setOtpVal] = React.useState<string>('8391');

  // Sample RateTable items
  const sampleRateTableItems: RateTableItem[] = [
    {
      id: 'vcb-1',
      bankName: 'Vietcombank',
      bankCode: 'VCB',
      productName: 'Vay Mua Nhà An Gia',
      nominalRate: 5.8,
      promoTerm: '12 tháng',
      postRate: 9.5,
      maxLtv: '75%',
      maxTenure: '35 năm',
      monthlyEstimate: 13_500_000,
      isBest: true, // Gold left border
    },
    {
      id: 'bidv-1',
      bankName: 'BIDV',
      bankCode: 'BIDV',
      productName: 'Gói Vay Mua Nhà Ở Đô Thị',
      nominalRate: 5.9,
      promoTerm: '18 tháng',
      postRate: 9.8,
      maxLtv: '80%',
      maxTenure: '30 năm',
      monthlyEstimate: 13_800_000,
      isBest: false,
    },
    {
      id: 'tcb-1',
      bankName: 'Techcombank',
      bankCode: 'TCB',
      productName: 'Vay Bất Động Sản Linh Hoạt',
      nominalRate: 6.2,
      promoTerm: '24 tháng',
      postRate: 10.2,
      maxLtv: '80%',
      maxTenure: '35 năm',
      monthlyEstimate: 14_200_000,
      isBest: false,
    },
  ];

  // Sample Comparison items
  const sampleComparisonProducts: ComparisonProduct[] = [
    {
      id: 'vcb-comp',
      bankName: 'Vietcombank',
      bankCode: 'VCB',
      productName: 'Vay Mua Nhà An Gia',
      nominalRate: 5.8,
      promoPeriod: 'Cố định 12 tháng',
      floatingRate: 9.5,
      maxLtv: '75% HĐMB',
      maxTenure: '35 năm',
      prepaymentPenalty: '0.5% - 1% trong 3 năm đầu, sau 5 năm miễn phí',
      monthlyEstimate: 13_500_000,
      requiredIncome: 'Tối thiểu 12.000.000 ₫/tháng',
      processingTime: '2 - 3 ngày làm việc',
      isBest: true,
    },
    {
      id: 'tcb-comp',
      bankName: 'Techcombank',
      bankCode: 'TCB',
      productName: 'Vay Bất Động Sản Linh Hoạt',
      nominalRate: 6.2,
      promoPeriod: 'Cố định 24 tháng',
      floatingRate: 10.2,
      maxLtv: '80% HĐMB',
      maxTenure: '35 năm',
      prepaymentPenalty: '1% trong 2 năm đầu, từ năm 4 miễn phí',
      monthlyEstimate: 14_200_000,
      requiredIncome: 'Tối thiểu 15.000.000 ₫/tháng',
      processingTime: '1 - 2 ngày làm việc',
    },
    {
      id: 'mbb-comp',
      bankName: 'MB Bank',
      bankCode: 'MBB',
      productName: 'Gói Vay Dream Home',
      nominalRate: 6.5,
      promoPeriod: 'Cố định 12 tháng',
      floatingRate: 10.5,
      maxLtv: '85% HĐMB',
      maxTenure: '30 năm',
      prepaymentPenalty: '0.8% trong 3 năm đầu',
      monthlyEstimate: 14_600_000,
      requiredIncome: 'Tối thiểu 10.000.000 ₫/tháng',
      processingTime: '2 ngày làm việc',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#1F2933] pb-24">
      {/* Top Banner indicating Admin Only + Noindex */}
      <div className="bg-[#0B2545] text-white py-3 px-4 border-b border-[#13315C]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#0F8B8D] text-white font-mono text-[10px] font-bold">
              FINAZEN DS
            </span>
            <span className="font-bold">Hệ thống Thiết kế & Thư viện Thành phần (Design System Styleguide)</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#A3ACB9]">
            <span className="inline-flex items-center gap-1 text-amber-300 font-mono">
              <Lock className="w-3.5 h-3.5" />
              Admin Only • noindex, nofollow
            </span>
            <span className="text-white">WCAG 2.2 AA (≥ 4.5:1)</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Quản trị viên', href: '/admin' },
            { label: 'Hệ thống Thiết kế', current: true },
          ]}
        />

        {/* SECTION 1: COLOR TOKENS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E3E7ED] pb-3">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#0F8B8D]" />
              <h2 className="text-xl font-bold text-[#0B2545]">1. Bảng Mã Màu & Kiểm Định Tương Phản (Color Tokens)</h2>
            </div>
            <span className="text-xs text-[#5B6576] font-mono">Tương phản chuẩn WCAG 2.2 AA (≥ 4.5:1)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Primary Navy */}
            <div className="rounded-[8px] border border-[#E3E7ED] bg-white p-4 space-y-2 shadow-2xs">
              <div className="h-16 rounded-[6px] bg-[#0B2545] flex items-center justify-center text-white font-mono font-bold text-xs">
                #0B2545
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0B2545]">Primary Navy</h4>
                <p className="text-[11px] text-[#5B6576]">Nhận diện cốt lõi, tiêu đề, thanh điều hướng</p>
                <div className="mt-2 text-[10px] font-mono text-emerald-700 bg-[#EAF7EE] px-2 py-0.5 rounded flex items-center justify-between">
                  <span>Tương phản nền trắng:</span>
                  <strong className="font-bold">14.2:1 (ĐẠT)</strong>
                </div>
              </div>
            </div>

            {/* Navy 700 */}
            <div className="rounded-[8px] border border-[#E3E7ED] bg-white p-4 space-y-2 shadow-2xs">
              <div className="h-16 rounded-[6px] bg-[#13315C] flex items-center justify-center text-white font-mono font-bold text-xs">
                #13315C
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0B2545]">Navy 700</h4>
                <p className="text-[11px] text-[#5B6576]">Trạng thái hover, thanh phụ, thẻ nổi bật</p>
                <div className="mt-2 text-[10px] font-mono text-emerald-700 bg-[#EAF7EE] px-2 py-0.5 rounded flex items-center justify-between">
                  <span>Tương phản nền trắng:</span>
                  <strong className="font-bold">10.8:1 (ĐẠT)</strong>
                </div>
              </div>
            </div>

            {/* Action Teal */}
            <div className="rounded-[8px] border border-[#E3E7ED] bg-white p-4 space-y-2 shadow-2xs">
              <div className="h-16 rounded-[6px] bg-[#0F8B8D] flex items-center justify-center text-white font-mono font-bold text-xs">
                #0F8B8D
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0B2545]">Action Teal (CTAs Only)</h4>
                <p className="text-[11px] text-[#5B6576]">Dành riêng cho nút hành động chính (CTAs)</p>
                <div className="mt-2 text-[10px] font-mono text-emerald-700 bg-[#EAF7EE] px-2 py-0.5 rounded flex items-center justify-between">
                  <span>Hover (#0B6E70) tương phản:</span>
                  <strong className="font-bold">4.7:1 (ĐẠT)</strong>
                </div>
              </div>
            </div>

            {/* Accent Gold */}
            <div className="rounded-[8px] border border-[#E3E7ED] bg-white p-4 space-y-2 shadow-2xs">
              <div className="h-16 rounded-[6px] bg-[#C9A227] flex items-center justify-center text-[#0B2545] font-mono font-bold text-xs">
                #C9A227
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0B2545]">Accent Gold (Highlights Only)</h4>
                <p className="text-[11px] text-[#5B6576]">Viền vi chạm, huy hiệu lãi tốt (KHÔNG dùng cho body text)</p>
                <div className="mt-2 text-[10px] font-mono text-emerald-700 bg-[#EAF7EE] px-2 py-0.5 rounded flex items-center justify-between">
                  <span>Chữ (#8F6C0E) tương phản:</span>
                  <strong className="font-bold">4.6:1 (ĐẠT)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Neutrals & Semantic strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-2">
            {[
              { label: 'N-50', hex: '#F7F8FA', text: 'Nền trang' },
              { label: 'N-100', hex: '#EEF1F5', text: 'Nền thẻ' },
              { label: 'N-200', hex: '#D9DEE5', text: 'Phân cách' },
              { label: 'N-400', hex: '#5B6576', text: 'Chữ phụ' },
              { label: 'N-900', hex: '#1F2933', text: 'Chữ chính' },
              { label: 'Thành công', hex: '#1E7F4F', text: 'Success' },
              { label: 'Cảnh báo', hex: '#B7791F', text: 'Warning' },
              { label: 'Lỗi', hex: '#C53030', text: 'Error' },
            ].map((c, i) => (
              <div key={i} className="rounded-[8px] border border-[#E3E7ED] bg-white p-2.5 text-center space-y-1">
                <div style={{ backgroundColor: c.hex }} className="h-8 rounded-[4px] border border-[#E3E7ED]/50" />
                <span className="font-bold text-[11px] text-[#0B2545] block">{c.label}</span>
                <span className="font-mono text-[10px] text-[#5B6576] block">{c.hex}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: TYPOGRAPHY SCALE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E3E7ED] pb-3">
            <div className="flex items-center gap-2">
              <Type className="w-5 h-5 text-[#0F8B8D]" />
              <h2 className="text-xl font-bold text-[#0B2545]">2. Thang Đo Kiểu Chữ (Be Vietnam Pro Typography Scale)</h2>
            </div>
            <span className="text-xs text-[#5B6576] font-mono">Body line-height: 1.5 • Headings: 1.25</span>
          </div>

          <div className="rounded-[8px] border border-[#E3E7ED] bg-white divide-y divide-[#E3E7ED]">
            {typography.scale.map((item) => (
              <div key={item.name} className="p-4 flex flex-col sm:flex-row items-baseline justify-between gap-3">
                <div className="w-48 shrink-0">
                  <span className="font-mono text-xs font-bold text-[#0F8B8D]">Scale {item.name}px</span>
                  <span className="text-[11px] text-[#5B6576] block font-mono">
                    font-size: {item.size} • line-height: {item.lineHeight}
                  </span>
                  <span className="text-[10px] text-[#A3ACB9]">{item.usage}</span>
                </div>
                <div className="flex-1">
                  <div
                    style={{ fontSize: item.size, lineHeight: item.lineHeight }}
                    className="font-bold text-[#0B2545]"
                  >
                    Lãi suất vay mua nhà ưu đãi 5,8%/năm tại ngân hàng Việt Nam
                  </div>
                </div>
              </div>
            ))}

            {/* Tabular Numerals check */}
            <div className="p-4 bg-[#F7F8FA] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="font-bold text-xs text-[#0B2545] block">Tiện ích .num (Tabular Numerals)</span>
                <p className="text-xs text-[#5B6576]">Độ rộng các chữ số bằng nhau tuyệt đối, chống giật hàng khi tính toán</p>
              </div>
              <div className="font-mono text-xl font-bold text-[#0B2545] num bg-white px-4 py-2 rounded-[6px] border border-[#E3E7ED]">
                1.500.000.000 ₫ • 5,8%/năm
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: BUTTONS & INPUTS IN ALL STATES */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E3E7ED] pb-3">
            <h2 className="text-xl font-bold text-[#0B2545]">3. Nút & Trường Nhập Liệu trong Mọi Trạng Thái</h2>
            <span className="text-xs text-[#5B6576] font-mono">Normal, Hover, Loading, Error, Disabled</span>
          </div>

          <div className="rounded-[8px] border border-[#E3E7ED] bg-white p-6 space-y-6">
            {/* Buttons Matrix */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6576]">Biến thể Nút (Buttons):</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Action Teal</Button>
                <Button variant="secondary">Secondary Navy</Button>
                <Button variant="outline">Outline 1px Border</Button>
                <Button variant="ghost">Ghost State</Button>
                <Button variant="danger">Danger Red</Button>
                <Button variant="primary" isLoading>
                  Đang xử lý
                </Button>
                <Button variant="primary" disabled>
                  Vô hiệu hoá
                </Button>
              </div>
            </div>

            {/* Form Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3 border-t border-[#E3E7ED]">
              <Input
                label="Họ và tên khách hàng (Bình thường)"
                defaultValue="Nguyễn Văn An"
                helperText="Nhập đầy đủ họ tên như trên CCCD"
              />
              <Input
                label="Số điện thoại di động (Đang tải)"
                defaultValue="0912 345 678"
                isLoading
              />
              <Input
                label="Địa chỉ Email (Trạng thái Lỗi)"
                defaultValue="email-khong-hop-le"
                error="Địa chỉ email không đúng định dạng chuẩn"
              />
            </div>

            {/* Select Input & OTP Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 border-t border-[#E3E7ED]">
              <Select
                label="Tỉnh / Thành phố cư trú"
                options={[
                  { value: 'hn', label: 'Hà Nội' },
                  { value: 'hcm', label: 'TP. Hồ Chí Minh' },
                  { value: 'dn', label: 'Đà Nẵng' },
                ]}
                helperText="Lựa chọn khu vực để nhận hỗ trợ từ chi nhánh gần nhất"
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#5B6576] block">
                  Mã OTP Xác thực (6 ô số, tự động chuyển ô, hỗ trợ dán):
                </label>
                <OTPInput
                  value={otpVal}
                  onChange={setOtpVal}
                  onComplete={(code) => addToast({ type: 'success', title: 'Xác thực thành công', message: `Mã OTP ${code} hợp lệ` })}
                />
              </div>
            </div>

            {/* Slider + NumberInput Pair with VND formatting while typing */}
            <div className="pt-3 border-t border-[#E3E7ED] space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6576]">
                Cặp Slider + NumberInput Định Dạng Tiền Tệ Tức Thì:
              </h4>
              <SliderNumberInput
                label="Số tiền dự kiến vay thế chấp mua nhà"
                value={sliderVal}
                onChange={setSliderVal}
                min={100_000_000}
                max={10_000_000_000}
                step={50_000_000}
                quickAmounts={[500_000_000, 1_000_000_000, 1_500_000_000, 2_000_000_000, 3_000_000_000]}
                helperText="Kéo thanh trượt hoặc gõ trực tiếp số tiền — dấu chấm phân tách hàng nghìn sẽ tự động xuất hiện"
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: BADGES, DISCLOSURE, EMPTY, STEPPER, ACCORDION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E3E7ED] pb-3">
            <h2 className="text-xl font-bold text-[#0B2545]">4. Huy Hiệu, Hộp Thông Tin, Stepper & Accordion</h2>
            <span className="text-xs text-[#5B6576] font-mono">Radius chip full, Radius card 8px</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Badges Matrix */}
            <div className="rounded-[8px] border border-[#E3E7ED] bg-white p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6576]">Huy hiệu Đạt chuẩn (Badges):</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="bestRate" icon>Best rate / Lãi thấp nhất</Badge>
                <Badge variant="sponsored">Sponsored / Tài trợ</Badge>
                <Badge variant="updated" icon>Updated / Vừa cập nhật</Badge>
                <Badge variant="sample" icon>Sample / Bản thử</Badge>
                <Badge variant="success">Thành công</Badge>
                <Badge variant="warning">Cảnh báo</Badge>
                <Badge variant="error">Từ chối</Badge>
              </div>

              <div className="pt-2 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6576]">Hộp Công Bố Thông Tin (DisclosureBox):</h4>
                <DisclosureBox title="Lưu ý về biên độ lãi suất sau ưu đãi">
                  Biên độ lãi suất thả nổi thường bằng lãi suất cơ sở của ngân hàng cộng thêm 3,5% - 4,0%/năm. Khách hàng cần chuẩn bị kế hoạch tài chính dự phòng.
                </DisclosureBox>
              </div>
            </div>

            {/* Stepper & Toast triggers */}
            <div className="rounded-[8px] border border-[#E3E7ED] bg-white p-5 space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6576]">Tiến trình Hồ sơ (Stepper):</h4>
              <Stepper
                currentStepIndex={1}
                steps={[
                  { id: '1', title: 'Thông tin vay', status: 'completed' },
                  { id: '2', title: 'Chọn ngân hàng', status: 'active' },
                  { id: '3', title: 'Đồng thuận PDP', status: 'pending' },
                ]}
              />

              <div className="pt-2 space-y-2 border-t border-[#E3E7ED]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6576]">Thông báo nổi (Toast Notifications):</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToast({ type: 'success', title: 'Đã lưu yêu cầu', message: 'Hồ sơ đã được gửi sang Vietcombank' })}
                  >
                    Toast Thành công
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToast({ type: 'warning', title: 'Cảnh báo hạn mức', message: 'Tỷ lệ LTV vượt quá 80%' })}
                  >
                    Toast Cảnh báo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToast({ type: 'error', title: 'Lỗi xác thực', message: 'Chưa tích chọn đồng thuận PDP' })}
                  >
                    Toast Lỗi
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToast({ type: 'info', title: 'Thông báo biểu phí', message: 'Lãi suất áp dụng kỳ hạn 12 tháng' })}
                  >
                    Toast Thông tin
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion FAQ demo */}
          <div className="rounded-[8px] border border-[#E3E7ED] bg-white p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6576]">Thành phần Thu gọn (Accordion FAQ):</h4>
            <Accordion
              defaultOpenId="faq-1"
              items={[
                {
                  id: 'faq-1',
                  title: 'Finazen có thu phí dịch vụ từ khách hàng vay vốn không?',
                  content:
                    'Hoàn toàn KHÔNG. Finazen là nền tảng so sánh độc lập và dịch vụ tư vấn đến từ chuyên viên được đối tác cấp phép là hoàn toàn miễn phí đối với người dùng.',
                },
                {
                  id: 'faq-2',
                  title: 'Dữ liệu cá nhân của tôi được bảo mật như thế nào theo Luật 91/2025/QH15?',
                  content:
                    'Finazen áp dụng quy chế đồng thuận chủ động: hộp kiểm không bao giờ được chọn trước. Dữ liệu chỉ chuyển tiếp đến ngân hàng được bạn chỉ định kèm nhật ký mã hoá bất biến.',
                },
              ]}
            />
          </div>
        </section>

        {/* SECTION 5: MODAL DIALOG & DRAWER TRIGGERS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E3E7ED] pb-3">
            <h2 className="text-xl font-bold text-[#0B2545]">5. Cửa Sổ Modal (Dialog - Radius 12) & Ngăn Kéo (Drawer)</h2>
            <span className="text-xs text-[#5B6576] font-mono">Radius 12px • Esc key • Focus trap</span>
          </div>

          <div className="rounded-[8px] border border-[#E3E7ED] bg-white p-5 flex flex-wrap gap-4 items-center">
            <Button variant="secondary" onClick={() => setDialogOpen(true)}>
              Mở Cửa Sổ Dialog (Radius 12)
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setDrawerPosition('right');
                setDrawerOpen(true);
              }}
            >
              Mở Drawer (Trượt Phải)
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setDrawerPosition('bottom');
                setDrawerOpen(true);
              }}
            >
              Mở Drawer (Trượt Đáy - Mobile)
            </Button>
          </div>

          {/* Dialog Instance */}
          <Dialog
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Đăng Ký Tư Vấn Gói Vay An Gia"
            description="Thông tin sẽ được mã hoá và chuyển tiếp đến nhân viên tín dụng Vietcombank."
            footer={
              <>
                <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>
                  Huỷ bỏ
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setDialogOpen(false);
                    addToast({ type: 'success', title: 'Đã gửi thông tin', message: 'Tư vấn viên sẽ liên hệ trong 24h làm việc' });
                  }}
                >
                  Xác nhận gửi
                </Button>
              </>
            }
          >
            <div className="space-y-3 py-2">
              <Input label="Họ và tên" defaultValue="Trần Thị Bình" />
              <Input label="Số điện thoại" defaultValue="0988 123 456" />
              <div className="p-3 bg-[#F7F8FA] rounded-[8px] text-xs text-[#5B6576]">
                Thực hiện theo Luật số 91/2025/QH15: Yêu cầu này được lưu vết kiểm toán bất biến.
              </div>
            </div>
          </Dialog>

          {/* Drawer Instance */}
          <Drawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            position={drawerPosition}
            title="Bộ Lọc Nâng Cao Sản Phẩm Tài Chính"
          >
            <div className="space-y-4">
              <Select
                label="Mục đích vay vốn"
                options={[
                  { value: 'home', label: 'Vay mua nhà ở, chung cư' },
                  { value: 'car', label: 'Vay mua xe ô tô cá nhân' },
                  { value: 'consumer', label: 'Vay tiêu dùng tín chấp' },
                ]}
              />
              <SliderNumberInput
                label="Hạn mức mong muốn"
                value={sliderVal}
                onChange={setSliderVal}
                min={100_000_000}
                max={5_000_000_000}
              />
              <Button
                variant="primary"
                size="md"
                onClick={() => setDrawerOpen(false)}
                className="w-full text-xs font-bold"
              >
                Áp dụng bộ lọc
              </Button>
            </div>
          </Drawer>
        </section>

        {/* SECTION 6: RATE CARD ANATOMY & STATES */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E3E7ED] pb-3">
            <div>
              <h2 className="text-xl font-bold text-[#0B2545]">6. Cấu Trúc Thẻ Lãi Suất (RateCard Anatomy)</h2>
              <p className="text-xs text-[#5B6576]">Logo ngân hàng 40px trên nền trắng, số hero 32px tabular, 3 key facts, nút tư vấn & so sánh, chiều cao bằng nhau</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Standard RateCard */}
            <RateCard
              id="rc-1"
              bankName="Vietcombank"
              bankCode="VCB"
              productName="Gói Vay Mua Nhà An Gia"
              headlineRate={5.8}
              qualifier="Cố định 12 tháng đầu tiên"
              floatingRate={9.5}
              isBestRate={true}
              isComparing={false}
              onCompareToggle={(id, c) => addToast({ type: 'info', title: 'So sánh sản phẩm', message: `Đã ${c ? 'thêm' : 'xoá'} gói ${id}` })}
              keyFacts={[
                { label: 'Hạn mức vay', value: '75% HĐMB' },
                { label: 'Thời hạn vay', value: 'Đến 35 năm' },
                { label: 'Thu nhập yêu cầu', value: '≥ 12 tr/tháng' },
              ]}
              badges={[{ label: 'Phổ biến nhất' }]}
            />

            {/* Error State */}
            <RateCard
              id="rc-2"
              bankName="Techcombank"
              bankCode="TCB"
              productName="Vay Bất Động Sản Linh Hoạt"
              headlineRate={6.2}
              qualifier="Cố định 24 tháng"
              floatingRate={10.2}
              keyFacts={[
                { label: 'Hạn mức vay', value: '80% HĐMB' },
                { label: 'Thời hạn vay', value: 'Đến 35 năm' },
                { label: 'Ân hạn gốc', value: '24 tháng' },
              ]}
              isLoading={false}
              badges={[{ label: 'Ân hạn gốc', variant: 'updated' }]}
            />

            {/* Loading Skeleton State */}
            <RateCard
              id="rc-loading"
              bankName="MB Bank"
              bankCode="MBB"
              productName="Đang tải gói vay..."
              headlineRate={0}
              qualifier=""
              isLoading={true}
              keyFacts={[
                { label: '', value: '' },
                { label: '', value: '' },
                { label: '', value: '' },
              ]}
            />
          </div>
        </section>

        {/* SECTION 7: RATE TABLE (RESPONSIVE < 600px CARDS) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E3E7ED] pb-3">
            <div>
              <h2 className="text-xl font-bold text-[#0B2545]">7. Bảng Lãi Suất (RateTable)</h2>
              <p className="text-xs text-[#5B6576]">Có thể sắp xếp, header dính (sticky), dòng tối ưu có viền trái vàng (#C9A227), tự chuyển thành thẻ dưới 600px</p>
            </div>
          </div>

          <RateTable
            items={sampleRateTableItems}
            onRequestAdvice={(id) => addToast({ type: 'success', title: 'Tiếp nhận tư vấn', message: `Đã đăng ký gói ${id}` })}
          />
        </section>

        {/* SECTION 8: COMPARISON TABLE (UP TO 3 COLUMNS) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E3E7ED] pb-3">
            <div>
              <h2 className="text-xl font-bold text-[#0B2545]">8. Bảng So Sánh Chi Tiết (ComparisonTable)</h2>
              <p className="text-xs text-[#5B6576]">Tối đa 3 cột so sánh trực tiếp các điều kiện, phí phạt, và yêu cầu thu nhập</p>
            </div>
          </div>

          <ComparisonTable
            products={sampleComparisonProducts}
            onRemoveProduct={(id) => addToast({ type: 'warning', title: 'Đã bỏ chọn', message: `Đã bỏ sản phẩm ${id} khỏi bảng` })}
            onRequestAdvice={(id) => addToast({ type: 'success', title: 'Tư vấn gói so sánh', message: `Gửi yêu cầu gói ${id}` })}
          />
        </section>

        {/* SECTION 9: PAYMENT CHART */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E3E7ED] pb-3">
            <div>
              <h2 className="text-xl font-bold text-[#0B2545]">9. Biểu Đồ Cơ Cấu Trả Nợ (PaymentChart)</h2>
              <p className="text-xs text-[#5B6576]">Phân bổ trực quan tỷ lệ tiền nợ gốc và tiền lãi phải trả toàn kỳ</p>
            </div>
          </div>

          <PaymentChart
            principal={1_500_000_000}
            totalInterest={890_000_000}
            termMonths={240}
          />
        </section>
      </div>
    </div>
  );
}
