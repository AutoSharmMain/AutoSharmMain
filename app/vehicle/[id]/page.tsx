import VehicleClient from './VehicleClient';

// 1. Next.js видит чистый серверный компонент и без проблем принимает генерацию параметров
export async function generateStaticParams() {
  // Возвращаем пустой массив. Next.js сгенерирует базовый роут,
  // а в браузере он отработает как полноценное SPA-приложение!
  return [];
}

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <VehicleClient params={resolvedParams} />;
}