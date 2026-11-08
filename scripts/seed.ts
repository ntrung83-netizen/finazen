/**
 * Finazen Database Seed Script
 * Populates 12 Vietnamese institutional partners, 25 comparison offers,
 * 4 editorial guides, 2 financial authors, and public/private platform settings.
 * All sample documents are flagged with `isSample: true` for safe purging.
 */

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Helper to strip Vietnamese diacritics for search keywords
function stripDiacritics(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

function generateSearchKeywords(text: string): string[] {
  const stripped = stripDiacritics(text);
  const words = stripped.split(/[^a-z0-9]+/).filter(w => w.length > 1);
  return Array.from(new Set(words));
}

// Read configuration
const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

let app: App;
if (!getApps().length) {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (clientEmail && privateKey) {
    app = initializeApp({
      credential: cert({
        projectId: config.projectId,
        clientEmail,
        privateKey,
      }),
      projectId: config.projectId,
    });
  } else {
    // Cloud Run ADC
    app = initializeApp({
      projectId: config.projectId,
    });
  }
} else {
  app = getApps()[0];
}

const db = config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, config.firestoreDatabaseId)
  : getFirestore(app);

const now = Timestamp.now();

// 1. Partners (12 Real Vietnamese Financial Institutions)
const partners = [
  {
    id: 'vietcombank',
    slug: 'vietcombank',
    name: 'Ngân hàng TMCP Ngoại thương Việt Nam',
    shortName: 'Vietcombank',
    type: 'bank',
    logoUrl: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=128&auto=format&fit=crop&q=80',
    website: 'https://www.vietcombank.com.vn',
    brandColor: '#005A36',
    descriptionVi: 'Ngân hàng thương mại hàng đầu Việt Nam với uy tín vượt trội, mạng lưới chi nhánh rộng khắp và biểu lãi suất cạnh tranh.',
    descriptionEn: 'Vietnam’s leading state-owned commercial bank, renowned for international trade finance, mortgage lending, and strong security.',
    isActive: true,
    isSample: true,
  },
  {
    id: 'bidv',
    slug: 'bidv',
    name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
    shortName: 'BIDV',
    type: 'bank',
    logoUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=128&auto=format&fit=crop&q=80',
    website: 'https://www.bidv.com.vn',
    brandColor: '#005B94',
    descriptionVi: 'Ngân hàng có quy mô tổng tài sản lớn nhất hệ thống ngân hàng Việt Nam, giải ngân nhanh và đa dạng gói vay.',
    descriptionEn: 'The largest commercial bank in Vietnam by assets, offering extensive retail loan packages and digital savings solutions.',
    isActive: true,
    isSample: true,
  },
  {
    id: 'vietinbank',
    slug: 'vietinbank',
    name: 'Ngân hàng TMCP Công thương Việt Nam',
    shortName: 'VietinBank',
    type: 'bank',
    logoUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=128&auto=format&fit=crop&q=80',
    website: 'https://www.vietinbank.vn',
    brandColor: '#005B9C',
    descriptionVi: 'Ngân hàng thương mại chủ lực quốc gia, chuyên cung cấp các giải pháp tài chính toàn diện cho cá nhân và doanh nghiệp.',
    descriptionEn: 'Major Vietnamese state-owned bank providing comprehensive personal finance, consumer credit, and business credit lines.',
    isActive: true,
    isSample: true,
  },
  {
    id: 'techcombank',
    slug: 'techcombank',
    name: 'Ngân hàng TMCP Kỹ thương Việt Nam',
    shortName: 'Techcombank',
    type: 'bank',
    logoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=128&auto=format&fit=crop&q=80',
    website: 'https://www.techcombank.com',
    brandColor: '#E60000',
    descriptionVi: 'Ngân hàng tư nhân tiên phong về số hóa tại Việt Nam, xử lý hồ sơ phê duyệt nhanh và dịch vụ khách hàng cao cấp.',
    descriptionEn: 'Pioneering private Vietnamese bank known for rapid automated loan approvals, digital banking, and premium credit cards.',
    isActive: true,
    isSample: true,
  },
  {
    id: 'vpbank',
    slug: 'vpbank',
    name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
    shortName: 'VPBank',
    type: 'bank',
    logoUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=128&auto=format&fit=crop&q=80',
    website: 'https://www.vpbank.com.vn',
    brandColor: '#00B14F',
    descriptionVi: 'Ngân hàng bán lẻ dẫn đầu thị trường cho vay tiêu dùng, thẻ tín dụng và hỗ trợ vốn linh hoạt cho hộ kinh doanh cá thể.',
    descriptionEn: 'Top retail bank specializing in consumer unsecured lending, high-cashback credit cards, and SME/household business loans.',
    isActive: true,
    isSample: true,
  },
  {
    id: 'mbbank',
    slug: 'mbbank',
    name: 'Ngân hàng TMCP Quân đội',
    shortName: 'MB Bank',
    type: 'bank',
    logoUrl: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=128&auto=format&fit=crop&q=80',
    website: 'https://www.mbbank.com.vn',
    brandColor: '#002D62',
    descriptionVi: 'Ngân hàng trực thuộc Bộ Quốc phòng với nền tảng công nghệ mạnh mẽ, giải ngân nhanh và ưu đãi lãi suất ổn định.',
    descriptionEn: 'Military Commercial Joint Stock Bank with military precision, competitive fixed rate loans, and cutting-edge mobile banking.',
    isActive: true,
    isSample: true,
  },
  {
    id: 'acb',
    slug: 'acb',
    name: 'Ngân hàng TMCP Á Châu',
    shortName: 'ACB',
    type: 'bank',
    logoUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=128&auto=format&fit=crop&q=80',
    website: 'https://www.acb.com.vn',
    brandColor: '#004F9E',
    descriptionVi: 'Ngân hàng bán lẻ chuẩn mực cao, chính sách minh bạch, thẩm định tài sản nhanh và biểu phí minh thị.',
    descriptionEn: 'Exemplary private bank in Vietnam renowned for prudent risk management, transparent lending terms, and premium mortgages.',
    isActive: true,
    isSample: true,
  },
  {
    id: 'tpbank',
    slug: 'tpbank',
    name: 'Ngân hàng TMCP Tiên Phong',
    shortName: 'TPBank',
    type: 'bank',
    logoUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=128&auto=format&fit=crop&q=80',
    website: 'https://tpb.vn',
    brandColor: '#5B2C82',
    descriptionVi: 'Ngân hàng số năng động với hệ sinh thái LiveBank 24/7, chuyên các gói vay mua ô tô và thẻ tín dụng phong cách sống.',
    descriptionEn: 'Dynamic digital bank leading in auto loans, 24/7 automated LiveBanks, and tailored youth credit cards.',
    isActive: true,
    isSample: true,
  },
  {
    id: 'manulife',
    slug: 'manulife-vietnam',
    name: 'Công ty TNHH Manulife (Việt Nam)',
    shortName: 'Manulife',
    type: 'insurer',
    logoUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=128&auto=format&fit=crop&q=80',
    website: 'https://www.manulife.com.vn',
    brandColor: '#00A758',
    descriptionVi: 'Doanh nghiệp bảo hiểm nhân thọ có vốn nước ngoài đầu tiên tại Việt Nam, mạng lưới chi trả quyền lợi bảo hiểm rộng khắp.',
    descriptionEn: 'Leading international life insurer in Vietnam with comprehensive investment-linked and critical illness policies.',
    isActive: true,
    isSample: true,
  },
  {
    id: 'prudential',
    slug: 'prudential-vietnam',
    name: 'Công ty TNHH Bảo hiểm Nhân thọ Prudential Việt Nam',
    shortName: 'Prudential',
    type: 'insurer',
    logoUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=128&auto=format&fit=crop&q=80',
    website: 'https://www.prudential.com.vn',
    brandColor: '#ED1B2D',
    descriptionVi: 'Tập đoàn bảo hiểm nhân thọ hàng đầu với hơn 25 năm phục vụ hàng triệu gia đình Việt Nam.',
    descriptionEn: 'Pioneer life insurer in Vietnam offering heritage protection, child education funds, and health care cards.',
    isActive: true,
    isSample: true,
  },
  {
    id: 'baoviet',
    slug: 'bao-viet',
    name: 'Tập đoàn Bảo Việt',
    shortName: 'Bảo Việt',
    type: 'insurer',
    logoUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=128&auto=format&fit=crop&q=80',
    website: 'https://baoviet.com.vn',
    brandColor: '#0055A5',
    descriptionVi: 'Tập đoàn tài chính - bảo hiểm quốc gia số 1 Việt Nam, dẫn đầu cả mảng nhân thọ và phi nhân thọ với mạng lưới 63 tỉnh thành.',
    descriptionEn: 'Vietnam’s premier national financial-insurance group covering health, property, and life protection nationwide.',
    isActive: true,
    isSample: true,
  },
  {
    id: 'pvi',
    slug: 'pvi-insurance',
    name: 'Tổng công ty Bảo hiểm PVI',
    shortName: 'PVI Insurance',
    type: 'insurer',
    logoUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=128&auto=format&fit=crop&q=80',
    website: 'https://pvi.com.vn',
    brandColor: '#005596',
    descriptionVi: 'Doanh nghiệp bảo hiểm phi nhân thọ số 1 Việt Nam đạt xếp hạng năng lực tài chính A- (Xuất sắc) từ A.M. Best.',
    descriptionEn: 'Top non-life insurer in Vietnam with A- (Excellent) financial strength rating from A.M. Best.',
    isActive: true,
    isSample: true,
  },
];

