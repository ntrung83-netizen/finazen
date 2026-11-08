export interface FinazenSettings {
  companyName: string;
  brandName: string;
  registrationNumber: string;
  taxCode: string;
  headquartersAddress: string;
  representative: string;
  hotline: string;
  contactEmail: string;
  zaloOaUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  lastRateUpdate: string;
  dataProtectionNotice: string;
  institutionalDisclaimer: string;
  footerColumns: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  partnerLogos: {
    name: string;
    code: string;
    type: string;
  }[];
}

export const defaultSettings: FinazenSettings = {
  brandName: 'Finazen',
  companyName: 'Công ty Cổ phần Nền tảng Tài chính Finazen (Finazen Vietnam JSC)',
  registrationNumber: 'Giấy CNĐKDN số 0110293847 do Sở KH&ĐT TP. Hà Nội cấp lần đầu ngày 12/03/2024',
  taxCode: '0110293847',
  headquartersAddress: 'Tầng 18, Toà nhà Keangnam Landmark 72, Đường Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, TP. Hà Nội',
  representative: 'Tổng Giám đốc / Đại diện pháp luật: Nguyễn Trung Kiên',
  hotline: '1800 6868',
  contactEmail: 'compliance@finazen.vn',
  zaloOaUrl: 'https://zalo.me/finazenvn',
  facebookUrl: 'https://facebook.com/finazen.vietnam',
  linkedinUrl: 'https://linkedin.com/company/finazen-vietnam',
  lastRateUpdate: '08/11/2026',
  dataProtectionNotice:
    'Cam kết bảo vệ dữ liệu cá nhân theo đúng quy định tại Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 và Nghị định số 356/2025/NĐ-CP. Mọi thông tin người dùng được mã hoá và chỉ chuyển tiếp khi có sự đồng thuận minh bạch.',
  institutionalDisclaimer:
    'Finazen KHÔNG PHẢI là ngân hàng, tổ chức tín dụng hay doanh nghiệp bảo hiểm. Finazen là nền tảng so sánh thông tin tài chính độc lập. Chúng tôi không huy động vốn, không phát hành khoản vay và không thu bất kỳ khoản phí nào từ người tiêu dùng. Mọi điều kiện phê duyệt, lãi suất thực tế và điều khoản giải ngân thuộc thẩm quyền quyết định độc quyền của các tổ chức tài chính đối tác được cấp phép.',
  footerColumns: [
    {
      title: 'Sản phẩm Vay',
      links: [
        { label: 'Vay mua nhà thế chấp', href: '/loans?cat=home' },
        { label: 'Vay mua xe ô tô', href: '/loans?cat=car' },
        { label: 'Vay tiêu dùng tín chấp', href: '/loans?cat=consumer' },
        { label: 'Vay hộ kinh doanh cá thể', href: '/loans?cat=business' },
      ],
    },
    {
      title: 'Tiết kiệm & Thẻ',
      links: [
        { label: 'Lãi suất tiết kiệm kỳ hạn', href: '/savings' },
        { label: 'Tiền gửi trực tuyến', href: '/savings?online=true' },
        { label: 'So sánh thẻ tín dụng hoàn tiền', href: '/loans?cat=cards' },
        { label: 'Thẻ miễn phí thường niên', href: '/loans?cat=cards_free' },
      ],
    },
    {
      title: 'Bảo hiểm & Công cụ',
      links: [
        { label: 'Bảo hiểm nhân thọ & đầu tư', href: '/insurance?type=life' },
        { label: 'Bảo hiểm sức khoẻ toàn diện', href: '/insurance?type=health' },
        { label: 'Bảo hiểm vật chất xe cơ giới', href: '/insurance?type=car' },
        { label: 'Công cụ tính lịch trả nợ', href: '/calculators' },
      ],
    },
    {
      title: 'Pháp lý & Quyền riêng tư',
      links: [
        { label: 'Tuân thủ Luật số 91/2025/QH15', href: '/account' },
        { label: 'Cổng thực thi quyền chủ thể dữ liệu', href: '/account' },
        { label: 'Chính sách bảo mật thông tin', href: '/account' },
        { label: 'Cẩm nang tài chính cá nhân', href: '/guides' },
      ],
    },
  ],
  partnerLogos: [
    { name: 'Vietcombank', code: 'VCB', type: 'NH TMCP Nhà Nước' },
    { name: 'BIDV', code: 'BIDV', type: 'NH TMCP Nhà Nước' },
    { name: 'Techcombank', code: 'TCB', type: 'NH TMCP' },
    { name: 'MB Bank', code: 'MBB', type: 'NH TMCP' },
    { name: 'VPBank', code: 'VPB', type: 'NH TMCP' },
    { name: 'ACB', code: 'ACB', type: 'NH TMCP' },
    { name: 'Prudential Vietnam', code: 'PRU', type: 'Doanh nghiệp Bảo hiểm' },
    { name: 'Bảo Việt Nhân Thọ', code: 'BVI', type: 'Doanh nghiệp Bảo hiểm' },
  ],
};

let activeSettings: FinazenSettings = { ...defaultSettings };

export function getFinazenSettings(): FinazenSettings {
  return activeSettings;
}

export function updateFinazenSettings(newSettings: Partial<FinazenSettings>): FinazenSettings {
  activeSettings = { ...activeSettings, ...newSettings };
  return activeSettings;
}
