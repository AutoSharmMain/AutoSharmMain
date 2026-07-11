import VehicleClient from './VehicleClient';

export const dynamicParams = true;

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <VehicleClient params={resolvedParams} />;
}