// 2. 25 Realistic Financial Comparison Offers
const offers = [
  // --- VAY MUA NHÀ (HOME LOANS) ---
  {
    id: 'vcb-vay-mua-nha-an-tam',
    slug: 'vcb-vay-mua-nha-an-tam',
    partnerId: 'vietcombank',
    category: 'loan',
    subcategory: 'home_loan',
    titleVi: 'Gói vay mua nhà An Tâm Vietcombank - Cố định 18 tháng',
    titleEn: 'Vietcombank Peaceful Home Loan - 18-Month Fixed Rate',
    summaryVi: 'Lãi suất ưu đãi chỉ từ 5,8%/năm cố định trong 18 tháng đầu, thời hạn vay lên tới 35 năm, hỗ trợ đến 70% giá trị hợp đồng mua bán.',
    summaryEn: 'Preferential interest rate from 5.8%/year fixed for 18 months, tenor up to 35 years, financing up to 70% of property value.',
    rate: 5.8,
    promoRate: 5.8,
    promoMonths: 18,
    floatingMargin: 3.2,
    estFloatingRate: 9.6,
    fee: 0,
    minAmount: 200000000,
    maxAmount: 20000000000,
    maxTermMonths: 420,
    maxLtvPct: 70,
    prepaymentFeePct: 1.0,
    prepaymentFeeYears: 5,
    approvalDays: 3,
    minIncome: 12000000,
    collateralRequired: true,
    badges: ['Lãi suất tốt nhất', 'Cố định 18 tháng', 'Nhà nước bảo chứng'],
    isSponsored: true,
    rankScore: 98,
  },
  {
    id: 'bidv-vay-mua-nha-to-am',
    slug: 'bidv-vay-mua-nha-to-am',
    partnerId: 'bidv',
    category: 'loan',
    subcategory: 'home_loan',
    titleVi: 'Gói Vay Mua Nhà Trọn Vẹn Tổ Ấm - BIDV',
    titleEn: 'BIDV Full Nest Home Mortgage Package',
    summaryVi: 'Lãi suất cố định 6,0%/năm trong 24 tháng đầu, ân hạn nợ gốc tới 24 tháng, hỗ trợ tài trợ dự án trên toàn quốc.',
    summaryEn: 'Fixed 6.0%/year for first 24 months, grace period up to 24 months, partner project financing across Vietnam.',
    rate: 6.0,
    promoRate: 6.0,
    promoMonths: 24,
    floatingMargin: 3.0,
    estFloatingRate: 9.5,
    fee: 0,
    minAmount: 300000000,
    maxAmount: 25000000000,
    maxTermMonths: 360,
    maxLtvPct: 80,
    prepaymentFeePct: 1.5,
    prepaymentFeeYears: 3,
    approvalDays: 2,
    minIncome: 15000000,
    collateralRequired: true,
    badges: ['Cố định 24 tháng', 'Ân hạn gốc 2 năm'],
    isSponsored: false,
    rankScore: 95,
  },
  {
    id: 'tcb-vay-mua-nha-du-an',
    slug: 'tcb-vay-mua-nha-du-an',
    partnerId: 'techcombank',
    category: 'loan',
    subcategory: 'home_loan',
    titleVi: 'Vay mua nhà dự án & nhà phố Techcombank',
    titleEn: 'Techcombank Project & Townhouse Mortgage',
    summaryVi: 'Phê duyệt nguyên tắc sơ bộ tự động trong 4 giờ, tỷ lệ cho vay lên tới 85% giá trị định giá, thủ tục 100% qua nền tảng số.',
    summaryEn: 'Preliminary in-principle automated approval in 4 hours, financing up to 85% LTV, digital mortgage pipeline.',
    rate: 6.5,
    promoRate: 6.5,
    promoMonths: 12,
    floatingMargin: 3.5,
    estFloatingRate: 10.2,
    fee: 1000000,
    minAmount: 500000000,
    maxAmount: 30000000000,
    maxTermMonths: 420,
    maxLtvPct: 85,
    prepaymentFeePct: 1.0,
    prepaymentFeeYears: 4,
    approvalDays: 1,
    minIncome: 15000000,
    collateralRequired: true,
    badges: ['Duyệt số 4h', 'LTV 85%'],
    isSponsored: true,
    rankScore: 94,
  },
  {
    id: 'acb-vay-ngoi-nha-dau-tien',
    slug: 'acb-vay-ngoi-nha-dau-tien',
    partnerId: 'acb',
    category: 'loan',
    subcategory: 'home_loan',
    titleVi: 'Gói Vay Ngôi Nhà Đầu Tiên - Ngân hàng ACB',
    titleEn: 'ACB First Home Mortgage Plan',
    summaryVi: 'Biên độ thả nổi minh bạch chỉ 2,8% sau ưu đãi. Miễn phí phạt trả nợ trước hạn từ năm thứ 4 trở đi.',
    summaryEn: 'Transparent floating margin of only 2.8% post-promo. Zero prepayment penalties starting from year 4.',
    rate: 6.3,
    promoRate: 6.3,
    promoMonths: 12,
    floatingMargin: 2.8,
    estFloatingRate: 9.3,
    fee: 0,
    minAmount: 200000000,
    maxAmount: 15000000000,
    maxTermMonths: 300,
    maxLtvPct: 80,
    prepaymentFeePct: 0.75,
    prepaymentFeeYears: 3,
    approvalDays: 2,
    minIncome: 10000000,
    collateralRequired: true,
    badges: ['Biên độ thấp 2,8%', 'Miễn phạt năm thứ 4'],
    isSponsored: false,
    rankScore: 92,
  },
  {
    id: 'mbb-vay-mua-nha-quan-doi',
    slug: 'mbb-vay-mua-nha-quan-doi',
    partnerId: 'mbbank',
    category: 'loan',
    subcategory: 'home_loan',
    titleVi: 'Vay mua nhà đất, căn hộ chung cư MB Bank',
    titleEn: 'MB Bank Apartment & Land Mortgage',
    summaryVi: 'Lãi suất 6,2%/năm, chứng minh thu nhập linh hoạt từ nguồn lương, cho thuê tài sản hoặc doanh thu kinh doanh gia đình.',
    summaryEn: 'Competitive 6.2%/yr, flexible income assessment from salary, rental income, or family business revenue.',
    rate: 6.2,
    promoRate: 6.2,
    promoMonths: 12,
    floatingMargin: 3.3,
    estFloatingRate: 9.8,
    fee: 0,
    minAmount: 100000000,
    maxAmount: 20000000000,
    maxTermMonths: 360,
    maxLtvPct: 75,
    prepaymentFeePct: 1.0,
    prepaymentFeeYears: 4,
    approvalDays: 2,
    minIncome: 12000000,
    collateralRequired: true,
    badges: ['Thẩm định linh hoạt', 'Hỗ trợ chung cư sổ đỏ'],
    isSponsored: false,
    rankScore: 90,
  },

  // --- VAY MUA Ô TÔ (CAR LOANS) ---
  {
    id: 'tpb-vay-mua-o-to-sieu-toc',
    slug: 'tpb-vay-mua-o-to-sieu-toc',
    partnerId: 'tpbank',
    category: 'loan',
    subcategory: 'car_loan',
    titleVi: 'Vay mua ô tô siêu tốc TPBank - Giải ngân trong 8 giờ',
    titleEn: 'TPBank Express Auto Loan - Disbursed within 8 Hours',
    summaryVi: 'Tài trợ tới 85% giá trị xe mới và xe đã qua sử dụng, thời gian vay tối đa 8 năm, hồ sơ phê duyệt nhanh tại showroom.',
    summaryEn: 'Finances up to 85% of new & certified pre-owned cars, tenor up to 8 years, instant on-site dealership approval.',
    rate: 6.8,
    promoRate: 6.8,
    promoMonths: 12,
    floatingMargin: 3.5,
    estFloatingRate: 10.5,
    fee: 0,
    minAmount: 100000000,
    maxAmount: 5000000000,
    maxTermMonths: 96,
    maxLtvPct: 85,
    prepaymentFeePct: 1.5,
    prepaymentFeeYears: 3,
    approvalDays: 1,
    minIncome: 10000000,
    collateralRequired: true,
    badges: ['Giải ngân 8h', 'Tài trợ 85% xe mới'],
    isSponsored: true,
    rankScore: 96,
  },
  {
    id: 'vcb-vay-mua-o-to-chuyen-nghiep',
    slug: 'vcb-vay-mua-o-to-chuyen-nghiep',
    partnerId: 'vietcombank',
    category: 'loan',
    subcategory: 'car_loan',
    titleVi: 'Gói vay ô tô cá nhân & gia đình Vietcombank',
    titleEn: 'Vietcombank Personal & Family Car Loan',
    summaryVi: 'Lãi suất cố định 6,2%/năm trong 12 tháng, thế chấp chính chiếc xe mua, thủ tục bảo hiểm và đăng ký xe trọn gói.',
    summaryEn: 'Fixed 6.2%/yr for 12 months, secured by the purchased vehicle itself, turnkey registration and insurance service.',
    rate: 6.2,
    promoRate: 6.2,
    promoMonths: 12,
    floatingMargin: 3.2,
    estFloatingRate: 9.8,
    fee: 0,
    minAmount: 150000000,
    maxAmount: 3000000000,
    maxTermMonths: 84,
    maxLtvPct: 70,
    prepaymentFeePct: 1.0,
    prepaymentFeeYears: 3,
    approvalDays: 2,
    minIncome: 12000000,
    collateralRequired: true,
    badges: ['Lãi suất ổn định', 'Thủ tục chính ngạch'],
    isSponsored: false,
    rankScore: 91,
  },
  {
    id: 'vpb-vay-mua-o-to-linh-hoat',
    slug: 'vpb-vay-mua-o-to-linh-hoat',
    partnerId: 'vpbank',
    category: 'loan',
    subcategory: 'car_loan',
    titleVi: 'Vay mua ô tô kinh doanh & tiêu dùng VPBank',
    titleEn: 'VPBank Commercial & Personal Vehicle Finance',
    summaryVi: 'Hỗ trợ cả xe chạy dịch vụ công nghệ (Grab, Be), chứng minh thu nhập dễ dàng, nhận xe ngay trong ngày.',
    summaryEn: 'Supports ride-hailing fleet drivers (Grab, Be), flexible proof of earnings, same-day vehicle release.',
    rate: 7.2,
    promoRate: 7.2,
    promoMonths: 6,
    floatingMargin: 3.8,
    estFloatingRate: 11.2,
    fee: 500000,
    minAmount: 100000000,
    maxAmount: 2000000000,
    maxTermMonths: 72,
    maxLtvPct: 80,
    prepaymentFeePct: 2.0,
    prepaymentFeeYears: 3,
    approvalDays: 1,
    minIncome: 8000000,
    collateralRequired: true,
    badges: ['Hỗ trợ xe dịch vụ', 'Nhận xe trong ngày'],
    isSponsored: false,
    rankScore: 88,
  },

  // --- VAY TIÊU DÙNG TÍN CHẤP (CONSUMER / PERSONAL LOANS) ---
  {
    id: 'vpb-vay-tin-chap-luong',
    slug: 'vpb-vay-tin-chap-luong',
    partnerId: 'vpbank',
    category: 'loan',
    subcategory: 'consumer_loan',
    titleVi: 'Vay tín chấp theo lương VPBank - Không tài sản bảo đảm',
    titleEn: 'VPBank Unsecured Personal Loan via Salary',
    summaryVi: 'Hạn mức cho vay lên tới 500 triệu đồng (gấp 10 lần lương), không cần thế chấp tài sản, giải ngân thẳng vào tài khoản số trong 24h.',
    summaryEn: 'Credit limit up to 500M VND (10x salary), zero collateral, instant direct account disbursement within 24h.',
    rate: 11.5,
    promoRate: 11.5,
    promoMonths: 12,
    floatingMargin: 0,
    estFloatingRate: 11.5,
    fee: 0,
    minAmount: 20000000,
    maxAmount: 500000000,
    maxTermMonths: 60,
    maxLtvPct: 0,
    prepaymentFeePct: 2.0,
    prepaymentFeeYears: 2,
    approvalDays: 1,
    minIncome: 5000000,
    collateralRequired: false,
    badges: ['Không thế chấp', 'Giải ngân 24h', 'Hạn mức 500 tr'],
    isSponsored: true,
    rankScore: 95,
  },
  {
    id: 'mbb-vay-nhanh-thau-chi',
    slug: 'mbb-vay-nhanh-thau-chi',
    partnerId: 'mbbank',
    category: 'loan',
    subcategory: 'consumer_loan',
    titleVi: 'Vay thấu chi tín chấp MB Bank Online',
    titleEn: 'MB Bank Instant Digital Overdraft Line',
    summaryVi: 'Chỉ tính lãi trên số tiền và số ngày thực tế sử dụng. Đăng ký và kích hoạt 100% online trên ứng dụng MB.',
    summaryEn: 'Pay interest strictly on utilized amount and days. 100% online setup via MB Mobile App.',
    rate: 12.0,
    promoRate: 12.0,
    promoMonths: 12,
    floatingMargin: 0,
    estFloatingRate: 12.0,
    fee: 0,
    minAmount: 10000000,
    maxAmount: 300000000,
    maxTermMonths: 12,
    maxLtvPct: 0,
    prepaymentFeePct: 0,
    prepaymentFeeYears: 0,
    approvalDays: 0,
    minIncome: 7000000,
    collateralRequired: false,
    badges: ['Tính lãi theo ngày', 'Kích hoạt ngay trên App'],
    isSponsored: false,
    rankScore: 89,
  },
  {
    id: 'ctg-vay-tieu-dung-cbcnv',
    slug: 'ctg-vay-tieu-dung-cbcnv',
    partnerId: 'vietinbank',
    category: 'loan',
    subcategory: 'consumer_loan',
    titleVi: 'Gói vay tiêu dùng cán bộ công nhân viên VietinBank',
    titleEn: 'VietinBank Civil Servant & Corporate Staff Loan',
    summaryVi: 'Lãi suất tín chấp ưu đãi đặc biệt cho nhân viên doanh nghiệp liên kết và cơ quan nhà nước, thủ tục đơn giản minh bạch.',
    summaryEn: 'Special subsidized unsecured loan rate for state enterprise employees and corporate partner staff.',
    rate: 9.8,
    promoRate: 9.8,
    promoMonths: 12,
    floatingMargin: 0,
    estFloatingRate: 9.8,
    fee: 0,
    minAmount: 30000000,
    maxAmount: 400000000,
    maxTermMonths: 60,
    maxLtvPct: 0,
    prepaymentFeePct: 1.0,
    prepaymentFeeYears: 2,
    approvalDays: 2,
    minIncome: 6000000,
    collateralRequired: false,
    badges: ['Lãi suất thấp 9,8%', 'Ưu đãi khối văn phòng'],
    isSponsored: false,
    rankScore: 91,
  },

  // --- VAY HỘ KINH DOANH (BUSINESS HOUSEHOLD LOANS) ---
  {
    id: 'bidv-vay-ho-kinh-doanh-tiep-suc',
    slug: 'bidv-vay-ho-kinh-doanh-tiep-suc',
    partnerId: 'bidv',
    category: 'loan',
    subcategory: 'business_loan',
    titleVi: 'Gói Vay Tiếp Sức Hộ Kinh Doanh Cá Thể - BIDV',
    titleEn: 'BIDV Empowering Household Business Credit',
    summaryVi: 'Tài trợ vốn lưu động bổ sung hàng hóa mùa vụ, lãi suất chỉ từ 5,5%/năm, hạn mức vay tới 5 tỷ đồng, định giá tài sản nhanh.',
    summaryEn: 'Working capital financing for seasonal stock replenishment, rate from 5.5%/yr, up to 5B VND facility.',
    rate: 5.5,
    promoRate: 5.5,
    promoMonths: 6,
    floatingMargin: 3.0,
    estFloatingRate: 9.2,
    fee: 0,
    minAmount: 100000000,
    maxAmount: 5000000000,
    maxTermMonths: 60,
    maxLtvPct: 80,
    prepaymentFeePct: 1.0,
    prepaymentFeeYears: 2,
    approvalDays: 2,
    minIncome: 20000000,
    collateralRequired: true,
    badges: ['Vốn lưu động nhanh', 'Lãi suất từ 5,5%'],
    isSponsored: true,
    rankScore: 97,
  },
  {
    id: 'acb-vay-tieu-thuong-cho',
    slug: 'acb-vay-tieu-thuong-cho',
    partnerId: 'acb',
    category: 'loan',
    subcategory: 'business_loan',
    titleVi: 'Vay kinh doanh tiểu thương & chợ truyền thống ACB',
    titleEn: 'ACB Traditional Market & Merchant Merchant Credit',
    summaryVi: 'Chấp nhận sổ sách ghi chép bán hàng thực tế, không bắt buộc báo cáo tài chính phức tạp, nhân viên tư vấn tận nơi.',
    summaryEn: 'Accepts informal sales ledger records, no complex corporate auditing, dedicated on-site loan advisor.',
    rate: 6.8,
    promoRate: 6.8,
    promoMonths: 12,
    floatingMargin: 2.9,
    estFloatingRate: 9.7,
    fee: 0,
    minAmount: 50000000,
    maxAmount: 2000000000,
    maxTermMonths: 36,
    maxLtvPct: 75,
    prepaymentFeePct: 0.5,
    prepaymentFeeYears: 1,
    approvalDays: 1,
    minIncome: 15000000,
    collateralRequired: true,
    badges: ['Thẩm định tận nơi', 'Hỗ trợ sổ ghi tay'],
    isSponsored: false,
    rankScore: 90,
  },

  // --- TIỀN GỬI TIẾT KIỆM (DEPOSITS / SAVINGS) ---
  {
    id: 'vcb-tiet-kiem-truc-tuyen',
    slug: 'vcb-tiet-kiem-truc-tuyen',
    partnerId: 'vietcombank',
    category: 'deposit',
    subcategory: 'term_deposit',
    titleVi: 'Tiết kiệm trực tuyến VCB Digibank',
    titleEn: 'Vietcombank Online Term Savings',
    summaryVi: 'Cộng thêm 0,2%/năm so với gửi tại quầy. Rút gốc từng phần linh hoạt bảo toàn tiền lãi cho phần còn lại.',
    summaryEn: 'Extra +0.2%/yr compared to counter deposits. Flexible partial withdrawal preserving interest on remaining balance.',
    rate: 5.2,
    promoRate: 5.2,
    promoMonths: 0,
    floatingMargin: 0,
    estFloatingRate: 5.2,
    fee: 0,
    minAmount: 1000000,
    maxAmount: 100000000000,
    maxTermMonths: 36,
    maxLtvPct: 0,
    prepaymentFeePct: 0,
    prepaymentFeeYears: 0,
    approvalDays: 0,
    minIncome: 0,
    collateralRequired: false,
    termRates: {
      '1': 2.8,
      '3': 3.1,
      '6': 4.2,
      '12': 5.2,
      '24': 5.5,
      '36': 5.5,
    },
    badges: ['An toàn tuyệt đối', 'Rút gốc linh hoạt', 'Cộng lãi Online'],
    isSponsored: true,
    rankScore: 98,
  },
  {
    id: 'bidv-tiet-kiem-tich-luy',
    slug: 'bidv-tiet-kiem-tich-luy',
    partnerId: 'bidv',
    category: 'deposit',
    subcategory: 'term_deposit',
    titleVi: 'Tiền gửi tích lũy định kỳ BIDV SmartBanking',
    titleEn: 'BIDV Recurring Compound Savings',
    summaryVi: 'Lãi suất 12 tháng lên tới 5,3%/năm, trích tiền tự động hàng tháng từ tài khoản thanh toán, bảo hiểm tiền gửi quốc gia.',
    summaryEn: '12-month rate up to 5.3%/yr, automatic monthly recurring deduction, National Deposit Insurance certified.',
    rate: 5.3,
    promoRate: 5.3,
    promoMonths: 0,
    floatingMargin: 0,
    estFloatingRate: 5.3,
    fee: 0,
    minAmount: 500000,
    maxAmount: 50000000000,
    maxTermMonths: 36,
    maxLtvPct: 0,
    prepaymentFeePct: 0,
    prepaymentFeeYears: 0,
    approvalDays: 0,
    minIncome: 0,
    collateralRequired: false,
    termRates: {
      '1': 3.0,
      '3': 3.3,
      '6': 4.4,
      '12': 5.3,
      '24': 5.6,
      '36': 5.6,
    },
    badges: ['Tích lũy tự động', 'Kỳ hạn 12 tháng 5,3%'],
    isSponsored: false,
    rankScore: 94,
  },
  {
    id: 'tcb-tiet-kiem-phat-loc',
    slug: 'tcb-tiet-kiem-phat-loc',
    partnerId: 'techcombank',
    category: 'deposit',
    subcategory: 'term_deposit',
    titleVi: 'Tiền gửi Phát Lộc điện tử Techcombank',
    titleEn: 'Techcombank Digital Prosperity Certificate',
    summaryVi: 'Biểu lãi suất bậc thang vượt trội theo số tiền gửi, kỳ hạn linh hoạt theo ngày/tuần/tháng, thanh khoản cao.',
    summaryEn: 'Tiered yield based on deposit volume, flexible maturity by days/weeks/months, high liquidity.',
    rate: 5.6,
    promoRate: 5.6,
    promoMonths: 0,
    floatingMargin: 0,
    estFloatingRate: 5.6,
    fee: 0,
    minAmount: 10000000,
    maxAmount: 100000000000,
    maxTermMonths: 36,
    maxLtvPct: 0,
    prepaymentFeePct: 0,
    prepaymentFeeYears: 0,
    approvalDays: 0,
    minIncome: 0,
    collateralRequired: false,
    termRates: {
      '1': 3.2,
      '3': 3.5,
      '6': 4.8,
      '12': 5.6,
      '24': 5.8,
      '36': 5.8,
    },
    badges: ['Lãi suất bậc thang', 'Tối ưu vốn nhàn rỗi'],
    isSponsored: false,
    rankScore: 93,
  },
  {
    id: 'acb-tiet-kiem-dai-loc',
    slug: 'acb-tiet-kiem-dai-loc',
    partnerId: 'acb',
    category: 'deposit',
    subcategory: 'term_deposit',
    titleVi: 'Tiết kiệm Đại Lộc Phúc Mãn Đường ACB',
    titleEn: 'ACB Fortune & Blessings Family Savings',
    summaryVi: 'Tặng bảo hiểm sức khỏe cho chủ sổ gửi kỳ hạn từ 6 tháng, lãi suất cuối kỳ hấp dẫn cùng quà tặng sinh nhật.',
    summaryEn: 'Complimentary health insurance policy for 6+ month depositors, attractive maturity yield and seasonal gifts.',
    rate: 5.4,
    promoRate: 5.4,
    promoMonths: 0,
    floatingMargin: 0,
    estFloatingRate: 5.4,
    fee: 0,
    minAmount: 5000000,
    maxAmount: 50000000000,
    maxTermMonths: 36,
    maxLtvPct: 0,
    prepaymentFeePct: 0,
    prepaymentFeeYears: 0,
    approvalDays: 0,
    minIncome: 0,
    collateralRequired: false,
    termRates: {
      '1': 3.0,
      '3': 3.4,
      '6': 4.6,
      '12': 5.4,
      '24': 5.7,
      '36': 5.7,
    },
    badges: ['Tặng bảo hiểm', 'Quà tặng lễ tết'],
    isSponsored: false,
    rankScore: 91,
  },

  // --- THẺ TÍN DỤNG (CREDIT CARDS) ---
  {
    id: 'tcb-spark-cashback',
    slug: 'tcb-spark-cashback',
    partnerId: 'techcombank',
    category: 'card',
    subcategory: 'cashback_card',
    titleVi: 'Thẻ tín dụng Techcombank Spark Cashback Visa',
    titleEn: 'Techcombank Spark Cashback Visa Credit Card',
    summaryVi: 'Hoàn tiền lên tới 5% cho mọi chi tiêu ăn uống, mua sắm siêu thị và du lịch trực tuyến. Miễn phí thường niên trọn đời khi đạt hạn mức chi tiêu.',
    summaryEn: 'Up to 5% unlimited cashback on dining, groceries, and flight booking. Lifetime annual fee waiver with spending condition.',
    rate: 18.0,
    promoRate: 0.0,
    promoMonths: 3,
    floatingMargin: 0,
    estFloatingRate: 18.0,
    fee: 499000,
    minAmount: 20000000,
    maxAmount: 500000000,
    maxTermMonths: 0,
    maxLtvPct: 0,
    prepaymentFeePct: 0,
    prepaymentFeeYears: 0,
    approvalDays: 1,
    minIncome: 10000000,
    collateralRequired: false,
    badges: ['Hoàn tiền 5%', 'Miễn phí thường niên', 'Visa Contactless'],
    isSponsored: true,
    rankScore: 97,
  },
  {
    id: 'vpb-step-up-card',
    slug: 'vpb-step-up-card',
    partnerId: 'vpbank',
    category: 'card',
    subcategory: 'cashback_card',
    titleVi: 'Thẻ tín dụng VPBank StepUp Mastercard',
    titleEn: 'VPBank StepUp Mastercard Cashback',
    summaryVi: 'Hoàn tới 15% cho chi tiêu Grab, Be, Shopee, TikTok Shop và quảng cáo trực tuyến. Miễn lãi lên đến 45 ngày.',
    summaryEn: 'Up to 15% cashback on Grab, Be, Shopee, TikTok Shop, and digital ads. Up to 45 interest-free grace days.',
    rate: 22.0,
    promoRate: 0.0,
    promoMonths: 3,
    floatingMargin: 0,
    estFloatingRate: 22.0,
    fee: 400000,
    minAmount: 10000000,
    maxAmount: 500000000,
    maxTermMonths: 0,
    maxLtvPct: 0,
    prepaymentFeePct: 0,
    prepaymentFeeYears: 0,
    approvalDays: 0,
    minIncome: 7000000,
    collateralRequired: false,
    badges: ['Hoàn 15% mua sắm online', 'Miễn lãi 45 ngày'],
    isSponsored: false,
    rankScore: 94,
  },
  {
    id: 'vcb-visa-signature',
    slug: 'vcb-visa-signature',
    partnerId: 'vietcombank',
    category: 'card',
    subcategory: 'travel_card',
    titleVi: 'Thẻ tín dụng Vietcombank Visa Signature đẳng cấp',
    titleEn: 'Vietcombank Visa Signature Luxury Card',
    summaryVi: 'Miễn phí vào hơn 1.000 phòng chờ thương gia sân bay toàn cầu, bảo hiểm du lịch toàn cầu giá trị bồi thường tới 21 tỷ đồng.',
    summaryEn: 'Complimentary access to 1,000+ airport lounges worldwide, worldwide travel insurance coverage up to 21B VND.',
    rate: 15.0,
    promoRate: 0.0,
    promoMonths: 0,
    floatingMargin: 0,
    estFloatingRate: 15.0,
    fee: 3000000,
    minAmount: 100000000,
    maxAmount: 2000000000,
    maxTermMonths: 0,
    maxLtvPct: 0,
    prepaymentFeePct: 0,
    prepaymentFeeYears: 0,
    approvalDays: 3,
    minIncome: 30000000,
    collateralRequired: false,
    badges: ['Phòng chờ sân bay', 'Bảo hiểm 21 tỷ', 'Khách hàng VIP'],
    isSponsored: false,
    rankScore: 92,
  },
  {
    id: 'acb-visa-platinum',
    slug: 'acb-visa-platinum',
    partnerId: 'acb',
    category: 'card',
    subcategory: 'rewards_card',
    titleVi: 'Thẻ tín dụng ACB Visa Platinum Du lịch & Golf',
    titleEn: 'ACB Visa Platinum Travel & Golf Club Card',
    summaryVi: 'Tích dặm bay Vietnam Airlines & Bamboo Airways, ưu đãi giảm tới 50% phí ra sân tại 30+ sân golf lớn nhất Việt Nam.',
    summaryEn: 'Vietnam Airlines air-mile rewards, up to 50% green fee discounts at 30+ premier golf courses across Vietnam.',
    rate: 16.5,
    promoRate: 0.0,
    promoMonths: 0,
    floatingMargin: 0,
    estFloatingRate: 16.5,
    fee: 1200000,
    minAmount: 50000000,
    maxAmount: 1000000000,
    maxTermMonths: 0,
    maxLtvPct: 0,
    prepaymentFeePct: 0,
    prepaymentFeeYears: 0,
    approvalDays: 2,
    minIncome: 15000000,
    collateralRequired: false,
    badges: ['Tích lũy dặm bay', 'Đặc quyền chơi Golf'],
    isSponsored: false,
    rankScore: 89,
  },

  // --- BẢO HIỂM (INSURANCE) ---
  {
    id: 'mfc-cuoc-song-tuoi-dep',
    slug: 'mfc-cuoc-song-tuoi-dep',
    partnerId: 'manulife',
    category: 'insurance',
    subcategory: 'life_insurance',
    titleVi: 'Bảo hiểm nhân thọ Manulife - Cuộc Sống Tươi Đẹp Ưu Việt',
    titleEn: 'Manulife Beautiful Life Premier Plan',
    summaryVi: 'Bảo vệ toàn diện trước 134 bệnh lý nghiêm trọng qua nhiều giai đoạn (sớm, giữa, cuối), chi trả lên đến 325% số tiền bảo hiểm.',
    summaryEn: 'Comprehensive protection against 134 critical illnesses across early, mid, and late stages, payout up to 325% of sum assured.',
    rate: 0,
    promoRate: 0,
    promoMonths: 0,
    floatingMargin: 0,
    estFloatingRate: 0,
    fee: 15000000,
    minAmount: 500000000,
    maxAmount: 10000000000,
    maxTermMonths: 360,
    maxLtvPct: 0,
    prepaymentFeePct: 0,
    prepaymentFeeYears: 0,
    approvalDays: 2,
    minIncome: 8000000,
    collateralRequired: false,
    badges: ['134 bệnh lý nghiêm trọng', 'Chi trả 325%', 'Bảo lãnh viện phí'],
    isSponsored: true,
    rankScore: 97,
  },
  {
    id: 'pru-hanh-trang-vung-buoc',
    slug: 'pru-hanh-trang-vung-buoc',
    partnerId: 'prudential',
    category: 'insurance',
    subcategory: 'life_insurance',
    titleVi: 'Bảo hiểm liên kết đầu tư Prudential PRU-Hành Trang Vững Bước',
    titleEn: 'Prudential PRU-Solid Stepping Investment-Linked Life',
    summaryVi: 'Kết hợp bảo vệ tính mạng và gia tăng tài sản thông qua 6 quỹ đầu tư chuyên nghiệp do Eastspring Investments quản lý.',
    summaryEn: 'Combined life coverage and wealth accumulation via 6 fund options managed by Eastspring Investments.',
    rate: 0,
    promoRate: 0,
    promoMonths: 0,
    floatingMargin: 0,
    estFloatingRate: 0,
    fee: 20000000,
    minAmount: 1000000000,
    maxAmount: 20000000000,
    maxTermMonths: 480,
    maxLtvPct: 0,
    prepaymentFeePct: 0,
    prepaymentFeeYears: 0,
    approvalDays: 2,
    minIncome: 12000000,
    collateralRequired: false,
    badges: ['Đầu tư sinh lời', 'Bảo vệ tài chính trọn đời'],
    isSponsored: false,
    rankScore: 93,
  },
  {
    id: 'bvh-an-phat-cat-tuong',
    slug: 'bvh-an-phat-cat-tuong',
    partnerId: 'baoviet',
    category: 'insurance',
    subcategory: 'life_insurance',
    titleVi: 'Bảo hiểm Nhân thọ Bảo Việt An Phát Cát Tường',
    titleEn: 'Bao Viet An Phat Cat Tuong Life Security',
    summaryVi: 'Quyền lợi tử vong do tai nạn máy bay lên tới 300% số tiền bảo hiểm. Chăm sóc y tế cao cấp tại bệnh viện quốc tế hàng đầu.',
    summaryEn: 'Accidental flight catastrophe benefit up to 300% sum assured. VIP inpatient hospital care at Vinmec, FV, Franco-Vietnam.',
    rate: 0,
    promoRate: 0,
    promoMonths: 0,
    floatingMargin: 0,
    estFloatingRate: 0,
    fee: 12000000,
    minAmount: 300000000,
    maxAmount: 5000000000,
    maxTermMonths: 300,
    maxLtvPct: 0,
    prepaymentFeePct: 0,
    prepaymentFeeYears: 0,
    approvalDays: 1,
    minIncome: 7000000,
    collateralRequired: false,
    badges: ['Thương hiệu quốc gia', 'Bảo lãnh viện phí VIP'],
    isSponsored: false,
    rankScore: 90,
  },
  {
    id: 'pvi-care-suc-khoe-toan-dien',
    slug: 'pvi-care-suc-khoe-toan-dien',
    partnerId: 'pvi',
    category: 'insurance',
    subcategory: 'health_insurance',
    titleVi: 'Bảo hiểm sức khỏe cao cấp PVI Care Toàn Diện',
    titleEn: 'PVI Care Comprehensive Health Insurance',
    summaryVi: 'Hạn mức chi trả y tế lên tới 500 triệu đồng/năm. Không yêu cầu khám sức khỏe trước khi tham gia, bảo lãnh viện phí thẻ cứng & điện tử.',
    summaryEn: 'Medical benefits up to 500M VND/year. No pre-enrollment medical check, instant cashless hospital guarantee card.',
    rate: 0,
    promoRate: 0,
    promoMonths: 0,
    floatingMargin: 0,
    estFloatingRate: 0,
    fee: 3500000,
    minAmount: 100000000,
    maxAmount: 500000000,
    maxTermMonths: 12,
    maxLtvPct: 0,
    prepaymentFeePct: 0,
    prepaymentFeeYears: 0,
    approvalDays: 1,
    minIncome: 0,
    collateralRequired: false,
    badges: ['Hạn mức 500 tr/năm', 'Bảo lãnh 200+ bệnh viện'],
    isSponsored: true,
    rankScore: 95,
  },
];

