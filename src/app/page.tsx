import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-24 text-center overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Happy couples"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="relative z-10 space-y-12 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                  あなたにぴったりの
                  <span className="text-primary">マッチング</span>
                  を見つけよう
                </h1>
                <p className="text-xl text-muted-foreground">
                  AIを活用した最新のマッチングシステムで、あなたの理想のパートナーとの出会いをサポートします。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link href="/register">無料で始める</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">詳しく見る</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-2xl hidden md:block">
              <Image
                src="/hero-couple.jpg"
                alt="Happy couple"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            特徴的な機能
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              title="AIマッチング"
              description="高度なAIアルゴリズムがあなたに最適なマッチングを提案します"
              icon="🤖"
              imageSrc="/feature-ai.jpg"
            />
            <FeatureCard
              title="安心・安全"
              description="24時間体制の監視システムで、安全な出会いを提供します"
              icon="🔒"
              imageSrc="/feature-security.jpg"
            />
            <FeatureCard
              title="充実したプロフィール"
              description="詳細なプロフィール設定で、より良いマッチングを実現"
              icon="👤"
              imageSrc="/feature-profile.jpg"
            />
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            成功事例
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SuccessStoryCard
              image="/story1.jpg"
              name="田中さん・山田さん"
              description="AIマッチングで出会い、3ヶ月後にご成婚"
            />
            <SuccessStoryCard
              image="/story2.jpg"
              name="佐藤さん・鈴木さん"
              description="共通の趣味から始まり、半年で結婚を決意"
            />
            <SuccessStoryCard
              image="/story3.jpg"
              name="伊藤さん・渡辺さん"
              description="価値観の一致から、理想のパートナーに"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="10万+" label="ユーザー数" />
            <StatCard number="95%" label="マッチング率" />
            <StatCard number="4.8" label="平均評価" />
            <StatCard number="1000+" label="成功事例" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/cta-bg.jpg"
            alt="Background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container px-4 text-center space-y-8 relative z-10">
          <h2 className="text-4xl font-bold">
            今すぐ始めましょう
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            理想のパートナーがあなたを待っています。
            新規登録は無料です。
          </p>
          <Button size="lg" variant="secondary" asChild className="px-8">
            <Link href="/register">無料で始める</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  imageSrc,
}: {
  title: string
  description: string
  icon: string
  imageSrc: string
}) {
  return (
    <div className="group rounded-lg bg-background shadow-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function SuccessStoryCard({
  image,
  name,
  description,
}: {
  image: string
  name: string
  description: string
}) {
  return (
    <div className="group rounded-lg overflow-hidden bg-background shadow-lg hover:-translate-y-1 transition-all">
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="space-y-2">
      <div className="text-3xl font-bold text-primary">{number}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
