import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../components/ui/card';
import { PartnerBadge } from '../../../../components/finance/partner-badge';
import { DisclaimerBanner } from '../../../../components/finance/disclaimer-banner';
import { ShieldCheck, HeartPulse, Car, Home } from 'lucide-react';

export default async function InsurancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === 'en';

  const insuranceTypes = [
    {
      title: 'Bảo hiểm Nhân thọ & Đầu tư',
      titleEn: 'Life & Investment-Linked Insurance',
      icon: HeartPulse,
      partners: ['Prudential', 'Bảo Việt Nhân Thọ', 'Manulife'],
      desc: 'Bảo vệ tài chính gia đình trước rủi ro tử kỳ và tích lũy học vấn cho tương lai con cái.',
    },
    {
      title: 'Bảo hiểm Sức khỏe Cao cấp',
      titleEn: 'Comprehensive Health Insurance',
      icon: ShieldCheck,
      partners: ['Bảo Việt', 'PVI', 'Bảo Minh'],
      desc: 'Chi trả viện phí tại hệ thống bệnh viện công lập và tư nhân quốc tế trên toàn quốc.',
    },
    {
      title: 'Bảo hiểm Vật chất Ô tô',
      titleEn: 'Motor Vehicle Comprehensive Insurance',
      icon: Car,
      partners: ['PVI', 'MIC', 'Bảo Việt'],
      desc: 'Bồi thường thiệt hại thân vỏ, thủy kích ngập nước, cẩu kéo cứu hộ 24/7.',
    },
    {
      title: 'Bảo hiểm Cháy nổ & Nhà tư nhân',
      titleEn: 'Home & Property Insurance',
      icon: Home,
      partners: ['Bảo Việt', 'PTI', 'PVI'],
      desc: 'Bảo hiểm tài sản thế chấp bắt buộc khi vay vốn ngân hàng mua căn hộ chung cư hoặc nhà phố.',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {isEn ? 'Compare Insurance Policies in Vietnam' : 'So sánh Giải pháp Bảo hiểm tại Việt Nam'}
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          {isEn
            ? 'Independent comparison of life, health, motor, and property insurance from licensed insurers.'
            : 'Tổng hợp thông tin minh bạch về quyền lợi, mức phí và đơn vị bảo hiểm được cấp phép bởi Bộ Tài chính.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insuranceTypes.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} className="hover:border-slate-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{isEn ? item.titleEn : item.title}</CardTitle>
                    <p className="text-xs text-slate-500">Đối tác tiêu biểu: {item.partners.join(', ')}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0 text-xs text-slate-600">
                <p className="leading-relaxed">{item.desc}</p>
                <div className="pt-2">
                  <button className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer">
                    {isEn ? 'Request Licensed Advisor Consultation' : 'Nhận tư vấn từ chuyên viên được cấp phép'}
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <DisclaimerBanner lang={isEn ? 'en' : 'vi'} />
    </div>
  );
}