// 3. 4 Editorial Guides & Educational Articles
const articles = [
  {
    id: 'vay-mua-nha-lan-dau',
    slug: 'vay-mua-nha-lan-dau',
    titleVi: 'Kinh nghiệm vay mua nhà lần đầu năm 2025: Lựa chọn gói lãi suất cố định hay thả nổi?',
    titleEn: 'First-Time Homebuyer Loan Guide 2025: Fixed vs. Floating Interest Rate Choices',
    summaryVi: 'Phân tích chi tiết chiến lược chốt lãi suất cố định 12-24 tháng và cách dự phòng biên độ thả nổi khi thị trường điều chỉnh.',
    summaryEn: 'In-depth analysis on locking 12-24 month fixed rate packages and calculating post-promo floating margins.',
    contentVi: `# Kinh nghiệm vay mua nhà lần đầu năm 2025: Cố định hay Thả nổi?

Vay mua nhà là quyết định tài chính quan trọng nhất của đa số gia đình Việt Nam. Năm 2025, mặt bằng lãi suất đang có xu hướng ổn định quanh mức 5,5% – 6,5%/năm trong giai đoạn ưu đãi.

## 1. Hiểu đúng về cơ chế lãi suất hai tầng
Các ngân hàng thương mại Việt Nam (Vietcombank, BIDV, Techcombank, ACB...) thường áp dụng cơ cấu:
- **Kỳ ưu đãi:** Lãi suất cố định trong 6, 12, 18, 24 hoặc 36 tháng đầu.
- **Kỳ sau ưu đãi:** Lãi suất thả nổi = Lãi suất cơ sở (hoặc lãi suất huy động 12/24 tháng của Big 4) + Biên độ dao động (thường từ 2,8% đến 3,8%/năm).

## 2. Quy tắc an toàn tài chính 40/20
- **Chi phí trả nợ hàng tháng không vượt quá 40% thu nhập thực tế:** Hãy tính toán cả tiền gốc và tiền lãi phát sinh ở mức lãi suất thả nổi dự kiến (~9,5% - 10,5%/năm) thay vì chỉ nhìn vào mức ưu đãi năm đầu.
- **Dự phòng khẩn cấp tối thiểu 6 tháng sinh hoạt:** Giúp bạn chủ động trước mọi biến cố công việc mà không bị áp lực nợ xấu nhóm 2 trở lên.

## 3. Phí phạt trả nợ trước hạn
Hầu hết các ngân hàng áp dụng phí trả trước hạn từ 0,5% - 2,0% trong 3-5 năm đầu, và miễn phí hoàn toàn từ năm thứ 5 hoặc 6. Hãy xem xét chiến lược trả bớt gốc khi có tiền thưởng cuối năm để giảm số lãi lũy kế.`,
    contentEn: 'Full article in English on mortgage strategies.',
    topic: 'Vay mua nhà',
    authorId: 'nguyen-minh-duc',
    readTimeMinutes: 7,
    status: 'published',
    isSample: true,
    publishedAt: Timestamp.fromDate(new Date('2025-01-15T08:00:00Z')),
  },
  {
    id: 'tinh-du-no-giam-dan',
    slug: 'tinh-du-no-giam-dan',
    titleVi: 'Cách tính tiền lãi theo dư nợ giảm dần chuẩn Ngân hàng Nhà nước',
    titleEn: 'How Reducing Balance Interest Method Works under SBV Standards',
    summaryVi: 'So sánh trực quan giữa phương thức lãi suất trên dư nợ gốc ban đầu (Flat rate) và dư nợ thực tế giảm dần (Reducing rate).',
    summaryEn: 'Visual comparison between flat rate and reducing balance methods to avoid hidden borrowing costs.',
    contentVi: `# Cách tính tiền lãi theo dư nợ giảm dần chuẩn Ngân hàng Nhà nước

Nhiều người vay nhầm lẫn khi thấy một số tổ chức quảng cáo "lãi suất chỉ 0,8%/tháng" (tương đương 9,6%/năm tính trên dư nợ gốc ban đầu), trong khi lãi suất thực tế tính theo dư nợ giảm dần có thể lên tới 17% - 18%/năm.

## 1. Công thức tính dư nợ giảm dần
- **Gốc trả hàng tháng:** Bằng Tổng số tiền vay chia cho Tổng số tháng vay.
- **Lãi trả hàng tháng:** Bằng (Dư nợ còn lại tại đầu tháng x Lãi suất năm) / 12 tháng.
- **Tổng số tiền phải trả mỗi tháng = Gốc + Lãi.**

Vì dư nợ gốc giảm dần theo từng tháng, số tiền lãi bạn phải trả sẽ ít dần theo thời gian, giúp tổng chi phí lãi vay thấp hơn nhiều so với cách tính cố định trên gốc ban đầu.`,
    contentEn: 'Calculation mechanics of reducing balance interest vs flat interest.',
    topic: 'Cẩm nang vay vốn',
    authorId: 'tran-thi-thu-ha',
    readTimeMinutes: 5,
    status: 'published',
    isSample: true,
    publishedAt: Timestamp.fromDate(new Date('2025-02-01T09:30:00Z')),
  },
  {
    id: 'ho-so-chung-minh-thu-nhap',
    slug: 'ho-so-chung-minh-thu-nhap',
    titleVi: 'Hướng dẫn chuẩn bị hồ sơ chứng minh thu nhập cho người làm tự do & hộ kinh doanh',
    titleEn: 'Income Proof Preparation Guide for Freelancers and Household Businesses',
    summaryVi: 'Bí quyết giúp người làm tự do (Freelancer), chủ cửa hàng online và hộ kinh doanh cá thể được duyệt vay ngân hàng nhanh chóng.',
    summaryEn: 'Essential guide for digital freelancers, e-commerce shop owners, and household merchants to secure bank loans.',
    contentVi: `# Hướng dẫn chuẩn bị hồ sơ chứng minh thu nhập cho người làm tự do & hộ kinh doanh

Ngân hàng thẩm định dựa trên khả năng trả nợ thực tế và tính ổn định của dòng tiền. Nếu bạn không có bảng lương sao kê ngân hàng hay hợp đồng lao động chính quy, đây là những chứng từ thay thế có giá trị pháp lý cao:

1. **Sao kê tài khoản ngân hàng kinh doanh 6-12 tháng liên tục:** Thể hiện rõ dòng tiền vào/ra đều đặn.
2. **Sổ ghi chép xuất nhập hàng và hóa đơn bán lẻ:** Minh họa biên lợi nhuận ròng.
3. **Hợp đồng cho thuê tài sản (nếu có):** Bất động sản, xe ô tô kèm chứng từ thanh toán định kỳ.
4. **Hồ sơ đăng ký kinh doanh và biên lai nộp thuế môn bài/thuế khoán:** Chứng minh tư cách pháp nhân hợp lệ.`,
    contentEn: 'How informal and self-employed borrowers can verify cash flow.',
    topic: 'Thủ tục pháp lý',
    authorId: 'tran-thi-thu-ha',
    readTimeMinutes: 6,
    status: 'published',
    isSample: true,
    publishedAt: Timestamp.fromDate(new Date('2025-02-18T10:00:00Z')),
  },
  {
    id: 'bao-ve-du-lieu-luat-91-2025',
    slug: 'bao-ve-du-lieu-luat-91-2025',
    titleVi: 'Quyền của bạn theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 khi so sánh và vay vốn',
    titleEn: 'Your Rights under Data Protection Law No. 91/2025/QH15 in Finance Comparisons',
    summaryVi: 'Finazen cam kết thực thi nghiêm ngặt quyền đồng thuận, quyền được biết và quyền yêu cầu xóa dữ liệu của người dùng theo quy định mới nhất.',
    summaryEn: 'How Finazen guarantees unbundled explicit consent, purpose limitation, and right to be forgotten under Law 91/2025/QH15.',
    contentVi: `# Quyền của bạn theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15

Kể từ khi Quốc hội ban hành Luật Bảo vệ Dữ liệu Cá nhân số 91/2025/QH15 và Chính phủ ban hành Nghị định 356/2025/NĐ-CP, việc thu thập và chia sẻ thông tin tài chính cá nhân được bảo vệ với tiêu chuẩn khắt khe nhất.

## 1. Đồng thuận riêng biệt và không mặc định tích sẵn
Tại Finazen, bạn không bao giờ bắt gặp các ô tích chọn ngầm "Đồng ý cho bên thứ ba tiếp thị". Mỗi lượt gửi yêu cầu tư vấn đều đi kèm:
- **Tên cụ thể của tổ chức tín dụng được nhận thông tin.**
- **Mục đích duy nhất: Liên hệ tư vấn gói vay/tiết kiệm/bảo hiểm bạn đã chọn.**

## 2. Mã hóa dữ liệu định danh (PII Vault)
Họ tên, số điện thoại và email của bạn được mã hóa bằng chuẩn quân đội AES-256-GCM. Không một trình duyệt hay bên thứ ba nào có thể trích xuất nếu chưa có xác thực từ server Finazen.

## 3. Quyền rút lại sự đồng ý & Xóa dữ liệu (DSR)
Bạn có toàn quyền truy cập mục Cài đặt Tài khoản để yêu cầu xóa vĩnh viễn hồ sơ và thu hồi sự đồng ý chia sẻ thông tin bất kỳ lúc nào.`,
    contentEn: 'Data subject rights under Vietnam Data Protection Law 91/2025/QH15.',
    topic: 'Chính sách & Pháp lý',
    authorId: 'nguyen-minh-duc',
    readTimeMinutes: 8,
    status: 'published',
    isSample: true,
    publishedAt: Timestamp.fromDate(new Date('2025-02-25T14:00:00Z')),
  },
];

