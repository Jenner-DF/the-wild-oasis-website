import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

//enter url /api/cabins/{id} to see data
export async function GET(request, { params }) {
  console.log(1, request);
  console.log(2, params);
  const { cabinId } = params;
  console.log(cabinId);
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({ message: "cabin not found" });
  }
}
export async function POST() {}
export async function PATCH() {}
export async function DELETE() {}
export async function HEAD() {}
export async function OPTIONS() {}
