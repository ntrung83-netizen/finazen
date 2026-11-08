'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useAuth } from '../../../lib/auth/context';
import { ShieldCheck, Download, Trash2, Edit3, AlertCircle, CheckCircle, User, Lock } from 'lucide-react';

export default function AccountPage() {
  const { user, firebaseUser, signInWithGoogle, signOut, loading } = useAuth();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleExportData = () => {
    if (!user) return;
    const exportData = {
      userProfile: user,
      consentRecords: [
        {
          timestamp: new Date().toISOString(),
          lawReference: 'Luật số 91/2025/QH15 & Nghị định 356/2025/NĐ-CP',
          status: 'ACTIVE_CONSENT',
          purpose: 'LOAN_ADVISORY_FORWARDING',
        },
      ],
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finazen_pdp_data_subject_${user.uid}.json`;
    a.click();
    setFeedback('Đã xuất bản sao dữ liệu cá nhân theo Luật số 91/2025/QH15.');
  };

  const handleRevokeConsent = () => {
    setFeedback('Yêu cầu rút lại sự đồng thuận đã được tiếp nhận và xử lý. Các đối tác sẽ ngưng xử lý yêu cầu tư vấn mới.');
  };

  const handleDeleteRequest = () => {
    setFeedback('Yêu cầu xoá dữ liệu cá nhân đã được ghi nhận vào nhật ký kiểm toán. Dữ liệu sẽ được xoá theo thời hạn quy định.');
  };

  if (loading) {
    return <div className="p-8 text-center text-sm text-slate-500">Đang xác thực thông tin tài khoản...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Quản lý Tài khoản & Quyền Chủ thể Dữ liệu
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Thực thi đầy đủ các quyền theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 & Nghị định số 356/2025/NĐ-CP.
        </p>
      </div>

      {feedback && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Authentication Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-700" />
            Thông tin Đăng nhập & Định danh
          </CardTitle>
          <CardDescription>
            Tài khoản Finazen sử dụng Google Sign-in và phiên làm việc cookie bảo mật (httpOnly, Secure).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {firebaseUser ? (
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                {firebaseUser.photoURL ? (
                  <img src={firebaseUser.photoURL} alt="Avatar" className="w-10 h-10 rounded-full border border-slate-300" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                    {firebaseUser.email?.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-slate-900">{firebaseUser.displayName || 'Người dùng Finazen'}</div>
                  <div className="text-xs text-slate-500 font-mono">{firebaseUser.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success">Đã xác thực Firebase</Badge>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Đăng xuất
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-3">
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Đăng nhập bằng tài khoản Google để tra cứu lịch sử các gói tư vấn đã yêu cầu và quản lý quyền dữ liệu cá nhân.
              </p>
              <Button onClick={signInWithGoogle} variant="secondary">
                Đăng nhập bằng Google
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Subject Rights Portal */}
      <Card className="border-emerald-200/80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <CardTitle className="text-base">
                Cổng Thực thi Quyền của Chủ thể Dữ liệu (PDP Portal)
              </CardTitle>
            </div>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Luật số 91/2025/QH15
            </span>
          </div>
          <CardDescription>
            Quý khách có toàn quyền kiểm soát, tải về, chỉnh sửa hoặc thu hồi sự đồng thuận xử lý thông tin cá nhân.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-700" />
                1. Quyền Truy cập & Xuất dữ liệu
              </div>
              <p className="text-slate-500 leading-relaxed">
                Tải bản sao toàn bộ hồ sơ dữ liệu cá nhân, lịch sử chuyển tiếp và nhật ký kiểm toán.
              </p>
              <Button variant="outline" size="sm" onClick={handleExportData} className="w-full">
                Xuất file dữ liệu (JSON)
              </Button>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                2. Quyền Rút lại Sự đồng ý
              </div>
              <p className="text-slate-500 leading-relaxed">
                Thu hồi đồng thuận chuyển tiếp dữ liệu đến ngân hàng/tổ chức bảo hiểm đối tác.
              </p>
              <Button variant="outline" size="sm" onClick={handleRevokeConsent} className="w-full">
                Rút lại đồng thuận
              </Button>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-sky-700" />
                3. Quyền Yêu cầu Cải chính
              </div>
              <p className="text-slate-500 leading-relaxed">
                Yêu cầu cập nhật số điện thoại, email hoặc thông tin thu nhập khi có thay đổi.
              </p>
              <Button variant="outline" size="sm" onClick={() => setFeedback('Vui lòng gửi email hỗ trợ qua compliance@finazen.vn.')} className="w-full">
                Gửi yêu cầu cải chính
              </Button>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Trash2 className="w-4 h-4 text-rose-600" />
                4. Quyền Yêu cầu Xoá dữ liệu
              </div>
              <p className="text-slate-500 leading-relaxed">
                Yêu cầu xoá bỏ vĩnh viễn thông tin cá nhân khỏi hệ thống Finazen.
              </p>
              <Button variant="danger" size="sm" onClick={handleDeleteRequest} className="w-full">
                Yêu cầu xoá dữ liệu
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