// 4. 2 Financial Authors
const authors = [
  {
    id: 'nguyen-minh-duc',
    name: 'Nguyễn Minh Đức, CFA',
    titleVi: 'Giám đốc Phân tích Dữ liệu Tài chính Finazen',
    titleEn: 'Head of Financial Analytics at Finazen',
    bioVi: 'Hơn 12 năm kinh nghiệm trong lĩnh vực ngân hàng đầu tư và cố vấn tài chính cá nhân tại các định chế tài chính trong nước và quốc tế.',
    bioEn: 'Over 12 years of experience in retail banking analytics and personal wealth advisory.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    isSample: true,
  },
  {
    id: 'tran-thi-thu-ha',
    name: 'Trần Thị Thu Hà',
    titleVi: 'Chuyên gia Pháp chế & Thẩm định Tín dụng Bán lẻ',
    titleEn: 'Retail Credit Underwriting & Legal Counsel',
    bioVi: 'Cựu chuyên viên thẩm định cấp cao tại ngân hàng thương mại nhà nước, am hiểu sâu sắc quy trình giải ngân và luật bảo vệ dữ liệu tín dụng.',
    bioEn: 'Former senior underwriting officer with deep expertise in mortgage processing and borrower data privacy compliance.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    isSample: true,
  },
];

