import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethod = (ConsumptionMethod: string) => {
  return ["TAKEAWAY", "DINE_IN"].includes(ConsumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethod(consumptionMethod)) return notFound();
  const restaurant = await db.restaurant?.findUnique({ where: { slug } });
  if (!restaurant) return notFound();

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
