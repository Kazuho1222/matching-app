export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* ここにナビゲーションバーなどを追加予定 */}
      {children}
    </div>
  )
} 