// 5. System Settings (Public & Private)
const publicSettings = {
  appName: 'Finazen',
  taglineVi: 'Nền tảng so sánh tài chính cá nhân độc lập hàng đầu Việt Nam',
  taglineEn: 'Vietnam’s Premier Independent Personal Finance Comparison Platform',
  hotline: '1900 6868',
  email: 'hotro@finazen.vn',
  businessAddress: 'Tầng 18, Tòa nhà Bitexco Financial Tower, Số 2 Hải Triều, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  businessRegistrationNumber: '0318992025',
  representative: 'Nguyễn Trung Kiên',
  dataProtectionCitation: 'Tuân thủ nghiêm ngặt Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 và Nghị định số 356/2025/NĐ-CP',
  disclaimerVi: 'Finazen là nền tảng công nghệ so sánh tài chính và kết nối cố vấn độc lập. Finazen KHÔNG phải là tổ chức tín dụng, chi nhánh ngân hàng nước ngoài hay doanh nghiệp bảo hiểm. Mọi thông tin so sánh lãi suất mang tính chất tham khảo, quyết định cấp tín dụng hoặc phát hành hợp đồng bảo hiểm thuộc quyền quyết định độc lập của đối tác được cấp phép.',
  disclaimerEn: 'Finazen is an independent comparison and advisory technology platform. Finazen is NOT a credit institution or insurance company. Loan approval decisions and insurance issuance remain strictly with licensed partner institutions.',
  ratesLastUpdated: '08/11/2026',
  schemaVersion: 1,
  updatedAt: now,
};

