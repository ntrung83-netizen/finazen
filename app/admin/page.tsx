import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/table';
import { ShieldCheck, Lock, Users, Building2, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function AdminPage() {
  const auditLogs = [
    {
      id: 'AUD-912025-001',
      action: 'CONSENT_GRANTED',
      purpose: 'LOAN_ADVISORY_FORWARDING',
      partner: 'Vietcombank',
      lawRef: 'Luật 91/2025/QH15',
      time: '08/11/2026 14:22:10',
      status: 'VERIFIED_RECORD',
    },
    {
      id: 'AUD-912025-002',
      action: 'LEAD_FORWARDED',
      purpose: 'LOAN_ADVISORY_FORWARDING',
      partner: 'Techcombank',
      lawRef: 'Luật 91/2025/QH15',
      time: '08/11/2026 14:15:05',
      status: 'DISPATCHED_SECURE',
    },
    {
      id: 'AUD-912025-003',
      action: 'DATA_ACCESS_REQUEST',
      purpose: 'DATA_SUBJECT_RIGHTS',
      partner: 'Finazen System',
      lawRef: 'NĐ 356/2025/NĐ-CP',
      time: '08/11/2026 13:40:19',
      status: 'FULFILLED',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-slate-900 text-white font-mono text-xs font-bold">FINAZEN ADMIN</span>
            <Badge variant="warning">SameSite=Strict Session Required</Badge>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-2">
            Bảng Điều Khiển Quản Trị Hệ Thống & Kiểm Toán Tuân Thủ
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Mọi thao tác quản trị được ký thực thi trực tiếp qua Firebase Admin SDK trên máy chủ, từ chối quyền ghi trực tiếp từ Client.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Bảo mật cấp Ngân hàng
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-semibold">Tổ chức Đối tác Hoạt động</CardDescription>
            <CardTitle className="text-2xl font-bold font-mono">28</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-500 pt-0">
            18 Ngân hàng TMCP, 4 NH Nhà nước, 6 Doanh nghiệp Bảo hiểm
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-semibold">Sản phẩm Niêm yết</CardDescription>
            <CardTitle className="text-2xl font-bold font-mono">142</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-500 pt-0">
            Đã qua phê duyệt & đối soát biểu lãi suất công khai
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-semibold">Nhật ký Đồng thuận PDP</CardDescription>
            <CardTitle className="text-2xl font-bold font-mono text-emerald-700">100%</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-500 pt-0">
            Đầy đủ audit trail theo Luật số 91/2025/QH15
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-semibold">Cơ chế Kiểm soát Ghi</CardDescription>
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-700" />
              Admin SDK Server-Only
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-500 pt-0">
            Deny-by-default Firestore Security Rules
          </CardContent>
        </Card>
      </div>

      {/* Immutable Consent Logs Audit Trail */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                Nhật Ký Kiểm Toán Đồng Thuận Cá Nhân (Audit Trail)
              </CardTitle>
              <CardDescription>
                Lưu vết bất biến thời gian, đối tác thụ hưởng và căn cứ pháp lý theo Luật số 91/2025/QH15 & Nghị định số 356/2025/NĐ-CP.
              </CardDescription>
            </div>
            <Badge variant="success">Bất biến (Immutable)</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã kiểm toán</TableHead>
                <TableHead>Hành động</TableHead>
                <TableHead>Mục đích xử lý</TableHead>
                <TableHead>Đối tác nhận dữ liệu</TableHead>
                <TableHead>Căn cứ pháp lý</TableHead>
                <TableHead>Thời điểm (dd/mm/yyyy)</TableHead>
                <TableHead className="text-right">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs font-semibold">{log.id}</TableCell>
                  <TableCell className="font-medium text-xs">{log.action}</TableCell>
                  <TableCell className="text-xs text-slate-600">{log.purpose}</TableCell>
                  <TableCell className="text-xs font-semibold text-slate-800">{log.partner}</TableCell>
                  <TableCell className="text-xs text-emerald-800 font-medium">{log.lawRef}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-500">{log.time}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="success" className="font-mono text-[10px]">
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