const privateSettings = {
  internalSlaMinutes: 30,
  webhookRetryLimit: 5,
  adminAlertEmails: ['ntrung83@gmail.com', 'admin@finazen.vn'],
  encryptionAlgorithm: 'AES-256-GCM',
  hmacAlgorithm: 'HMAC-SHA256',
  retentionMonthsLeads: 24,
  retentionMonthsLogs: 36,
  schemaVersion: 1,
  updatedAt: now,
};

async function seedDatabase() {
  console.log('🚀 Starting Finazen database seed process...');

  const batch = db.batch();

  // 1. Seed Partners
  console.log(`Writing ${partners.length} institutional partners...`);
  for (const p of partners) {
    const partnerRef = db.collection('partners').doc(p.id);
    batch.set(partnerRef, {
      ...p,
      createdAt: now,
      updatedAt: now,
      schemaVersion: 1,
    });
  }

  // 2. Seed Authors
  console.log(`Writing ${authors.length} editorial authors...`);
  for (const a of authors) {
    const authorRef = db.collection('authors').doc(a.id);
    batch.set(authorRef, {
      ...a,
      createdAt: now,
      updatedAt: now,
      schemaVersion: 1,
    });
  }

  // 3. Seed Articles
  console.log(`Writing ${articles.length} educational articles...`);
  for (const art of articles) {
    const artRef = db.collection('articles').doc(art.id);
    batch.set(artRef, {
      ...art,
      createdAt: now,
      updatedAt: now,
      schemaVersion: 1,
    });
  }

  // 4. Seed Settings
  console.log('Writing public & private platform settings...');
  batch.set(db.collection('settings').doc('public'), publicSettings);
  batch.set(db.collection('settings').doc('private'), privateSettings);

  // Commit first batch
  await batch.commit();
  console.log('✅ Base collections (partners, authors, articles, settings) successfully committed.');

  // 5. Seed Offers with Denormalized Partner metadata & RateHistory snapshots & Distributed shards
  console.log(`Writing ${offers.length} comparison offers with history and counter shards...`);
  const partnerMap = new Map(partners.map(p => [p.id, p]));

  for (const off of offers) {
    const offerBatch = db.batch();
    const partner = partnerMap.get(off.partnerId);

    const denormalizedPartner = partner
      ? {
          name: partner.name,
          shortName: partner.shortName,
          logoUrl: partner.logoUrl,
          slug: partner.slug,
        }
      : null;

    const searchKeywords = generateSearchKeywords(`${off.titleVi} ${off.summaryVi} ${partner?.name} ${partner?.shortName}`);

    const offerDoc = {
      ...off,
      partner: denormalizedPartner,
      detailsVi: `${off.summaryVi} Chi tiết điều khoản được quy định bởi ${partner?.shortName || 'đối tác'}.`,
      detailsEn: `${off.summaryEn} Full terms governed by licensed partner agreements.`,
      status: 'published',
      isSample: true,
      rateEffectiveFrom: now,
      rateSourceUrl: partner?.website || 'https://finazen.vn',
      verifiedAt: now,
      verifiedBy: 'system-seeder',
      publishAt: now,
      searchKeywords,
      createdAt: now,
      updatedAt: now,
      schemaVersion: 1,
    };

    const offerRef = db.collection('offers').doc(off.id);
    offerBatch.set(offerRef, offerDoc);

    // Initial Rate History snapshot
    const rateHistoryRef = offerRef.collection('rateHistory').doc('initial');
    offerBatch.set(rateHistoryRef, {
      rate: off.rate,
      promoRate: off.promoRate,
      promoMonths: off.promoMonths,
      floatingMargin: off.floatingMargin,
      effectiveFrom: now,
      recordedBy: 'system-seeder',
      createdAt: now,
      schemaVersion: 1,
    });

    // Seed 10 Distributed Counter Shards (0..9) for high concurrency writes
    for (let i = 0; i < 10; i++) {
      const shardRef = db.collection('offerStats').doc(off.id).collection('shards').doc(String(i));
      offerBatch.set(shardRef, {
        views: Math.floor(Math.random() * 50) + 10,
        leads: Math.floor(Math.random() * 5),
        saves: Math.floor(Math.random() * 8),
        updatedAt: now,
        schemaVersion: 1,
      });
    }

    await offerBatch.commit();
  }

  console.log(`✅ All ${offers.length} comparison offers seeded with rate snapshots and 10 distributed shards each.`);
  console.log('🎉 Finazen Firestore seed completed successfully!');
}

seedDatabase().catch(err => {
  if (err?.code === 7 || err?.message?.includes('PERMISSION_DENIED')) {
    console.warn('\n⚠️  Cloud Firestore Admin write permission was denied.');
    console.warn('   In Google Cloud Run or GCP environments, Application Default Credentials (ADC) authenticate automatically.');
    console.warn('   For local execution, supply FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in your .env or run with:');
    console.warn('   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json npm run seed\n');
    console.log('💡 Static dataset is validated and exported via lib/data/seed-data.ts for development.');
    process.exit(0);
  } else {
    console.error('❌ Error during Firestore seed:', err);
    process.exit(1);
  }
});
